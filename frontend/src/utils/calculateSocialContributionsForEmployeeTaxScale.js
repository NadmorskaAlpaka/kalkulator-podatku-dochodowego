export const calculateSocialContributionsForEmployeeTaxScale = (employeeSocialContributions, income) => {

    const monthlyIncome = income / 12;
    const uEmerytalne = (monthlyIncome * employeeSocialContributions.uEmerytalnePercentage) / 100;
    const uRentowe = (monthlyIncome * employeeSocialContributions.uRentowePercentage) / 100;
    const uChorobowe = (monthlyIncome * employeeSocialContributions.uChorobowePercentage) / 100; 
    const monthlySocialContributions = (uEmerytalne + uRentowe + uChorobowe);
    const yearlySocialContributions =  monthlySocialContributions * 12;

    const employeeSocialContributionsValue = {
        monthlyIncome,
        uEmerytalne,
        uRentowe,
        uChorobowe,
        monthlySocialContributions,
        yearlySocialContributions,
    }

    return employeeSocialContributionsValue;
}