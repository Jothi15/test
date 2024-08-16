// utils/calculateAverages.js

const calculateAverages = (scores) => {
  const totalStandard = scores.standard.reduce((sum, score) => sum + score, 0) / scores.standard.length;
  const totalProfessional = scores.professional.reduce((sum, score) => sum + score, 0) / scores.professional.length;
  const totalEnterprise = scores.enterprise.reduce((sum, score) => sum + score, 0) / scores.enterprise.length;

  return [totalStandard, totalProfessional, totalEnterprise];
};

module.exports = { calculateAverages };
