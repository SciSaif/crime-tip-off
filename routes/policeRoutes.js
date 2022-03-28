const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  loginPolice,
  registerPolice,
} = require("../controllers/policeController");
const { route } = require("express/lib/application");
const router = express.Router();

// router.route("/adminLogin").post(adminLogin);

router.route("/").post(registerPolice);
router.post("/login", loginPolice);

// router.get("/:id", getUserById);

module.exports = router;
