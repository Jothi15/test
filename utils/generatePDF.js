// utils/generatePDF.js

const PDFDocument = require('pdfkit');
const {
    generateITSMInvestmentScoresChart,
    generateOverallITSMModuleChart,
    generateCurrentlyImplementedITSMModulesChart
} = require('./generateChart');

async function generatePDF(email, peopleAverages, processAverages, technologyAverages, overallScores, overallITSMModule, currentlyImplementedITSMModules) {
    const doc = new PDFDocument();
    const filePath = `/tmp/${email}-report.pdf`;

    doc.text(`Email: ${email}`, 50, 50);
    doc.text().text('ITSM Investment Survey', { align: 'center' });

    // Page 1: ITSM Investment Scores
    const itsmInvestmentChart = await generateITSMInvestmentScoresChart(peopleAverages, processAverages, technologyAverages, overallScores);
    doc.text().text('ITSM Investment Scores by Product Suite', { align: 'center' });
    doc.image(itsmInvestmentChart, { fit: [500, 300], align: 'center', valign: 'center' });

    // Page 2: Overall ITSM Module Scores
    const overallITSMChart = await generateOverallITSMModuleChart(overallITSMModule);
    doc.addPage().text('Overall ITSM Module Scores', { align: 'center' });
    doc.image(overallITSMChart, { fit: [500, 300], align: 'center', valign: 'center' });

    // Page 3: Currently Implemented ITSM Modules Scores
    const implementedITSMChart = await generateCurrentlyImplementedITSMModulesChart(currentlyImplementedITSMModules);
    doc.addPage().text('Currently Implemented ITSM Modules Scores', { align: 'center' });
    doc.image(implementedITSMChart, { fit: [500, 300], align: 'center', valign: 'center' });

    // Finalize PDF file
    doc.end();

    return new Promise((resolve, reject) => {
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });
    });
}

module.exports = { generatePDF };
