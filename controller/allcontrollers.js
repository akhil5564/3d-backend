const CountSeries = require('../model/countSeriesSchema');

// Function to check if a number exists and return its count
const checkNumber = async (req, res) => {
  const { number } = req.params; // Get the number from the URL parameter

  try {
    const result = await CountSeries.findOne({ number }); // Search for the number in the database
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

// Function to add new data or update existing number
const postaddData = async (req, res) => {
  const { count, number, type } = req.body; // Extract data from request body

  try {
    // Check if the number already exists in the database
    const existingNumber = await CountSeries.findOne({ number });
    if (existingNumber) {
      // Update existing number's count
      const updatedData = await CountSeries.updateOne(
        { number },
        { $set: { count: String(Number(existingNumber.count) + Number(count)) } }
      );
      return res.status(200).json({
        message: `Number ${number} updated successfully`,
        data: updatedData,
      });
    } else {
      // Create a new document if the number does not exist
      const newData = new CountSeries({ count, number, type });
      await newData.save();
      res.status(201).json({ message: 'Data added successfully', data: newData });
    }
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ message: 'Error adding data to the database' });
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

// Function to get data for a specific number
const getDataByNumber = async (req, res) => {
  const { number } = req.params; // Get the number from the URL parameter

  try {
    const data = await CountSeries.findOne({ number }); // Find the document by number

    if (!data) {
      // If no data found for the given number, return a 404
      return res.status(404).json({ message: `No data found for number ${number}` });
    }

    // If data is found, return it as JSON
    res.json(data);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from the database' });
  }
};

// Export the functions to use them in routes
module.exports = {
  postaddData,
  getDataByNumber,
  checkNumber,
  getCountData,
};
