const express = require('express');
const cors = require('cors');

const busRoutes = require('./routes/busRoutes')
const routeRoutes = require('./routes/routeRoutes')

const app = express();
const port = 4000;
const corsOptions = {
  origin: 'http://localhost:4000', // Replace yourPort with the actual port number of your client application
  credentials: true // Allow credentials
};
app.use(cors(corsOptions))
app.use(express.json())

app.use('/buses',busRoutes)
app.use('/routes',routeRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
