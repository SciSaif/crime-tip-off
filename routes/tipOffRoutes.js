const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createTipOff,
  getAllTipOff,
} = require("../controllers/tipOffController");
const { route } = require("express/lib/application");
const router = express.Router();

router.post("/", createTipOff);
router.get("/all", protect, getAllTipOff);

module.exports = router;
