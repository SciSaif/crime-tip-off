const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    state: {
      type: String,
      required: [true, "Please add a state"],
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    psNo: {
      type: String,
      required: true,
    },
    sho: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
