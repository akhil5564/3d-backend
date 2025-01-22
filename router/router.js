const express = require('express');
const {
  postaddData,
  getData,
  clearAllData,
  checkNumber,
  getCountData,
  existingData,
  getDataByNumber
} = require('../controller/allcontrollers'); // Import controller functions
const router = express.Router(); // Create a new router

router.get('/data/:number', getDataByNumber);

// Define the routes
// Route for getting all data
router.get('/data', getData);

// Route for checking if a number exists
router.get('/checkNumber/:number', checkNumber);

// Route for adding data
router.post('/addData', postaddData);

// Route for clearing all data
router.delete('/clearData', clearAllData);

// Route for getting count data
router.post('/getCountData', getCountData);

// Route for checking existing data
router.post('/existingData', existingData);

module.exports = router;
