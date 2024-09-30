const express = require("express");
const router = express.Router();
const thingSpeakController = require('../controllers/thingspeakControllers');

router.get("/channel/:id", thingSpeakController.getRouteChannel);


module.exports = router