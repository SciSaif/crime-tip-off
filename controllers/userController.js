const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();

const User = require("../models/userModel");

// @desc Register a user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  let { email, password, aadhar, aadharFile } = req.body;

  if (!email || !password || !aadhar || !aadharFile) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ aadhar: aadhar });

  if (userExists) {
    res.status(400);
    throw new Error("An account with this aadhar already exists");
  }
  // Check if email already exists
  const userExistsEmail = await User.findOne({ email: email });

  if (userExistsEmail) {
    res.status(400);
    throw new Error("An account with this email already exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    email,
    aadhar,
    aadharFile,
    verified: true,
    status: "unresolved",
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      id: user._id,
      email: user.email,
      aadhar: user.aadhar,
      aadharFile: user.aadharFile,
      verified: user.verified,
      status: user.status,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Login an user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const user = await User.findOne({ email: email });

  // check if user exists and match password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      email: user.email,
      aadhar: user.aadhar,
      aadharFile: user.aadharFile,
      verified: user.verified,
      status: user.status,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  //   adminLogin,
};
