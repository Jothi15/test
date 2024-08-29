// utils/calculateAverages.js
function calculateAverages(scores) {
  const standardAvg = scores.standard.reduce((a, b) => a + b, 0) / scores.standard.length || 0;
  const professionalAvg = scores.professional.reduce((a, b) => a + b, 0) / scores.professional.length || 0;
  const enterpriseAvg = scores.enterprise.reduce((a, b) => a + b, 0) / scores.enterprise.length || 0;

  return { standardAvg, professionalAvg, enterpriseAvg };
}

function calculateOverall(peopleAverages, processAverages, technologyAverages) {
  const standardOverall = (peopleAverages.standardAvg + processAverages.standardAvg + technologyAverages.standardAvg) / 3;
  const professionalOverall = (peopleAverages.professionalAvg + processAverages.professionalAvg + technologyAverages.professionalAvg) / 3;
  const enterpriseOverall = (peopleAverages.enterpriseAvg + processAverages.enterpriseAvg + technologyAverages.enterpriseAvg) / 3;

  return { standardOverall, professionalOverall, enterpriseOverall };
}

function calculateOverallITSMModule(people, process, technology) {
  const overallPeople = calculateOverallScore(people);
  const overallProcess = calculateOverallScore(process);
  const overallTechnology = calculateOverallScore(technology);

  const overallScore = (overallPeople + overallProcess + overallTechnology) / 3;

  return {
      overallPeople,
      overallProcess,
      overallTechnology,
      overallScore // New overall score for ITSM Module
  };
}

function calculateCurrentlyImplementedITSMModules(people, process, technology) {
  const implementedPeople = calculateImplementedScore(people);
  const implementedProcess = calculateImplementedScore(process);
  const implementedTechnology = calculateImplementedScore(technology);

  const implementedScore = (implementedPeople + implementedProcess + implementedTechnology) / 3;

  return {
      implementedPeople,
      implementedProcess,
      implementedTechnology,
      implementedScore // New overall score for Implemented ITSM Modules
  };
}


function calculateOverallScore(data) {
  const allScores = [...data.standard, ...data.professional, ...data.enterprise];
  const totalSum = allScores.reduce((a, b) => a + b, 0);
  return totalSum / allScores.length;
}

function calculateImplementedScore(data) {
  const allScores = [...data.standard, ...data.professional, ...data.enterprise].filter(val => val !== 0);
  const totalSum = allScores.reduce((a, b) => a + b, 0);
  return totalSum / allScores.length;
}

module.exports = { calculateAverages, calculateOverall, calculateOverallITSMModule, calculateCurrentlyImplementedITSMModules };
