const express = require("express");
const router = express.Router();
const routeController = require('../controllers/routeControllers')

router.get("/index", routeController.getRouteIndex );
router.get("/index/coordinates", routeController.getRoutesCoordinates );
router.get("/get-route/:id", routeController.getRoute );
router.post("/create", routeController.createRoute );


module.exports = router;
