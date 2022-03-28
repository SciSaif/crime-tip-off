const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// connect to database
connectDB();

const app = express();

const fe =
  process.env.NODE_ENV === "production"
    ? "https://crime-tip-off-frontend.vercel.app/"
    : "http://localhost:5000";

app.use(
  cors({
    credentials: true,
    origin: fe,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/tipoff", require("./routes/tipOffRoutes"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Crime Tip Off" });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
