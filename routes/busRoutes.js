const express = require("express");
const router = express.Router();
const busController = require("../controllers/busControllers");

// Get all buses
router.get("/index", busController.getBusIndex);

// Create a new bus
router.post("/create", busController.createBus);

// Get a bus by ID
router.get("/:id", busController.getBusById);

// Update a bus by ID
router.put("/:id", busController.updateBus);

// Delete a bus by ID
router.delete("/:id", busController.deleteBus);

module.exports = router;
