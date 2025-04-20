export const calculateHealtContributionForFlatTax = (netIncome,healthCountributions) => {

    let healthContributionsValue = (netIncome * healthCountributions.flatTax.valuePercentage) / 100;

    return healthContributionsValue;
}