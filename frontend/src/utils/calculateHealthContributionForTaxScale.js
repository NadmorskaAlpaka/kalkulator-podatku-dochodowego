export const calculateHealthContributionForTaxScale = (netIncome,percentage,taxParameters) => {
    let healthContribution = (netIncome * percentage) / 100;
    if(healthContribution < (taxParameters.healthContributions.taxScale.minHealthContribution * 12)){
        healthContribution = taxParameters.healthContributions.taxScale.minHealthContribution * 12;
    }
    return healthContribution;
}