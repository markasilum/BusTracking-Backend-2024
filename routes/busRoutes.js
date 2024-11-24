const express = require("express");
const router = express.Router();
const busController = require("../controllers/busControllers");

router.get("/index", busController.getBusIndex);
router.get("/index/route/:id", busController.getBusIndexOfRoute);
router.post("/create", busController.createBus);
router.get("/:id", busController.getBusById);

router.get("/get-loc-channel/:id", busController.getBusLocChannel);
router.get("/get-pass-channel/:id", busController.getBusPassChannel);

router.get("/get-all-channel/:id", busController.getAllBusChannels);

router.get("/driver/:id", busController.getBusOfDriver);





// Update a bus by ID
router.put("/update", busController.updateBus);

// Delete a bus by ID
router.get("/archive/:id", busController.deleteBus);

module.exports = router;
