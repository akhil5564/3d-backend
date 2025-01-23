const mongoose = require('mongoose');

const countSeriesSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

// Declare the model only once
const CountSeries = mongoose.model('CountSeries', countSeriesSchema);

module.exports = CountSeries;