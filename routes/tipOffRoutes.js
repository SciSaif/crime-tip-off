const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { createTipOff } = require("../controllers/tipOffController");
const { route } = require("express/lib/application");
const router = express.Router();

router.post("/", createTipOff);

module.exports = router;
