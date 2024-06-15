const { catchAsync } = require("../utils/helper");
const { commonService } = require("../utils/mongoHelpers");
const User = require("../models/User");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { generateFileUrl } = require("../utils/fileUpload");
const {
  generateHtmlTemplate,
  generateEmailVerificationHtmlTemplate,
} = require("../constant/emailTemplate");

const registerUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;

  // Check User Exist with the same email or not
  if (
    await commonService.getOne({
      model: User,
      query: { email, status: true },
    })
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User already exists with the same email"
    );
  }

  // Hashing Password
  const password = await bcrypt.hash(req.body.password, 10);

  // Verification Token for the email verification
  const verificationToken = crypto.randomBytes(16).toString("hex");

  // Upload Profile Image
  const fileUrls = req.files ? await generateFileUrl({ files: req.files }) : {};

  // Create New User
  await commonService.create({
    model: User,
    body: { name, email, password, verificationToken, ...fileUrls },
  });

  // Send Verification Email
  const htmlTemplate = generateHtmlTemplate({ verificationToken });

  await sendEmail({
    to: email,
    subject: htmlTemplate.subject,
    html: htmlTemplate.html,
  });

  return res.status(httpStatus.OK).send("User registered successfully");
});

const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.query;

  const verificationTemplate = generateEmailVerificationHtmlTemplate();

  const user = await commonService.getOne({
    model: User,
    query: { verificationToken: token, status: true },
  });

  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).send(verificationTemplate.failed);
  }

  if (user && user.isVerified) {
    return res.status(httpStatus.OK).send(verificationTemplate.alreadyVerified);
  }

  await commonService.update({
    model: User,
    body: { isVerified: true },
    query: { verificationToken: token, isVerified: false, status: true },
  });

  return res.status(httpStatus.OK).send(verificationTemplate.success);
});

module.exports = { registerUser, verifyEmail };
