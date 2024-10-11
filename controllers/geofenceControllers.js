// Earth's radius in kilometers
const EARTH_RADIUS = 6371; // in km

// Function to convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Haversine formula to calculate the distance between two points
function haversineDistance(lat1, lon1, lat2, lon2) {
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS * c; // returns the distance in kilometers
}

// Geofences for different segments with names
const geofences = [
    { name: 'Catalunan Grande', lat: 7.094323, lon: 125.516913, radius: 0.45 },
    { name: 'Catalunan Grande', lat: 7.092813, lon: 125.524273, radius: 0.45 },
    { name: 'Catalunan Grande', lat: 7.086355, lon: 125.528916, radius: 0.45 },
    { name: 'Catalunan Grande', lat: 7.083778, lon: 125.536399, radius: 0.45 },
    { name: 'Catalunan Grande', lat: 7.080712, lon: 125.543791, radius: 0.45 },
    { name: 'Catalunan Grande', lat: 7.073728, lon: 125.547181, radius: 0.45 },
    { name: 'Catalunan Grande', lat: 7.067808, lon: 125.551773, radius: 0.45 },
    { name: 'Catalunan Grande', lat: 7.064347, lon: 125.555045, radius: 0.1 },

    { name: 'Bangkal', lat: 7.060498, lon: 125.555722, radius: 0.35 },
    { name: 'Bangkal', lat: 7.061467, lon: 125.561488, radius: 0.35 },

    { name: 'Matina', lat: 7.059103, lon: 125.568326, radius: 0.45 },
    { name: 'Matina', lat: 7.059234, lon: 125.575381, radius: 0.45 },
    { name: 'Matina', lat: 7.059654, lon: 125.581960, radius: 0.45 },
    { name: 'Matina', lat: 7.060867, lon: 125.589850, radius: 0.45 },
    { name: 'Matina', lat: 7.062070, lon: 125.597623, radius: 0.45 },

    { name: 'Ecoland', lat: 7.054092, lon: 125.579017, radius: 0.25 },
    { name: 'Ecoland', lat: 7.057467, lon: 125.602654, radius: 0.25 },
    { name: 'Ecoland', lat: 7.050033, lon: 125.583790, radius: 0.45 },
    { name: 'Ecoland', lat: 7.051930, lon: 125.591524, radius: 0.45 },
    { name: 'Ecoland', lat: 7.054042, lon: 125.599263, radius: 0.45 },

    { name: 'Boulevard', lat: 7.059280, lon: 125.608629, radius: 0.45 },
    { name: 'Boulevard', lat: 7.063658, lon: 125.613608, radius: 0.45 },

    { name: 'Roxas', lat: 7.068718, lon: 125.617375, radius: 0.25 },
    { name: 'Roxas', lat: 7.069840, lon: 125.614752, radius: 0.25 },
    { name: 'Roxas', lat: 7.071901, lon: 125.613059, radius: 0.25 },

    { name: 'Ponciano-Illustre', lat: 7.073189, lon: 125.610174, radius: 0.1 },
    { name: 'Ponciano-Illustre', lat: 7.072181, lon: 125.609876, radius: 0.1 },
    { name: 'Ponciano-Illustre', lat: 7.070909, lon: 125.609736, radius: 0.1 },
    { name: 'Ponciano-Illustre', lat: 7.069555, lon: 125.609488, radius: 0.1 },
    { name: 'Ponciano-Illustre', lat: 7.067987, lon: 125.609223, radius: 0.1 },
    { name: 'Ponciano-Illustre', lat: 7.066471, lon: 125.608696, radius: 0.1 },
    { name: 'Ponciano-Illustre', lat: 7.068065, lon: 125.606440, radius: 0.25 },

    { name: 'Quirino', lat: 7.070533, lon: 125.604469, radius: 0.1 },
    { name: 'Quirino', lat: 7.069917, lon: 125.603829, radius: 0.1 },
    { name: 'Quirino', lat: 7.068718, lon: 125.603364, radius: 0.1 },
    { name: 'Quirino', lat: 7.067569, lon: 125.602121, radius: 0.1 },
    { name: 'Quirino', lat: 7.065958, lon: 125.601852, radius: 0.1 },
    { name: 'Quirino', lat: 7.064476, lon: 125.601964, radius: 0.1 }
];

// Function to check if a bus is within a geofence
exports.checkGeofence = (lat, lon) => {
    for (const geofence of geofences) {
        const distance = haversineDistance(geofence.lat, geofence.lon, lat, lon);
        if (distance <= geofence.radius) {
            return { inside: true, segment: geofence.name };
        }
    }
    return { inside: false };
};

// Function to fetch the latest bus location from ThingSpeak
exports.getBusLocation = async () => {
    const locationapiKey = process.env.THINGSPEAK_API_KEY; // Your ThingSpeak API key
    const channelId = '2629330'; // Your ThingSpeak channel ID

    try {
        const response = await fetch(`https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${locationapiKey}&results=1`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const feeds = data.feeds;

        if (feeds.length > 0) {
            const lat = parseFloat(feeds[0].field1);
            const lon = parseFloat(feeds[0].field2);
            return { lat, lon };
        }

        throw new Error('No feeds available');
    } catch (error) {
        console.error('Error fetching bus location:', error.message);
        throw error;
    }
};