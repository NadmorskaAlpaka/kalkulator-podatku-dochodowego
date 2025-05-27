export const calculateEmployeeHealthContributionsForTaxScale = (income, healthCountributions, socialContributionsValue) => {
    let yearlyHealthContribution = ((income - socialContributionsValue.yearlySocialContributions) * healthCountributions.taxScale.employeeValuePercentage) / 100;
    let monthlyHealthContribution = yearlyHealthContribution / 12;

    if(monthlyHealthContribution < 314.96){
        monthlyHealthContribution = 314.96;
        yearlyHealthContribution = monthlyHealthContribution * 12;
    }

    const healthContributionsValue = {
        monthlyHealthContribution,
        yearlyHealthContribution
    }

    return healthContributionsValue;
}