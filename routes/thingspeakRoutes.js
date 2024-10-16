const express = require("express");
const router = express.Router();
const thingSpeakController = require('../controllers/thingspeakControllers');

router.get("/channel/:id", thingSpeakController.getRouteChannel);
router.get("/passengers/route", thingSpeakController.getRoutePassengers);
router.get("/passengers/route/bus/:id", thingSpeakController.getBusPassCountPerRoute);
router.get("/bus-location", thingSpeakController.getBusLocation);
router.get("/bus-passenger/:id", thingSpeakController.getBusPassenger);






module.exports = router