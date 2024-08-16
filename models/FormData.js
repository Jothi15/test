// models/FormData.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormDataSchema = new Schema({
  email: { type: String, required: true },
  people: {
    standard: [Number],
    professional: [Number],
    enterprise: [Number],
  },
  process: {
    standard: [Number],
    professional: [Number],
    enterprise: [Number],
  },
  technology: {
    standard: [Number],
    professional: [Number],
    enterprise: [Number],
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FormData', FormDataSchema);
