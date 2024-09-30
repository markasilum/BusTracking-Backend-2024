const express = require('express');
const router = express.Router();
const rfidController = require('../controllers/rfidControllers');

// POST route to handle RFID data
router.post('/', rfidController.handleRFIDScan);

module.exports = router;
