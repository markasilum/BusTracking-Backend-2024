const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");

// Import route handlers
const busRoutes = require("./routes/busRoutes");
const routeRoutes = require("./routes/routeRoutes");
const rfidRoutes = require("./routes/rfidRoutes");
const driverRoutes = require("./routes/driverRoutes");
const thingSpeak = require("./routes/thingspeakRoutes");
const userRoutes = require("./routes/usersRoutes");
const systemRoutes = require("./routes/systemRoutes");

// Import services
const { busDataScript } = require("./services/busDataScript");
// const sendRoutePassCount = require('./services/callSendRoutePassengers'); // Uncomment if needed

const app = express();
const port = 4000; // HTTPS port

// CORS configuration to allow all origins
const corsOptions = {
  origin: "*",  // This allows all origins
  credentials: true,  // Allow cookies and credentials to be included in requests
};
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// API routes
app.use("/buses", busRoutes);
app.use("/routes", routeRoutes);
app.use("/rfid", rfidRoutes);
app.use("/drivers", driverRoutes);
app.use("/thingspeak", thingSpeak);
app.use("/users", userRoutes);
app.use("/system", systemRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Express app is running with HTTPS" });
});

// Function to start sending bus coordinates
const startSendingCoordinates = async () => {
  try {
    await busDataScript();
    console.log("Bus data script started successfully.");
  } catch (error) {
    console.error("Error starting bus data script:", error);
  }
};

// Uncomment this line to start sending coordinates when the server starts
// startSendingCoordinates();

// Uncomment the following line to send route passenger count
// sendRoutePassCount();

// Load SSL certificates
const sslOptions = {
  key: fs.readFileSync('/home/ubuntu/certificate/selfsigned.key'),  // path to the key
  cert: fs.readFileSync('/home/ubuntu/certificate/selfsigned.crt') // path to the certificate
};

// Start HTTPS server
https.createServer(sslOptions, app).listen(port, "0.0.0.0", () => {
  console.log(`HTTPS server is running on https://0.0.0.0:${port}`);
});

// Optional: Redirect HTTP to HTTPS
// const http = require("http");
// http.createServer((req, res) => {
//   res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
//   res.end();
// }).listen(80, "0.0.0.0", () => {
//   console.log("HTTP traffic is being redirected to HTTPS");
// });
