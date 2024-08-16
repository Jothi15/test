// server.js

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { generatePDF } = require('./utils/generatePDF');
const { calculateAverages } = require('./utils/calculateAverages');
const FormData = require('./models/FormData'); // Import the FormData model
const cors = require('cors')

const app = express();
app.use(cors());

// MongoDB connection
const mongoURI = 'mongodb+srv://jothi:jothi123@cluster0.yx3lesk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Use your MongoDB connection string
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jothim021@gmail.com',
    pass: 'juat ucdi xaer ahfg'
  }
});

app.post('/api/submit-form', async (req, res) => {
  try {
    const { email, people, process, technology } = req.body;

    // Save form data to MongoDB
    const formData = new FormData({
      email,
      people,
      process,
      technology
    });

    await formData.save();

    // Calculate averages
    const peopleAverages = calculateAverages(people);
    const processAverages = calculateAverages(process);
    const technologyAverages = calculateAverages(technology);

    // Generate PDF
    const pdfBuffer = await generatePDF('Customer Name', peopleAverages, processAverages, technologyAverages);

    // Send email with PDF attachment
    const mailOptions = {
      from: 'jothi@cuion.in',
      to: "jothi@cuion.in",
      Cc : "mike.yee@manaopili.com",
      subject: 'Your ITSM Investment Report',
      text: 'Please find your ITSM Investment Report attached.',
      attachments: [
        {
          filename: 'report.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ success: false, message: 'Error sending email' });
      }
      res.json({ success: true, message: 'PDF generated and sent successfully' });
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ success: false, message: 'Error generating PDF' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
