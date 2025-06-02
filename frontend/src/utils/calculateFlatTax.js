export const calculateFlatTax = (taxData,taxParameters,socialContributionsValue,healthContributionsValue) => {

    const { flatTax } = taxParameters;
    const { danina } = taxParameters;
    const { healthDeductionLimit } = taxParameters.healthContributions.flatTax

    let tax = 0;
    let daninaValue = 0

    const netIncome = (taxData.income - taxData.costsOfIncome);

    const healthContriubutionWithLimit = healthContributionsValue > healthDeductionLimit ? healthDeductionLimit : healthContributionsValue;

    const taxBase = (netIncome - socialContributionsValue.yearlySocialContributions - healthContriubutionWithLimit);

    if (taxBase > 0) {
        tax = (taxBase * flatTax) / 100;
    } else {
        tax = 0;
    }

    if (netIncome > danina.minIncome) {
        daninaValue = ((netIncome - danina.minIncome) * danina.valuePercentage) / 100;
    }

    const flatTaxResult = {
        netIncome,
        taxBase,
        healthContriubutionWithLimit,
        tax,
        daninaValue,
    }

    return flatTaxResult;
}