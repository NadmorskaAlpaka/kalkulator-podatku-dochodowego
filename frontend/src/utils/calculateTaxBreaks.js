const calculateTaxBreaks = () => {
    console.log("TEST", taxData.availableTaxBreaks);
    if(taxData.availableTaxBreaks){
        console.log("obliczam dzieci")

        let bloodDonation = taxData.bloodLiters * taxBreaks.bloodDonation.value;

        let childrenTaxBreak;
        // let {children} = taxBreaks;
        let userChildrenNumber = Number(taxData.childrenNumber);
        console.log("Liczba dzieci", userChildrenNumber)

        if(userChildrenNumber === 1){
            childrenTaxBreak = taxBreaks.children.one.value;
        } else if (userChildrenNumber === 2){
            childrenTaxBreak = taxBreaks.children.two;
        } else if (userChildrenNumber === 3){
            childrenTaxBreak = taxBreaks.children.three;
        } else if (userChildrenNumber === 4){
            childrenTaxBreak = taxBreaks.children.four;
        } else {
            let numOfChildrenAboveFour = userChildrenNumber - 4;
            childrenTaxBreak = taxBreaks.children.four + numOfChildrenAboveFour * taxBreaks.children.moreThanFour;
        }

        taxBreaksValue = childrenTaxBreak;

        let internet = taxData.internetValue > taxBreaks.internetMaxValue ? taxBreaks.internetMaxValue : taxData.internetValue;

        let newTechnology = (taxData.newTechnologyValue * taxBreaks.newTechnologyPercentage) / 100;

        // let taxData.rehabilitationValue

        let other = taxData.otherTaxBreakValue;
    }
}