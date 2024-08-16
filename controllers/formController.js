const Form = require('../models/Form');
const { generatePDF } = require('../utils/generatePDF');
const nodemailer = require('nodemailer');

exports.submitForm = async (req, res) => {
    const { customerName, scores } = req.body;

    // Calculate averages
    const calcAverage = (scores) => scores.reduce((a, b) => a + b, 0) / scores.length;

    const standardAvg = calcAverage(scores.standard);
    const professionalAvg = calcAverage(scores.professional);
    const enterpriseAvg = calcAverage(scores.enterprise);

    // Save the form data
    const form = new Form({ customerName, scores });
    await form.save();

    // Generate PDF
    const pdfBuffer = await generatePDF(customerName, standardAvg, professionalAvg, enterpriseAvg);

    // Send email with PDF
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jothim021@gmail.com',
            pass: 'juat ucdi xaer ahfg'
        }
    });

    const mailOptions = {
        from: 'jothi@cuion.in',
        to: 'jothi@cuion.in',
        subject: 'Your ITSM Investment Report',
        text: `Dear ${customerName}, please find attached your ITSM Investment Report.`,
        attachments: [{ filename: 'report.pdf', content: pdfBuffer }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email sending error:', error);
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.status(200).json({ message: 'Form submitted successfully' });
    });
};
