const express = require('express');
const router = express.Router();
const geofenceController = require('../controllers/geofenceControllers');

// Route to check if a bus is within any geofence
router.get('/check-location', async (req, res) => {
    try {
        // Fetch the latest bus location from ThingSpeak
        const { lat, lon } = await geofenceController.getBusLocation();

        // Check if the bus is within any geofence
        const result = geofenceController.checkGeofence(lat, lon);

        if (result.inside) {
            res.status(200).json({ message: `Bus is within the geofence of ${result.segment}` });
        } else {
            res.status(200).json({ message: 'Bus is outside all geofences' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bus location' });
    }
});


module.exports = router;
