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
  console.log(req.body);
  try {
    const { number } = req.body; // Ensure you are extracting `number` from the request body
    const numberIsExisting = await CountSeries.findOne({ number });

    // Check if the number already exists in the database
    if (numberIsExisting) {
      console.log(numberIsExisting);
      // If it exists, return the existing count
      return res.status(200).json({ 
        message: `Existing count is ${numberIsExisting.count}`, 
        count: numberIsExisting.count ,
        number:numberIsExisting.number
      });
    } else {
      // If it doesn't exist, return a different message
      return res.status(201).json({ message: 'No existing countdata for this number' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from the database.' });
  }
};

app.post('/data', async (req, res) => {
  const { number, count } = req.body;

  try {
    // Check if the number already exists
    let existingData = await DataModel.findOne({ number });

    if (existingData) {
      // Update the count if the number already exists
      existingData.count += count; // or update as needed
      await existingData.save();
      return res.status(200).json({ message: 'Data updated successfully' });
    } else {
      // Create new record if the number does not exist
      const newData = new DataModel({ number, count });
      await newData.save();
      return res.status(201).json({ message: 'Data saved successfully' });
    }
  } catch (error) {
    console.error('Error saving data:', error);
    return res.status(500).json({ message: 'Error saving data' });
  }
});

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
    // Check if the number exists in the database
    const result = await Data.findOne({ number: number });

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
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
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
  checkNumber,
  getCountData,
  existingData
};
