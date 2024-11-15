const express = require("express");
const cors = require("cors");

const busRoutes = require('./routes/busRoutes')
const routeRoutes = require('./routes/routeRoutes')
const rfidRoutes = require('./routes/rfidRoutes');
const driverRoutes = require("./routes/driverRoutes");
const thingSpeak = require('./routes/thingspeakRoutes');
const userRoutes = require('./routes/usersRoutes');
const systemRoutes = require('./routes/systemRoutes');

const { busDataScript } = require('./services/busDataScript');

const app = express();
const port = 4000;
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "http://192.168.1.3:4000",
  ], // Replace yourPort with the actual port number of your client application //Replace ip address for testing with esp32
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/buses', busRoutes)
app.use('/routes', routeRoutes)
app.use('/rfid', rfidRoutes);
app.use("/drivers", driverRoutes);
app.use('/thingspeak', thingSpeak);
app.use('/users', userRoutes);
app.use('/system', systemRoutes);


// Call the busDataScript function directly when the server starts
const startSendingCoordinates = async () => {
  await busDataScript(); // Send coordinates when the server starts
};

//remove comment to start running
// startSendingCoordinates();

//send data to routes: remove comment to run
// const sendRoutePassCount = require('./services/callSendRoutePassengers');

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Express app is running' });
});

app.listen(port, '0.0.0.0',() => {
  console.log(`Server is running on port ${port}`);
});
