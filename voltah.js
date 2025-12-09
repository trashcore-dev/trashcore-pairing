// 🔥 GLOBAL PROCESS ERROR LOGGING (MUST be at the very top)
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

// ------------------- YOUR SERVER CODE -------------------

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Add this middleware JUST AFTER app = express()
app.use((req, res, next) => {
  req.startTime = Date.now(); // for accurate ping measurement
  next();
});


const { router: pingRouter } = require('./ping');
app.use('/ping', pingRouter);


const statsRoute = require('./stats');
// ...
app.use('/stats', statsRoute);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // ← critical for Vercel
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

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

// Express error handler
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.stack || err);
  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

module.exports = app;
