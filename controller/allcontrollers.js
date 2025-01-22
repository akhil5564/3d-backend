const CountSeries = require("../model/countSeriesSchema");

const getData = async (req, res) => {
  try {
    // Fetch all documents from the CountSeries collection
    const data = await CountSeries.find();

    // Check if data exists
    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found in CountSeries.' });
    }

    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from the database.' });
  }
};

const getCountData = async (req, res) => {
  const { number } = req.params; // Get number from URL params (not body)
  try {
    const numberIsExisting = await CountSeries.findOne({ number });

    // Check if the number already exists in the database
    if (numberIsExisting) {
      return res.status(200).json({
        message: `Existing count is ${numberIsExisting.count}`,
        count: numberIsExisting.count,
        number: numberIsExisting.number
      });
    } else {
      // If it doesn't exist, return a different message
      return res.status(404).json({ message: `No existing countdata for number ${number}` });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from the database.' });
  }
};

// Add data and update existing if applicable
const postaddData = async (req, res) => {
  const dataArray = req.body; // Array of objects from the request body

  try {
    // Loop over each item in the array
    for (let data of dataArray) {
      const { count, number, type } = data;

      // Check if the number already exists in the CountSeries collection
      const numberIsExisting = await CountSeries.findOne({ number });

      if (numberIsExisting) {
        const newCount = Number(count) + Number(numberIsExisting.count); // Sum the counts as numbers

        // Check if the sum exceeds the limit of 5
        if (newCount > 5) {
          // If the sum exceeds 5, return error
          return res.status(400).json({
            message: `The sum of counts exceeds the allowed limit of 5 for number ${number}. Data not saved.`,
            blockNumber: number // Indicate which number is blocked
          });
        } else {
          // If the sum is valid (<= 5), update the existing document with the new count
          numberIsExisting.count = newCount.toString(); // Save the updated count
          await numberIsExisting.save(); // Save the updated document
        }
      } else {
        // If the number does not exist, check if the new count itself exceeds 5
        if (Number(count) > 5) {
          // If the count exceeds 5, return error
          return res.status(400).json({
            message: `The count exceeds the allowed limit of 5 for number ${number}. Data not saved.`,
            blockNumber: number // Indicate which number is blocked
          });
        } else {
          // If the count is valid, create a new document and save it
          const newCountSeries = new CountSeries({ count, number, type });
          await newCountSeries.save(); // Save the new document
        }
      }
    }

    // Return success message after processing all data
    return res.status(200).json({ message: 'CountSeries updated successfully' });
  } catch (error) {
    console.error('Error processing data:', error);
    return res.status(500).json({ message: 'Error processing your request' });
  }
};

// Clear all data
const clearAllData = async (req, res) => {
  try {
    // Delete all documents in the CountSeries collection
    await CountSeries.deleteMany({});
    return res.status(200).json({ message: 'All data cleared successfully' });
  } catch (error) {
    console.error('Error clearing data:', error);
    return res.status(500).json({ message: 'Error clearing data. Please try again later.' });
  }
};

// Check number using URL param for cleaner REST API
const checkNumber = async (req, res) => {
  const { number } = req.params; // Get number from URL params

  try {
    // Check if the number exists in the CountSeries collection
    const result = await CountSeries.findOne({ number });

    if (result) {
      // If the number is found, return it along with the count
      return res.status(200).json({
        number: result.number,
        count: result.count,
      });
    } else {
      // If the number is not found, return a message
      return res.status(404).json({ message: 'Number not found' });
    }
  } catch (error) {
    console.error('Error fetching number:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// API endpoint for adding data
const postaddData = async (req, res) => {
  const dataArray = req.body; // Array of objects from the request body

  try {
    // Loop over each item in the array
    for (let data of dataArray) {
      const { count, number, type } = data;

      // Check if the number already exists in the CountSeries collection
      const numberIsExisting = await CountSeries.findOne({ number });

      if (numberIsExisting) {
        const newCount = Number(count) + Number(numberIsExisting.count); // Sum the counts as numbers

        // Check if the sum exceeds the limit of 5
        if (newCount > 5) {
          // If the sum exceeds 5, return error
          return res.status(400).json({
            message: `The sum of counts exceeds the allowed limit of 5 for number ${number}. Data not saved.`,
            blockNumber: number // Indicate which number is blocked
          });
        } else {
          // If the sum is valid (<= 5), update the existing document with the new count
          numberIsExisting.count = newCount.toString(); // Save the updated count
          await numberIsExisting.save(); // Save the updated document
        }
      } else {
        // If the number does not exist, check if the new count itself exceeds 5
        if (Number(count) > 5) {
          // If the count exceeds 5, return error
          return res.status(400).json({
            message: `The count exceeds the allowed limit of 5 for number ${number}. Data not saved.`,
            blockNumber: number // Indicate which number is blocked
          });
        } else {
          // If the count is valid, create a new document and save it
          const newCountSeries = new CountSeries({ count, number, type });
          await newCountSeries.save(); // Save the new document
        }
      }
    }

    // Return success message after processing all data
    return res.status(200).json({ message: 'CountSeries updated successfully' });
  } catch (error) {
    console.error('Error processing data:', error);
    return res.status(500).json({ message: 'Error processing your request' });
  }
};

// Export functions
module.exports = {
  postaddData,
  getData,
  clearAllData,
  checkNumber,
  getCountData
};
