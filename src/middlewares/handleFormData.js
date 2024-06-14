const httpStatus = require("http-status");
const multer = require("multer");
const { fileSize, allowedFileTypes } = require("../constant/fileUpload");
const ApiError = require("../utils/apiError");

const uploads = multer({
  limits: { fileSize: fileSize },
  fileFilter: (req, file, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new ApiError(
          httpStatus.BAD_REQUEST,
          "Invalid file type, only the following types are allowed: " +
            allowedFileTypes.join(", ")
        ),
        false
      );
    }
  },
});

const parseFormData = (validFiles = []) => {
  const uploadMiddleware = uploads.fields(validFiles);

  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        const errorMessage = err;
        if (err.message === "Unexpected field") {
          errorMessage.message = err.message.concat(
            ` or File count exceeded! Expected fields: ${JSON.stringify(
              validFiles.map(({ name }) => name)
            )}`
          );
        }
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
      }
      next();
    });
  };
};

module.exports = parseFormData;
