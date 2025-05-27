export const calculateHealthContributionsForTaxScale = (netIncome,percentage) => {
    let healthContribution = (netIncome * percentage) / 100;
    if(healthContribution < (314.96 * 12)){
        healthContribution = 314.96 * 12;
    }
    return healthContribution;
}