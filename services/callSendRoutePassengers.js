const { getRoutePassengers } = require('../controllers/thingspeakControllers');

setInterval(getRoutePassengers, 32000);

