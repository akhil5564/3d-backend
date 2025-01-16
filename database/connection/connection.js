// Import necessary modules
const mongoose = require('mongoose');
require('dotenv').config();


// Access the MongoDB URI from environment variables
const mongoURI = process.env.MONGODB_URI;


mongoose.connect(mongoURI)

  .then(() => { console.log('Connected to MongoDB Atlas'); })
  .catch((err) => { console.error('Error connecting to MongoDB Atlas', err); });




