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

const app = express();
const port = 4000; // HTTPS port

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
  console.log(`Origin: ${req.headers.origin || "No Origin"}`);
  next(); // Pass control to the next middleware
});

/// Allow credentials and dynamically check origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://bus-tracking-2024.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow request
    } else {
      console.error(`CORS blocked request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // Apply CORS middleware

// Handle preflight requests
app.options("*", cors(corsOptions));

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
app.get("/", (req, res) => {
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
startSendingCoordinates();
const sendRoutePassCount = require('./services/callSendRoutePassengers'); // Uncomment if needed

// AWS Server SSL certificates
const sslOptions = {
  key: fs.readFileSync('/home/ubuntu/certificate/selfsigned.key'),  // path to the key
  cert: fs.readFileSync('/home/ubuntu/certificate/selfsigned.crt') // path to the certificate
};


// Start HTTPS server 
https.createServer(sslOptions, app).listen(port, "0.0.0.0", () => {
  console.log(`HTTPS server is running on https://0.0.0.0:${port}`);
});

