const asyncHandler = require("express-async-handler");
require("dotenv").config();

const TipOff = require("../models/tipOffModel");
const Police = require("../models/policeModel");

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
    status: "unresolved",
  });

  if (TipOff) {
    res.status(201).json({
      category: tipOff.category,
      description: tipOff.description,
      photos: tipOff.photos,
      location: tipOff.location,
      date: tipOff.date,
      status: tipOff.status,
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
  const tips = await TipOff.find({});
  if (tips) {
    res.status(200).json({ tips });
  } else {
    res.status(400);
    throw new Error("No tip off available");
  }
});

// @desc get tipoff by id
// @route GET /api/tipoff/:id
// @access Private
const getTipOffById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tip = await TipOff.find({ _id: id });
  if (tip) {
    res.status(200).json({ tip });
  } else {
    res.status(400);
    throw new Error("TipOff not found");
  }
});

// @desc get tipoff for police station
// @route GET /api/tipoff/:city
// @access Private
const getAllTipOffForCity = asyncHandler(async (req, res) => {
  const { city } = req.params;

  const tips = await TipOff.find({ "location.city": city });

  if (tips) {
    res.status(200).json({ tips });
  } else {
    res.status(400);
    throw new Error("TipOff not found for the city");
  }
});

// @desc update tip off
// @route PUT /api/tipoff/:id
// @access Private
const updateTipOff = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tip = await TipOff.find({ _id: id });
  console.log(req.body);

  if (tip) {
    const updatedData = await TipOff.findByIdAndUpdate(id, req.body, {
      new: true, //if not already there then create it
    });

    res.status(200).json({ updatedData });
  } else {
    res.status(400);
    throw new Error("TipOff not found ");
  }
});

module.exports = {
  getAllTipOff,
  createTipOff,
  getTipOffById,
  getAllTipOffForCity,
  updateTipOff,
};
