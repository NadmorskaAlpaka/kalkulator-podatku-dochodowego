export const calculateTaxScale = (taxData,taxParameters,socialContributions,taxBreaksValue) => {

    let tax = 0;
    let daninaValue = 0;

    const {taxScale} = taxParameters;
    const {danina} = taxParameters;

    const netIncome = (taxData.income - taxData.costsOfIncome);

    const taxBase = (netIncome - socialContributions.yearlySocialContributions);

    const isTaxFree = taxParameters.taxFreeAmount > taxBase ;

    const yearlyTaxReduction = taxScale.monthlyTaxReductionAmount * 12;

    if(!isTaxFree){

        // Progi podatkowe
        if(taxBase < taxScale.incomeThreshold){
            tax = ((taxBase * taxScale.lowerRatePercentage) / 100) - yearlyTaxReduction;
        } else if(taxBase >= taxScale.incomeThreshold){
            tax = (((taxScale.incomeThreshold * taxScale.lowerRatePercentage) / 100) - yearlyTaxReduction) + ((taxBase - taxScale.incomeThreshold) * taxScale.higherRatePercentage) / 100; 
        }

        if(tax < 0){
            tax = 0;
        }

        // Danina solidarnościowa
        if(netIncome > danina.minIncome){
            daninaValue = ((netIncome - danina.minIncome) * danina.valuePercentage) / 100;
        }
    
    } else {
        tax = 0;
    }

    let taxAfterTaxReductions = tax - taxBreaksValue;
    if(taxAfterTaxReductions < 0){
        taxAfterTaxReductions = 0;
    }

    const taxScaleResult = {
        netIncome,
        taxBase,
        isTaxFree,
        yearlyTaxReduction,
        tax,
        taxAfterTaxReductions,
        daninaValue
    }

    return taxScaleResult;
}