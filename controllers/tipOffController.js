const asyncHandler = require("express-async-handler");
require("dotenv").config();

const TipOff = require("../models/tipOffModel");

const { cloudinary } = require("../utils/cloudinary");

// @desc Create a new tip off
// @route POST /api/tipoff/
// @access Public
const createTipOff = asyncHandler(async (req, res) => {
  // console.log("p");
  const { category, description, photos, location, date } = req.body;

  if (!category || !location) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const tipOff = await TipOff.create({
    category,
    description,
    photos,
    location,
    date,
  });

  if (TipOff) {
    res.status(201).json({
      category: tipOff.category,
      description: tipOff.description,
      photos: tipOff.photos,
      location: tipOff.location,
      date: tipOff.date,
    });
  } else {
    res.status(400);
    throw new Error("Invalid TipOFF Data");
  }
});

// @desc get all tipoffs
// @route GET /api/tipoff/all
// @access Private
const getAllTipOff = asyncHandler(async (req, res) => {
  const tips = TipOff.find({});
  res.status(200).json({ tips });
  res.status(400);
  throw new Error("Invalid TipOFF Data");
});

module.exports = { getAllTipOff, createTipOff };
