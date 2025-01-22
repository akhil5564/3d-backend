const express = require('express');
const { 
  postaddData,
  getDataByNumber,
  clearAllData,
  checkNumber,
  
} = require('../controller/allcontrollers');

const router = express.Router();

// Define routes
router.get('/data/:number', getDataByNumber); // Get data by specific number
// router.get('/count/:number', getCountData); // Get count by number (using URL params)
router.get('/checkNumber/:number', checkNumber); // Check data for specific number (by number param)
router.post('/addData', postaddData); // Add new data
router.delete('/clearData', clearAllData); // Clear all data
// router.post('/existingData', existingData); // Endpoint for checking existing data (as per previous code)

module.exports = router;
