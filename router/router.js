const express = require('express');
const { postaddData,getData,clearAllData, checkNumber, getCountData } = require('../controller/allcontrollers');
const router = express.Router();



// Define routes
// router.get('/data', allController.getData); // example route
router.get('/data', getData);
router.get('/checkNumber/:number', checkNumber); // New route to check number
router.post('/addData',postaddData);//example rote
router.delete('/clearData', clearAllData);
router.post('/getCountData',getCountData)
module.exports = router;