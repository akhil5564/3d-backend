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
  try {
const number=req.body   
const numberIsExisting = await CountSeries.findOne({ number });

    // Check if data exists
    if (numberIsExisting) {
console.log(numberIsExisting);
      // return res.status(404).json({ message: 'No data found in CountSeries.' });
    }
    else{
      return res.status(201).json({ message: 'no existing countdata' });
    }

    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from the database.' });
  }
};

const clearAllData = async (req, res) => {
  try {
    // Delete all documents in the collection
    await CountSeries.deleteMany({});
    return res.status(200).json({ message: 'All data cleared successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error clearing data. Please try again later.' });
  }
};

const checkNumber = async (req, res) => {
  const { number } = req.params;

  try {
    // Your database query logic here
    const data = await YourModel.findOne({ number: parseInt(number) });

    if (data) {
      res.json({
        number: data.number,
        count: data.count
      });
    } else {
      res.status(404).json({ message: 'Number not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const postaddData = async (req, res) => {
  const dataArray = req.body; // Array of objects from the request body

  try {
    // Loop over each item in the array
    for (let data of dataArray) {
      const { count, number, type } = data;

      // Check if the number already exists in the CountSeries collection
      const numberIsExisting = await CountSeries.findOne({ number });

      if (numberIsExisting) {
        console.log('hi');
        // If the number exists, check if the sum of the current count and new count exceeds 5
        const newCount = Number(count) + Number(numberIsExisting.count); // Sum the counts as numbers
console.log(typeof newCount);
console.log(newCount);
        // Check if the sum exceeds 5
        if (newCount > 5) {
          console.log('hello');
          // If the sum exceeds 5, return error
          return res.status(400).json({ 
            message: `The sum of counts exceeds the allowed limit of 5 for number ${number}. Data not saved.`, 
            blockNumber: number // Indicate which number is blocked
          });
        } else {
          // If the sum is valid (<= 5), update the existing document with the new count
          numberIsExisting.count = newCount.toString(); // Save the updated document
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
    // Handle errors
    console.error(error);
    return res.status(500).json({ message: 'Error processing your request' });
  }
};

module.exports = {
  postaddData,
  getData,
  clearAllData,
  checkNumber
};
