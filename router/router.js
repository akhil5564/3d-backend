const express = require('express');
const {
  postaddData,
  getDataByNumber,
  checkNumber,
  getCountData,
} = require('../controller/allcontrollers'); // Import controller functions
const router = express.Router(); // Create a new router

// Define the routes
router.get('/data/:number', getDataByNumber);  // Get data by specific number
router.get('/checkNumber/:number', checkNumber); // Check if a number exists
router.post('/addData', postaddData);  // Add data (or update if exists)
router.post('/getCountData', getCountData);  // Get count data for a number

module.exports = router;
