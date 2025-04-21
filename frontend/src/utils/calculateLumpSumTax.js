export const calculateLumpSumTax = (data,socialContributionsValue,healthContributionsValue) => {

    const lumpSumValue = data.taxData.selectedLumpSumValue;
    const income = data.taxData.income;;
    let tax = 0;

    const limitHealtContribution = (healthContributionsValue.yearlyHealthContributionsValue / 2)

    const taxBase = income - socialContributionsValue.yearlySocialContributions - limitHealtContribution;

    if(taxBase > 0){
        tax = (taxBase * lumpSumValue) / 100;
    } else {
        tax = 0;
    }

    const lumpSumTaxResult = {
        tax,
        lumpSumValue,
        limitHealtContribution,
        taxBase,
    }

    return lumpSumTaxResult;
}