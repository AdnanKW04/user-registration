const { catchAsync } = require("../utils/helper");
const { commonService } = require("../utils/mongoHelpers");
const User = require("../models/User");
const Token = require("../models/token");
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
const { generateToken, verifyRefreshToken } = require("../utils/token");

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
  const fileUrls = await generateFileUrl({ files: req.files });

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
    query: { verificationToken: token, status: true },
  });

  return res.status(httpStatus.OK).send(verificationTemplate.success);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await commonService.getOne({
    model: User,
    query: { email, status: true },
  });

  if (!user) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User already exists with the same email"
    );
  }

  // const user = await Token.findOne({
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZjN2Q0N2Q1NmQwZTJhN2M4NmUxYWUiLCJpYXQiOjE3MTg4NjkzMDQsImV4cCI6MTcxODk1NTcwNH0._TOD-nHpVS--FZMTsLySLIv8ftlmUUVuHobdAnKojrM",
  //   tokenType: "access",
  //   status: true,
  // }).populate({ path: "userId", options: { strictPopulate: false } });

  const tokens = await generateToken({ user });

  return res.status(httpStatus.OK).send({ user, tokens });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  const data = await verifyRefreshToken({ refreshToken });

  return res.status(httpStatus.OK).send(data);
});

const logout = catchAsync(async (req, res) => {
  const { logoutFromAllDevices } = req.body;

  const userId = req.user._id;

  if (logoutFromAllDevices) {
    await commonService.destroy({
      model: Token,
      query: { userId, status: true },
    });
  } else {
    const reqToken = req.headers.authorization.replace("Bearer ", "");

    await commonService.destroy({
      model: Token,
      query: { token: reqToken, status: true },
    });
  }

  return res.status(httpStatus.OK).send("User logged out successfully");
});

module.exports = { registerUser, verifyEmail, login, logout, refreshToken };
