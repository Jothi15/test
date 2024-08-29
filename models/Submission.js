const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    email: { type: String, required: true },
    standardModules: [{ people: Number, process: Number, technology: Number }],
    professionalModules: [{ people: Number, process: Number, technology: Number }],
    enterpriseModules: [{ people: Number, process: Number, technology: Number }],
    standardAverages: { peopleAvg: Number, processAvg: Number, technologyAvg: Number },
    professionalAverages: { peopleAvg: Number, processAvg: Number, technologyAvg: Number },
    enterpriseAverages: { peopleAvg: Number, processAvg: Number, technologyAvg: Number },
    dateSubmitted: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Submission', SubmissionSchema);
