const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();

const Police = require("../models/policeModel");

// @desc Register a police
// @route POST /api/police
// @access Public
const registerPolice = asyncHandler(async (req, res) => {
  let { state, city, district, psNo, sho, password } = req.body;

  if (!state || !city || !district || !psNo || !sho || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Check if police already exists
  const policeExists = await Police.findOne({ psNo: psNo });

  if (policeExists) {
    res.status(400);
    throw new Error("Police already exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create Police
  const police = await Police.create({
    state,
    city,
    district,
    psNo,
    sho,
    password: hashedPassword,
  });

  if (police) {
    res.status(200).json({
      id: police._id,
      state: police.state,
      district: police.district,
      psNo: police.psNo,
      sho: police.sho,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Police Data");
  }
});

// @desc Login a police
// @route POST /api/police/login
// @access Public
const loginPolice = asyncHandler(async (req, res) => {
  let { psNo, password } = req.body;

  if (!psNo || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const police = await Police.findOne({ psNo: psNo });

  // check if police exists and match password
  if (police && (await bcrypt.compare(password, police.password))) {
    res.status(200).json({
      _id: police.id,
      psNo: police.psNo,
      state: police.state,
      city: police.city,
      district: police.district,
      sho: police.sho,
      token: generateToken(police._id),
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
  registerPolice,
  loginPolice,
  //   adminLogin,
};
