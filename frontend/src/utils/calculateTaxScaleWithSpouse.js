export const calculateTaxScaleWithSpouse = (taxData,taxParameters,socialContributions,taxBreaksValue) => {

    let tax = 0;
    let daninaValue = 0;
    let spouseDaninaValue = 0;

    const {taxScale} = taxParameters;
    const {danina} = taxParameters;

    const netIncome = (taxData.income - taxData.costsOfIncome); 
    const taxBase = (netIncome - socialContributions.yearlySocialContributions);

    const spouseNetIncome = (taxData.spouseIncome - taxData.spouseCostsOfIncome);
    const spouseTaxBase = (spouseNetIncome - socialContributions.yearlySocialContributions);

    const totalTaxBase = taxBase + spouseTaxBase;
    const taxBasePerSpouse = totalTaxBase / 2;

    const isTaxFree = taxParameters.taxFreeAmount > taxBasePerSpouse ;
    let taxPerSpouse = 0;

    const yearlyTaxReduction = taxScale.monthlyTaxReductionAmount * 12;

    if(!isTaxFree){
        // Progi podatkowe
        if(taxBasePerSpouse <= taxScale.incomeThreshold){
            taxPerSpouse = ((taxBasePerSpouse * taxScale.lowerRatePercentage) / 100) - yearlyTaxReduction;
        } else if(taxBasePerSpouse > taxScale.incomeThreshold){
            taxPerSpouse = (((taxScale.incomeThreshold * taxScale.lowerRatePercentage) / 100) - yearlyTaxReduction) + ((taxBasePerSpouse - taxScale.incomeThreshold) * taxScale.higherRatePercentage) / 100; 
        }

        tax = taxPerSpouse * 2;

        if(tax < 0){
            tax = 0;
        }

        // danina solidarnościowa
        if(netIncome > danina.minIncome){
            daninaValue += ((netIncome - danina.minIncome) * danina.valuePercentage) / 100;
        }

        if(spouseNetIncome > danina.minIncome){
            spouseDaninaValue += ((spouseNetIncome - danina.minIncome) * danina.valuePercentage) / 100;
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
        spouseNetIncome,
        spouseTaxBase,
        totalTaxBase,
        taxBasePerSpouse,
        isTaxFree,
        taxPerSpouse,
        yearlyTaxReduction,
        tax,
        taxAfterTaxReductions,
        daninaValue,
        spouseDaninaValue
    }

    return taxScaleResult;
}