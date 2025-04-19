export const calculateTaxScaleWithSpouse = (taxData,taxParameters,socialContributions) => {

    let tax = 0;
    let daninaValue = 0;

    const {taxScale} = taxParameters;
    const {danina} = taxParameters;

    const netIncome = (taxData.income - taxData.costsOfIncome); 
    const taxBase = (netIncome - socialContributions.yearlySocialContributions);

    const {spouseIncome} = taxData;
    const spouseTaxBase = (spouseIncome - socialContributions.yearlySocialContributions);

    const totalTaxBase = taxBase + spouseTaxBase;
    const taxBasePerSpouse = totalTaxBase / 2;

    const isTaxFree = taxParameters.taxFreeAmout > taxBasePerSpouse ;

    if(!isTaxFree){
        let taxPerSpouse = 0;
        // Progi podatkowe
        if(taxBasePerSpouse <= taxScale.firstMaxIncome){
            taxPerSpouse = ((taxBasePerSpouse * taxScale.firstPercentage) / 100) - 3600;
        } else if(taxBasePerSpouse > taxScale.secondMinIncome){
            taxPerSpouse = (((taxScale.firstMaxIncome * taxScale.firstPercentage) / 100) - 3600) + ((taxBasePerSpouse - taxScale.firstMaxIncome) * taxScale.secondPercentage) / 100; 
        }

        tax = taxPerSpouse * 2;

        if(tax < 0){
            tax = 0;
        }

        // Danina solidarnościowa
        if(netIncome > danina.minIncome){
            daninaValue += ((netIncome - danina.minIncome) * danina.valuePercentage) / 100;
        }

        if(spouseIncome > danina.minIncome){
            daninaValue += ((netIncome - danina.minIncome) * danina.valuePercentage) / 100;
        }
    
    } else {
        tax = 0;
    }

    const taxScaleResult = {
        netIncome,
        taxBase,
        spouseIncome,
        spouseTaxBase,
        totalTaxBase,
        taxBasePerSpouse,
        isTaxFree,
        tax,
        daninaValue,
    }

    return taxScaleResult;
}