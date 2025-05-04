export const calculateHealthContributionForLumpSumTax = (income,healthCountributions,avgIncomeLastQuaterPrevYear) => {

    let monthlyHealthContributionsValue = 0;
    let healthContributionBasis = 0;

    if(income < healthCountributions.small.maxIncome){
        healthContributionBasis = (avgIncomeLastQuaterPrevYear * healthCountributions.small.basisPercentage) / 100;
        monthlyHealthContributionsValue = (healthContributionBasis * healthCountributions.small.valuePercentage) / 100;
    } else if (income >= healthCountributions.small.maxIncome && income <= healthCountributions.medium.maxIncome){
        healthContributionBasis = (avgIncomeLastQuaterPrevYear * healthCountributions.medium.basisPercentage) / 100;
        monthlyHealthContributionsValue = (healthContributionBasis * healthCountributions.medium.valuePercentage) / 100;
    } else if (income > healthCountributions.medium.maxIncome) {
        healthContributionBasis = (avgIncomeLastQuaterPrevYear * healthCountributions.big.basisPercentage) / 100;
        monthlyHealthContributionsValue = (healthContributionBasis * healthCountributions.big.valuePercentage) / 100;
    }

    let yearlyHealthContributionsValue = monthlyHealthContributionsValue * 12;

    let healthContributionValueForLumpSumTax = {
        healthContributionBasis,
        monthlyHealthContributionsValue,
        yearlyHealthContributionsValue
    }

    return healthContributionValueForLumpSumTax;
}