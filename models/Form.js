const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    customerName: String,
    scores: {
        standard: [Number],
        professional: [Number],
        enterprise: [Number]
    }
});

module.exports = mongoose.model('Form', FormSchema);
