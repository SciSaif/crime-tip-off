const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();

const User = require("../models/policeModel");

// @desc Register a user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  let { state, city, district, psNo, sho, password } = req.body;

  if (!state || !city || !district || !psNo || !sho || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ psNo: psNo });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    state,
    city,
    district,
    psNo,
    sho,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      id: user._id,
      state: user.state,
      district: user.district,
      psNo: user.psNo,
      sho: user.sho,
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
  let { psNo, password } = req.body;

  if (!psNo || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const user = await User.findOne({ psNo: psNo });

  // check if user exists and match password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      psNo: user.psNo,
      state: user.state,
      city: user.city,
      district: user.district,
      sho: user.sho,
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