const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();

const User = require("../models/userModel");

const { cloudinary } = require("../utils/cloudinary");

// @desc Register a user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password, designation } = req.body;

  if (!name || !email || !password || !designation) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  email = email.toLowerCase();

  // Check if user already exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    designation,
    isAdmin: false,
  });

  if (user) {
    res.status(200).json({
      is: user._id,
      name: user.name,
      email: user.email,
      designation: user.designation,
      isAdmin: user.isAdmin,
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

  email = email.toLowerCase();

  const user = await User.findOne({ email });

  // check if user exists and match password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      designation: user.designation,
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
};
