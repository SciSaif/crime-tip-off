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
      type: { lat: String, long: String, city: String },
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TipOff", tipOffSchema);
