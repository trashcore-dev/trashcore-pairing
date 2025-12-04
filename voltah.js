const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("events").EventEmitter.defaultMaxListeners = 500;

// Backend routes
const qrRoute = require("./qr");
const codeRoute = require("./pair");

const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Endpoints
app.use("/qr", qrRoute);
app.use("/code", codeRoute);

// Health Check
app.get("/", (req, res) => {
  res.json({
    status: "Online",
    message: "Trashcore pairing backend is running",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

module.exports = app;
