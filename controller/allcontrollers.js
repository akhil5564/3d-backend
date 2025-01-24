const express = require('express');
const router = express.Router();
const CountSeries = require('../model/countSeriesSchema');

// Fetch all data from the CountSeries collection
router.get('/data', async (req, res) => {
  try {
    const data = await CountSeries.find(); // Fetch all documents
    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found in CountSeries.' });
    }
    res.json(data); // Return the data as a response
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from the database.' });
  }
});

// Get the count data for a specific number (using GET to fetch data)
router.get('/getCountData/:number', async (req, res) => {
  const { number } = req.params; // Extract the number from the route parameter

  try {
    const numberIsExisting = await CountSeries.findOne({ number });

    if (numberIsExisting) {
      return res.status(200).json({
        message: `Existing count is ${numberIsExisting.count}`,
        count: numberIsExisting.count,
        number: numberIsExisting.number,
      });
    } else {
      return res.status(404).json({ message: 'No existing count data for this number' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from the database.' });
  }
});

// Post new data or update the existing count data
router.post('/data', async (req, res) => {
  const { number, count } = req.body;

  try {
    let existingData = await CountSeries.findOne({ number });

    if (existingData) {
      existingData.count += count;  // Update the count if the number already exists
      await existingData.save();
      return res.status(200).json({ message: 'Data updated successfully' });
    } else {
      const newData = new CountSeries({ number, count });
      await newData.save();
      return res.status(201).json({ message: 'Data saved successfully' });
    }
  } catch (error) {
    console.error('Error saving data:', error);
    return res.status(500).json({ message: 'Error saving data' });
  }
});

// Clear all data in the collection
router.delete('/clearAllData', async (req, res) => {
  try {
    await CountSeries.deleteMany({});  // Delete all documents from the collection
    return res.status(200).json({ message: 'All data cleared successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error clearing data. Please try again later.' });
  }
});

// Check if a number exists in the collection and return its count
router.get('/checkNumber/:number', async (req, res) => {
  const { number } = req.params;  // Extract the number from the route parameter

  try {
    const result = await CountSeries.findOne({ number });

    if (result) {
      return res.status(200).json({
        number: result.number,
        count: result.count,
      });
    } else {
      return res.status(404).json({ message: 'Number not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Post data for multiple numbers (array of data)
router.post('/postaddData', async (req, res) => {
  const dataArray = req.body;  // Array of objects from the request body

  try {
    for (let data of dataArray) {
      const { count, number, type } = data;

      const numberIsExisting = await CountSeries.findOne({ number });

      if (numberIsExisting) {
        const newCount = Number(count) + Number(numberIsExisting.count); // Sum the counts

        if (newCount > 5) {
          return res.status(400).json({
            message: `The sum of counts exceeds the allowed limit of 5 for number ${number}. Data not saved.`,
            blockNumber: number,
          });
        } else {
          numberIsExisting.count = newCount.toString();  // Update the count
          await numberIsExisting.save();
        }
      } else {
        if (Number(count) > 5) {
          return res.status(400).json({
            message: `The count exceeds the allowed limit of 5 for number ${number}. Data not saved.`,
            blockNumber: number,
          });
        } else {
          const newCountSeries = new CountSeries({ count, number, type });
          await newCountSeries.save();
        }
      }
    }

    return res.status(200).json({ message: 'CountSeries updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error processing your request' });
  }
});

module.exports = router;
