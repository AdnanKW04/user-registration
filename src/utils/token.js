const jwt = require("jsonwebtoken");
const {
  jwtSecret,
  accessTokenExpiration,
  refreshTokenExpiration,
} = require("../config/config");
const User = require("../models/User");
const Token = require("../models/token");
const { commonService } = require("./mongoHelpers");
const { tokenTypes } = require("../constant/token");
const httpStatus = require("http-status");
const ApiError = require("./apiError");

const generateToken = async ({ user }) => {
  try {
    const payload = { userId: user._id };

    const accessToken = jwt.sign(payload, jwtSecret, {
      expiresIn: accessTokenExpiration,
    });

    const refreshToken = jwt.sign(payload, jwtSecret, {
      expiresIn: refreshTokenExpiration,
    });

    await commonService.bulkCreate({
      model: Token,
      body: [
        {
          userId: user._id,
          token: accessToken,
          tokenType: tokenTypes.accessToken,
        },
        {
          userId: user._id,
          token: refreshToken,
          tokenType: tokenTypes.refreshToken,
        },
      ],
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const verifyRefreshToken = async ({ refreshToken }) => {
  try {
    const refreshTokenExist = await commonService.getOne({
      model: Token,
      query: {
        token: refreshToken,
        tokenType: tokenTypes.refreshToken,
        status: true,
      },
    });

    if (!refreshTokenExist) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "PLEASE AUTHENTICATE");
    }

    const user = await commonService.getOne({
      model: User,
      query: { _id: refreshTokenExist.userId, isActive: true, status: true },
    });

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "PLEASE AUTHENTICATE");
    }

    const tokens = await generateToken({ user });

    return { user, tokens };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

module.exports = { generateToken, verifyRefreshToken };
