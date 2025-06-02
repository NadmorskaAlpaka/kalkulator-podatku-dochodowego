export const calculateHealthContributionsForEmployeeTaxScale = (income, healthContributions, socialContributionsValue) => {
    let yearlyHealthContribution = ((income - socialContributionsValue.yearlySocialContributions) * healthContributions.taxScale.employeeValuePercentage) / 100;
    let monthlyHealthContribution = yearlyHealthContribution / 12;

    if(monthlyHealthContribution < healthContributions.taxScale.minHealthContribution){
        monthlyHealthContribution = healthContributions.taxScale.minHealthContribution;
        yearlyHealthContribution = monthlyHealthContribution * 12;
    }

    const healthContributionsValue = {
        monthlyHealthContribution,
        yearlyHealthContribution
    }

    return healthContributionsValue;
}