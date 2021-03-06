const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Police = require("../models/policeModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      //Verify token (gives back id)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Get user from token
      req.police = await Police.findById(decoded.id).select("-password"); // get everything except password
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized: no token ");
  }
});

module.exports = { protect };
