export const calculateEmployeeHealthContributionsForTaxScale = (income, healthCountributions, socialContributionsValue) => {
    const yearlyHealthContribution = ((income - socialContributionsValue.yearlySocialContributions) * healthCountributions.taxScale.employeeValuePercentage) / 100;
    const monthlyHealthContribution = yearlyHealthContribution / 12;

    const healthContributionsValue = {
        monthlyHealthContribution,
        yearlyHealthContribution
    }

    return healthContributionsValue;
}