const express = require('express');
const { postaddData,getData,clearAllData, checkNumber, getCountData, existingData } = require('../controller/allcontrollers');
const router = express.Router();



// Define routes
// router.get('/data', allController.getData); // example route
router.get('/data', getData);
router.get('/checkNumber/:number', checkNumber);
router.post('/addData',postaddData);//example rote
router.delete('/clearData', clearAllData);
router.post('/getCountData',getCountData);
router.post('./existingData',existingData)
module.exports = router;
