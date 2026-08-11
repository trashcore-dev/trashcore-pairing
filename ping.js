// ping.js
const express = require('express');
const router = express.Router();

// Store server start time - this persists across requests
const SERVER_START_TIME = Date.now();

router.get('/', (req, res) => {
  // Calculate uptime in seconds
  const uptimeSeconds = Math.floor((Date.now() - SERVER_START_TIME) / 1000);
  
  res.json({
    status: 'active',
    uptime: uptimeSeconds,
    timestamp: new Date().toISOString(),
    message: 'Server is running'
  });
});

module.exports = { router };
