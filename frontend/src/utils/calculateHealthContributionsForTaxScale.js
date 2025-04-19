export const calculateHealthContributionsForTaxScale = (netIncome,percentage) => {
    return (netIncome * percentage) / 100
}