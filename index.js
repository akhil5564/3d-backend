const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const allControllers = require('./controller/allcontrollers');  // Import all controllers

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Set up routes from the controller
app.use('/data', allControllers);  // Make sure the router is used correctly

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
