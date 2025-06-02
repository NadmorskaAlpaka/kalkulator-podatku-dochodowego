export const calculateHealthContributionForLumpSumTax = (income,healthContributions,avgIncomeLastQuaterPrevYear) => {

    let monthlyHealthContributionsValue = 0;
    let healthContributionBasis = 0;

    if(income < healthContributions.small.maxIncome){
        healthContributionBasis = (avgIncomeLastQuaterPrevYear * healthContributions.small.basisPercentage) / 100;
        monthlyHealthContributionsValue = (healthContributionBasis * healthContributions.small.valuePercentage) / 100;
    } else if (income >= healthContributions.small.maxIncome && income <= healthContributions.medium.maxIncome){
        healthContributionBasis = (avgIncomeLastQuaterPrevYear * healthContributions.medium.basisPercentage) / 100;
        monthlyHealthContributionsValue = (healthContributionBasis * healthContributions.medium.valuePercentage) / 100;
    } else if (income > healthContributions.medium.maxIncome) {
        healthContributionBasis = (avgIncomeLastQuaterPrevYear * healthContributions.big.basisPercentage) / 100;
        monthlyHealthContributionsValue = (healthContributionBasis * healthContributions.big.valuePercentage) / 100;
    }

    let yearlyHealthContributionsValue = monthlyHealthContributionsValue * 12;

    let healthContributionValueForLumpSumTax = {
        healthContributionBasis,
        monthlyHealthContributionsValue,
        yearlyHealthContributionsValue
    }

    return healthContributionValueForLumpSumTax;
}