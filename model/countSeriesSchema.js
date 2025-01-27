const mongoose = require('mongoose');

// Define the schema for the countSeries collection
const countSeriesSchema = mongoose.Schema({
  // Use MongoDB's default _id or define a custom `id` if necessary
  count: { type: Number, required: true },   // count is a required field
  number: { type: Number, required: true },  // number is a required field
  super: { type: Boolean },  // super is a required field
  box: { type: Boolean },    // box is a required field
}, {
  timestamps: true  // Automatically create createdAt and updatedAt fields
});

// Create the model
const CountSeries = mongoose.model('CountSeries', countSeriesSchema);

// Export the model
module.exports = CountSeries;