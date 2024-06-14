const fs = require("fs");
const httpStatus = require("http-status");
const path = require("path");
const ApiError = require("./apiError");

const generateFileUrl = async ({ files, returnArrayFileUrl = [] }) => {
  try {
    const fileUrls = {};

    await Promise.all(
      Object.entries(files).map(async ([key, filesArray]) => {
        const uploadedUrls = await Promise.all(
          filesArray.map(async (file) => {
            const uploadPath = path.join(
              __dirname,
              "../../uploads",
              file.originalname
            );
            await fs.writeFileSync(uploadPath, file.buffer);
            return `uploads/${file.originalname}`;
          })
        );

        if (returnArrayFileUrl.includes(key)) fileUrls[key] = uploadedUrls;
        else fileUrls[key] = uploadedUrls[0];
      })
    );

    return fileUrls;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

module.exports = { generateFileUrl };
