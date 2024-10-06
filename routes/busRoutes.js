const express = require("express");
const router = express.Router();
const busController = require("../controllers/busControllers");

router.get("/index", busController.getBusIndex);
router.get("/index/route/:id", busController.getBusIndexOfRoute);
router.post("/create", busController.createBus);
router.get("/:id", busController.getBusById);
router.post("/update", busController.updateBus);
router.delete("/:id", busController.deleteBus);

module.exports = router;
