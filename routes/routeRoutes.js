const express = require("express");
const router = express.Router();
const routeController = require('../controllers/routeControllers')

router.get("/index", routeController.getRouteIndex );

module.exports = router;
