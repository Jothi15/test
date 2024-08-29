const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const ChartDataLabels = require('chartjs-plugin-datalabels');
const Chart = require('chart.js');

Chart.register(ChartDataLabels);

const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 1920, height: 1080});

async function generateChart(config) {
  return chartJSNodeCanvas.renderToBuffer(config);
}

async function generateITSMInvestmentScoresChart(peopleAverages, processAverages, technologyAverages, overallScores, title) {
    const config = {
      type: 'bar',
      data: {
        labels: [
          `Standard (${peopleAverages.standardAvg.toFixed(2)}, ${processAverages.standardAvg.toFixed(2)}, ${technologyAverages.standardAvg.toFixed(2)}, ${overallScores.standardOverall.toFixed(2)})`,
          `Professional (${peopleAverages.professionalAvg.toFixed(2)}, ${processAverages.professionalAvg.toFixed(2)}, ${technologyAverages.professionalAvg.toFixed(2)}, ${overallScores.professionalOverall.toFixed(2)})`,
          `Enterprise (${peopleAverages.enterpriseAvg.toFixed(2)}, ${processAverages.enterpriseAvg.toFixed(2)}, ${technologyAverages.enterpriseAvg.toFixed(2)}, ${overallScores.enterpriseOverall.toFixed(2)})`
        ],
        datasets: [
          {
            label: 'People',
            data: [peopleAverages.standardAvg, peopleAverages.professionalAvg, peopleAverages.enterpriseAvg],
            backgroundColor: '#4caf50',
          },
          {
            label: 'Process',
            data: [processAverages.standardAvg, processAverages.professionalAvg, processAverages.enterpriseAvg],
            backgroundColor: '#2196f3',
          },
          {
            label: 'Technology',
            data: [technologyAverages.standardAvg, technologyAverages.professionalAvg, technologyAverages.enterpriseAvg],
            backgroundColor: '#ff9800',
          },
          {
            label: 'Overall Score',
            data: [overallScores.standardOverall, overallScores.professionalOverall, overallScores.enterpriseOverall],
            backgroundColor: '#9c27b0',
          }
        ]
      },
      options: {
        plugins: {
          title: {
            color: '#000000',
            display: true,
            text: title,
            font: {
              size: 36,
            },
          },
          legend: {
            offset: 30,
            labels: {
              font: {
                size: 32,
              },
              padding: 20,
            },
          },
          datalabels: {
            display: true,
            anchor: 'end',
            align: 'top',
            color: 'black',
            font: {
              size: 30,
              weight: 'bold',
            },
            formatter: function(value) {
              return value.toFixed(2);
            },
          },
        },
        elements: {
          background: {
            color: '#54875' // Set the background color of the chart area
          }
        },
        scales: {
          y: {
            min: 0,
            max: 5,
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: {
                size: 24,
              },
              color: '#000000',
              padding: 10,
            },
          },
          x: {
            ticks: {
              font: {
                size: 32,
              },
              color: '#000000',
              padding: 10,
            },
          },
        },
      },
    };
    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(config);
    return imageBuffer;
}

async function generateOverallITSMModuleChart(overallITSMModule, title) {
    const configuration = {
        type: 'bar',
        data: {
            labels: [
                `Overall ITSM Module (People: ${overallITSMModule.overallPeople.toFixed(2)}, Process: ${overallITSMModule.overallProcess.toFixed(2)}, Technology: ${overallITSMModule.overallTechnology.toFixed(2)}, Overall: ${overallITSMModule.overallScore.toFixed(2)})`
            ],
            datasets: [
                {
                    label: 'People',
                    data: [overallITSMModule.overallPeople],
                    backgroundColor: '#F4D03F',
                },
                {
                    label: 'Process',
                    data: [overallITSMModule.overallProcess],
                    backgroundColor: '#D35400',
                },
                {
                    label: 'Technology',
                    data: [overallITSMModule.overallTechnology],
                    backgroundColor: '#38A01A',
                },
                {
                    label: 'Overall',
                    data: [overallITSMModule.overallScore],
                    backgroundColor: '#AD1537',
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: {
                        color: '#000000',
                        size: 36,
                    },
                },
                legend: {
                    labels: {
                        font: {
                            size: 32,
                        },
                        padding: 20,
                    },
                },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'top',
                    color: 'black',
                    font: {
                        size: 30,
                        weight: 'bold',
                    },
                    formatter: function(value) {
                        return value.toFixed(2);
                    },
                },
            },
            scales: {
                y: {
                    min: 0,
                    max: 5,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 24,
                        },
                        color: '#000000',
                        padding: 10,
                    },
                },
                x: {
                    ticks: {
                        font: {
                            size: 32,
                        },
                        color: '#000000',
                        padding: 10,
                    },
                },
            },
        },
    };

    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    return imageBuffer;
}

async function generateCurrentlyImplementedITSMModulesChart(currentlyImplementedITSMModules, title) {
    const configuration = {
        type: 'bar',
        data: {
            labels: [
                `Currently Implemented ITSM Modules (People: ${currentlyImplementedITSMModules.implementedPeople.toFixed(2)}, Process: ${currentlyImplementedITSMModules.implementedProcess.toFixed(2)}, Technology: ${currentlyImplementedITSMModules.implementedTechnology.toFixed(2)}, Overall: ${currentlyImplementedITSMModules.implementedScore.toFixed(2)})`
            ],
            datasets: [
                {
                    label: 'People',
                    data: [currentlyImplementedITSMModules.implementedPeople],
                    backgroundColor: '#93A82B',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Process',
                    data: [currentlyImplementedITSMModules.implementedProcess],
                    backgroundColor: '#2BA840',
                },
                {
                    label: 'Technology',
                    data: [currentlyImplementedITSMModules.implementedTechnology],
                    backgroundColor: '#3F34AE',
                },
                {
                    label: 'Overall',
                    data: [currentlyImplementedITSMModules.implementedScore],
                    backgroundColor: '#AE3487',
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 32,
                        },
                        padding: 20,
                    },
                },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'top',
                    color: 'black',
                    font: {
                        size: 30,
                        weight: 'bold',
                    },
                    formatter: function(value) {
                        return value.toFixed(2);
                    },
                },
            },
            scales: {
                y: {
                    min: 0,
                    max: 5,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 24,
                        },
                        color: '#000000',
                        padding: 10,
                    },
                },
                x: {
                    ticks: {
                        font: {
                            size: 32,
                        },
                        color: '#000000',
                        padding: 10,
                    },
                },
            },
        },
    };

    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    return imageBuffer;
}

module.exports = {
    generateITSMInvestmentScoresChart,
    generateOverallITSMModuleChart,
    generateCurrentlyImplementedITSMModulesChart,
};
