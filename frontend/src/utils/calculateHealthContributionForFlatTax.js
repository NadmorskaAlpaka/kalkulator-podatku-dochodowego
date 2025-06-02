export const calculateHealthContributionForFlatTax = (netIncome,healthContributions) => {

    let healthContributionsValue = (netIncome * healthContributions.flatTax.valuePercentage) / 100;

    return healthContributionsValue;
}