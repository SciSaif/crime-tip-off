const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createTipOff,
  getAllTipOff,
  getTipOffById,
  getAllTipOffForCity,
  updateTipOff,
} = require("../controllers/tipOffController");
const { route } = require("express/lib/application");
const router = express.Router();

router.post("/", createTipOff);
router.get("/all", protect, getAllTipOff);
router.route("/:id").get(protect, getTipOffById).put(protect, updateTipOff);
router.route("/city/:city").get(protect, getAllTipOffForCity);
module.exports = router;
