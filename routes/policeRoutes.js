const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { loginUser, registerUser } = require("../controllers/policeController");
const { route } = require("express/lib/application");
const router = express.Router();

// router.route("/adminLogin").post(adminLogin);

router.route("/").post(registerUser);
router.post("/login", loginUser);

// router.get("/:id", getUserById);

module.exports = router;
