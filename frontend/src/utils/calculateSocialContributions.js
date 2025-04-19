export const calculateSocialContributions = (socialContributions) => {
    const contributionBasis = socialContributions.minSocialContributionBasis;

    const uEmerytalne = (contributionBasis * socialContributions.uEmerytalnePercentage) / 100;
    const uRentowe = (contributionBasis * socialContributions.uRentowePercentage) / 100;
    const uChorobowe = (contributionBasis * socialContributions.uChorobowePercentage) / 100; 
    const uWypadkowe = (contributionBasis * socialContributions.uWypadkowePercentage) / 100;
    const funduszPracy = (contributionBasis * socialContributions.funduszPracyPercentage) / 100;
    const monthlySocialContributions = (uEmerytalne + uRentowe + uChorobowe + uWypadkowe + funduszPracy)
    const yearlySocialContributions =  monthlySocialContributions * 12;

    const socialContributionsValue = {
        contributionBasis,
        uEmerytalne,
        uRentowe,
        uChorobowe,
        uWypadkowe,
        funduszPracy,
        monthlySocialContributions,
        yearlySocialContributions,
    }

    return socialContributionsValue;
}