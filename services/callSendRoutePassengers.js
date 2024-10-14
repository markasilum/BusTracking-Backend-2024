const { getRoutePassengers } = require('../controllers/thingspeakControllers');

setInterval(getRoutePassengers, 60000);

