const express = require("express");
const router = express.Router();
const routeController = require('../controllers/routeControllers')

router.get("/index", routeController.getRouteIndex );
router.get("/index/coordinates", routeController.getRoutesCoordinates );
router.get("/get-route/:id", routeController.getRoute );
router.post("/create", routeController.createRoute );
router.post("/update", routeController.updateRoute );
router.get("/sections/:id", routeController.getRouteSections );
router.get("/get-section/:id", routeController.getSection );



module.exports = router;
