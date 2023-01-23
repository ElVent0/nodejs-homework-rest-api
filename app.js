const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsHandler = require("./routes/api/contacts");
const app = express();
const Logger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(Logger));
app.use(cors());
app.use(express.json());

const authRouter = require("./routes/api/auth");

app.use("/api/auth", authRouter);

app.use("/api/contacts", contactsHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
