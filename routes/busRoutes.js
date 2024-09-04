const express = require("express");
const router = express.Router();
const busController = require('../controllers/busControllers')

router.get("/index", busController.getBusIndex );

module.exports = router;
