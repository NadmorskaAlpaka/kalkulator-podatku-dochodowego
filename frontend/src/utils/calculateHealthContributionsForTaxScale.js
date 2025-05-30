export const calculateHealthContributionsForTaxScale = (netIncome,percentage,taxParameters) => {
    let healthContribution = (netIncome * percentage) / 100;
    if(healthContribution < (taxParameters.healthCountributions.taxScale.minHealthCountributions * 12)){
        healthContribution = taxParameters.healthCountributions.taxScale.minHealthCountributions * 12;
    }
    return healthContribution;
}