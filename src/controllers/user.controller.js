const { catchAsync } = require("../utils/helper");
const { commonService, createSearchQuery } = require("../utils/mongoHelpers");
const User = require("../models/User");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");
const { generateFileUrl } = require("../utils/fileUpload");

const addUser = catchAsync(async (req, res) => {
  const { name, email, role } = req.body;

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

  // Upload Profile Image
  const fileUrls = await generateFileUrl({ files: req.files });

  // Create New User
  await commonService.create({
    model: User,
    body: { name, email, password, role, verificationToken, ...fileUrls },
  });

  return res.status(httpStatus.OK).send("User registered successfully");
});

const getUsers = catchAsync(async (req, res) => {
  const { page, limit, search } = req.query;

  const query = { status: true };

  if (search) {
    query.$or = createSearchQuery({
      search,
      searchArr: ["firstName", "lastName", "email"],
    });
  }

  const users = await commonService.getMany({
    model: User,
    query,
    options: { page, limit },
  });

  return res.status(httpStatus.OK).send(users);
});

const getUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const userExist = await commonService.getOne({
    model: User,
    query: { id: userId, status: true },
  });

  if (userExist) throw new ApiError(httpStatus.BAD_REQUEST, "User not found");

  return res.status(httpStatus.OK).send(userExist);
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const userExist = await commonService.getOne({
    model: User,
    query: { id: userId, status: true },
  });

  if (userExist) throw new ApiError(httpStatus.BAD_REQUEST, "User not found");

  await commonService.update({
    model: User,
    body: req.body,
    query: { id: userId, status: true },
  });

  return res.status(httpStatus.OK).send("User Updated Successfully");
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const userExist = await commonService.getOne({
    model: User,
    query: { id: userId, status: true },
  });

  if (userExist) throw new ApiError(httpStatus.BAD_REQUEST, "User not found");

  await commonService.update({ model: User, body: { status: false } });

  return res.status(httpStatus.OK).send("User Deleted Successfully");
});

module.exports = { addUser, getUsers, getUserById, updateUser, deleteUser };
