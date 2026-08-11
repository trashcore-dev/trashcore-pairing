// ping.js
const express = require('express');
const router = express.Router();
const os = require('os');

// Store server start time
const startTime = Date.now();

router.get('/', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  
  res.json({
    status: 'active',
    uptime: uptimeSeconds, // in seconds
    timestamp: new Date().toISOString()
  });
});

module.exports = { router };
