const express = require("express");
const router = express.Router();
const thingSpeakController = require('../controllers/thingspeakControllers');

router.get("/channel/:id", thingSpeakController.getRouteChannel);
router.get("/passengers/route/:id", thingSpeakController.getRoutePassengers);



module.exports = router