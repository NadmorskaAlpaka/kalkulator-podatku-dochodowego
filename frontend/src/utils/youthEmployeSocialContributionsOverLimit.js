export const youthEmployeSocialContributionsOverLimit = (employeeSocialContributions, taxData) => {

    const uEmerytalne = (taxData.income * employeeSocialContributions.uEmerytalnePercentage) / 100;
    const uRentowe = (taxData.income* employeeSocialContributions.uRentowePercentage) / 100;
    const uChorobowe = (taxData.income * employeeSocialContributions.uChorobowePercentage) / 100; 
    const yearlySocialContributions = (uEmerytalne + uRentowe + uChorobowe);
    const monthlySocialContributions = yearlySocialContributions / 12;

    const employeeSocialContributionsValue = {
        taxedIncome: taxData.income,
        uEmerytalne,
        uRentowe,
        uChorobowe,
        monthlySocialContributions,
        yearlySocialContributions,
    }

    return employeeSocialContributionsValue;
}