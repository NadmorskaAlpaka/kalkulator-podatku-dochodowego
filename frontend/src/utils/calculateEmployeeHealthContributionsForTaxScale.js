export const calculateEmployeeHealthContributionsForTaxScale = (taxData, healthCountributions, socialContributionsValue) => {
    const yearlyHealthContribution = ((taxData.income - socialContributionsValue.yearlySocialContributions) * healthCountributions.taxScale.employeeValuePercentage) / 100;
    const monthlyHealthContribution = yearlyHealthContribution / 12;

    const healthContributionsValue = {
        monthlyHealthContribution,
        yearlyHealthContribution
    }

    return healthContributionsValue;
}