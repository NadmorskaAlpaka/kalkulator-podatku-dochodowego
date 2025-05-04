export const employeeTaxScale = (taxData,taxParameters,socialContributions) => {

    let tax = 0;
    let daninaValue = 0;

    const {taxScale} = taxParameters;
    const {danina} = taxParameters;

    const netIncome = (taxData.income - 3000);

    const taxBase = (netIncome - socialContributions.yearlySocialContributions);

    const isTaxFree = taxParameters.taxFreeAmout > taxBase ;

    if(!isTaxFree){

        // Progi podatkowe
        if(taxBase < taxScale.incomeThreshold){
            tax = ((taxBase * taxScale.firstPercentage) / 100) - 3600;
        } else if(taxBase >= taxScale.incomeThreshold){
            tax = (((taxScale.incomeThreshold * taxScale.firstPercentage) / 100) - 3600) + ((taxBase - taxScale.incomeThreshold) * taxScale.secondPercentage) / 100; 
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

    const taxScaleResult = {
        netIncome,
        taxBase,
        isTaxFree,
        tax,
        daninaValue,
    }

    return taxScaleResult;
}