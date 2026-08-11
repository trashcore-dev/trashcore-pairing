// ping.js
const express = require('express');
const router = express.Router();

// Store server start time
const SERVER_START_TIME = Date.now();

router.get('/', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - SERVER_START_TIME) / 1000);
  
  res.json({
    status: 'active',
    uptime: uptimeSeconds, // Return uptime in seconds
    timestamp: new Date().toISOString()
  });
});

module.exports = { router };
