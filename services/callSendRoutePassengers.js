const { getRoutePassengers } = require('../controllers/thingspeakControllers');

setInterval(getRoutePassengers, 18000);

