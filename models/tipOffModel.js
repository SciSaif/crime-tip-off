const mongoose = require("mongoose");

const tipOffSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    photos: {
      type: [String],
      required: false,
    },
    location: {
      type: { lat: String, lng: String, city: String },
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TipOff", tipOffSchema);
