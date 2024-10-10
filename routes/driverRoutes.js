const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverControllers");

// Get all drivers
router.get("/index", driverController.getDriverIndex);

// Create a new driver
router.post("/create", driverController.createDriver);

// Get a driver by ID
router.get("/:id", driverController.getDriverById);

// Update a driver by ID
router.put("/update", driverController.updateDriver);


// Delete a driver by ID
router.delete("/:id", driverController.deleteDriver);

module.exports = router;
