export const calculateStartAndSmallSocialContributions = (socialContributions) => {
    const contributionBasis = socialContributions.minSmallZUSSocialContributionBasis;

    const uEmerytalne = Number(((contributionBasis * socialContributions.uEmerytalnePercentage) / 100).toFixed(2));
    const uRentowe = Number(((contributionBasis * socialContributions.uRentowePercentage) / 100).toFixed(2));
    const uChorobowe = Number(((contributionBasis * socialContributions.uChorobowePercentage) / 100).toFixed(2)); 
    const uWypadkowe = Number(((contributionBasis * socialContributions.uWypadkowePercentage) / 100).toFixed(2));
    const monthlySocialContributions = (uEmerytalne + uRentowe + uChorobowe + uWypadkowe)

    const yearlySocialContributions = monthlySocialContributions * (12 - socialContributions.ZUSForStartReliefPeriod);

    const socialContributionsValue = {
        contributionBasis,
        uEmerytalne,
        uRentowe,
        uChorobowe,
        uWypadkowe,
        monthlySocialContributions,
        yearlySocialContributions
    }

    return socialContributionsValue;
}