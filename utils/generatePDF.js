// utils/generatePDF.js

const { PDFDocument, rgb } = require('pdf-lib');
const { generateChart } = require('./generateChart');

const generatePDF = async (customerName, peopleScores, processScores, technologyScores) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  page.drawText(`ITSM Investment Report for ${customerName}`, {
    x: 50,
    y: height - 50,
    size: 20,
    color: rgb(0, 0, 0)
  });

  page.drawText('This report provides an analysis of your ITSM investments based on the modules...', {
    x: 50,
    y: height - 100,
    size: 12,
    color: rgb(0, 0, 0)
  });

  const chartBuffer = await generateChart(peopleScores, processScores, technologyScores);
  const chartImage = await pdfDoc.embedPng(chartBuffer);
  page.drawImage(chartImage, { x: 50, y: height - 400, width: 500, height: 300 });

  page.drawText(`People Scores: Standard ${peopleScores[0]}, Professional ${peopleScores[1]}, Enterprise ${peopleScores[2]}`, { x: 50, y: height - 450, size: 12 });
  page.drawText(`Process Scores: Standard ${processScores[0]}, Professional ${processScores[1]}, Enterprise ${processScores[2]}`, { x: 50, y: height - 470, size: 12 });
  page.drawText(`Technology Scores: Standard ${technologyScores[0]}, Professional ${technologyScores[1]}, Enterprise ${technologyScores[2]}`, { x: 50, y: height - 490, size: 12 });

  return await pdfDoc.save();
};

module.exports = { generatePDF };
