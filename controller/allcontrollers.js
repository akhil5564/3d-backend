const CountSeries = require('../model/countSeriesSchema');

// Function to get all data
const getData = async (req, res) => {
  try {
    const data = await CountSeries.find(); // Retrieve all entries from the collection
    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(data); // Send the retrieved data
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from the database' });
  }
};

// Function to check if a number exists in the collection
const checkNumber = async (req, res) => {
  const { number } = req.params; // Get the number from the URL parameter

  try {
    const result = await CountSeries.findOne({ number }); // Search for a document matching the number
    if (result) {
      return res.status(200).json({
        number: result.number,
        count: result.count,
      });
    } else {
      return res.status(404).json({ message: `Number ${number} not found` });
    }
  } catch (error) {
    console.error('Error checking number:', error);
    res.status(500).json({ message: 'Error checking the number in the database' });
  }
};

// Function to add data
const postaddData = async (req, res) => {
  const { count, number, type } = req.body; // Extract data from request body

  try {
    // Check if the number already exists in the database
    const existingNumber = await CountSeries.findOne({ number });
    if (existingNumber) {
      return res.status(400).json({ message: `Number ${number} already exists` });
    }

    // Create a new document if the number does not exist
    const newData = new CountSeries({ count, number, type });
    await newData.save();
    res.status(201).json({ message: 'Data added successfully', data: newData });
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ message: 'Error adding data to the database' });
  }
};

// Function to clear all data
const clearAllData = async (req, res) => {
  try {
    await CountSeries.deleteMany(); // Deletes all documents in the collection
    res.status(200).json({ message: 'All data cleared successfully' });
  } catch (error) {
    console.error('Error clearing data:', error);
    res.status(500).json({ message: 'Error clearing data from the database' });
  }
};

// Function to get count data based on the number
const getCountData = async (req, res) => {
  const { number } = req.body; // Get the number from the body
  try {
    const data = await CountSeries.findOne({ number });
    if (data) {
      res.status(200).json({ count: data.count });
    } else {
      res.status(404).json({ message: `No data found for number ${number}` });
    }
  } catch (error) {
    console.error('Error fetching count data:', error);
    res.status(500).json({ message: 'Error fetching count data from the database' });
  }
};

// Function to check if the data already exists
const existingData = async (req, res) => {
  const { number } = req.body; // Get the number from the body

  try {
    const data = await CountSeries.findOne({ number });
    if (data) {
      res.status(200).json({
        message: `Existing data found for number ${number}`,
        data, // Return the data
      });
    } else {
      res.status(404).json({ message: `No data found for number ${number}` });
    }
  } catch (error) {
    console.error('Error checking existing data:', error);
    res.status(500).json({ message: 'Error checking existing data in the database' });
  }
};

module.exports = {
  postaddData,
  getData,
  clearAllData,
  checkNumber,
  getCountData,
  existingData,
};
