const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
app.use("/api/contacts", contactsRouter);

app.get("/", (req, res) => {
  res.json({
    message: "welcome to contact book application",
  });
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "internal server error",
  });
});

app.use((req, res, next) => {
  return next(new ApiError(404, "resource not found"));
});

module.exports = app;
