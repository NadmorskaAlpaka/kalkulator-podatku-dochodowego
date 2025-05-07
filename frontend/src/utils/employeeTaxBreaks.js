export const employeeTaxBreaks = (taxData,taxBreaks) => {

    let internet = taxData.internetValue > taxBreaks.internetMaxValue ? taxBreaks.internetMaxValue : taxData.internetValue;

    let children = 0;
    const userChildrenNumber = parseInt(taxData.childrenNumber);

    if(userChildrenNumber === 0){
        children = 0;
    }else if (userChildrenNumber === 1) {
        children = taxBreaks.children.one.value;
    } else if (userChildrenNumber === 2) {
        children = taxBreaks.children.two;
    } else if (userChildrenNumber === 3) {
        children = taxBreaks.children.three;
    } else if (userChildrenNumber === 4) {
        children = taxBreaks.children.four;
    } else {
        const numOfChildrenAboveFour = userChildrenNumber - 4;
        children = taxBreaks.children.four + numOfChildrenAboveFour * taxBreaks.children.moreThanFour;
    }

    let bloodDonation = taxData.bloodLiters * taxBreaks.bloodDonation.value;
    if(bloodDonation > (taxData.income * taxBreaks.bloodDonation.maxIncomPercentage / 100)){
        bloodDonation = (taxData.income * taxBreaks.bloodDonation.maxIncomPercentage / 100);
    }

    let newTechnology = (taxData.newTechnologyValue * taxBreaks.newTechnologyPercentage) / 100;

    let rehabilitation = taxData.rehabilitationValue;

    let other = taxData.otherTaxBreakValue;

    if(!taxData.taxBreaksStatus.internet){
        internet = 0;
    }

    if(!taxData.taxBreaksStatus.child){
        children = 0;
    }

    if(!taxData.taxBreaksStatus.bloodDonation){
        bloodDonation = 0;
    }

    if(!taxData.taxBreaksStatus.newTech){
        newTechnology = 0;
    }

    if(!taxData.taxBreaksStatus.rehabilitation){
        rehabilitation = 0;
    }

    if(!taxData.taxBreaksStatus.other){
        other = 0;
    }

    const totalValue = internet + children + bloodDonation + newTechnology + rehabilitation + other;

    const taxBreaksResult = {
        totalValue,
        internet,
        children,
        bloodDonation,
        newTechnology,
        rehabilitation,
        other,
    }

    return taxBreaksResult;
}