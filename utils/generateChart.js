// utils/generateChart.js

const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const generateChart = async (peopleScores, processScores, technologyScores) => {
  const width = 600;
  const height = 400;
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const configuration = {
    type: 'bar',
    data: {
      labels: ['Standard ITSM Modules', 'Professional ITSM Modules', 'Enterprise ITSM Modules'],
      datasets: [
        {
          label: 'People',
          data: peopleScores,
          backgroundColor: '#4caf50',
        },
        {
          label: 'Process',
          data: processScores,
          backgroundColor: '#2196f3',
        },
        {
          label: 'Technology',
          data: technologyScores,
          backgroundColor: '#f44336',
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  return imageBuffer;
};

module.exports = { generateChart };
