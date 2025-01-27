const express = require('express');
require('dotenv').config()
const cors = require('cors');
const router = require('./router/router');  // Make sure to use the correct path
require('./database/connection/connection')


const app = express();
const port = 5000;

// Enable CORS for all origins (useful for development)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api', router);  // This will prefix all routes in the router with /api

app.use(router)
// Example route for fetching data
app.get('/api/data', (req, res) => {
  const data = {
    message: 'Hello from the backend!',
  };
  res.json(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 