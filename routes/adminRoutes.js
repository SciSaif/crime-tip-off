const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {} = require("../controllers/adminController");
const { route } = require("express/lib/application");
const router = express.Router();

// router.route("/").post(registerUser);

// router.get("/:id", getUserById);

// router.post("/login", loginUser);

module.exports = router;
