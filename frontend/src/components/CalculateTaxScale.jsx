import React, { useEffect, useState } from "react";
import "../styles/calculateTaxScale.css";
import TaxResult from "./TaxResult";
import TaxStep from "./TaxStep";

const CalculateTaxScale = ({data}) => {

    // --- \/ - DATA PREPARATION - \/ --- //

    const {taxData} = data;
    const {taxParameters} = data;

    const {socialContributions} = taxParameters;
    const {taxScale} = taxParameters;
    const {healthCountributions} = taxParameters;
    const {taxBreaks} = taxParameters;
    const {danina} = taxParameters;
    const {taxFreeAmout} = taxParameters;

    // --- /\ --------------- /\ --- //

    const [showSteps, setShowSteps] = useState(false);

    let tax = 0;
    let taxBreaksValue = 0;
    let daninaValue = 0;

    const netIncome = (taxData.income - taxData.costsOfIncome);
    
    // Składka społeczna
    const contributionBasis = socialContributions.minSocialContributionBasis;

    const uEmerytalne = (contributionBasis * socialContributions.uEmerytalnePercentage) / 100;
    const uRentowe = (contributionBasis * socialContributions.uRentowePercentage) / 100;
    const uChorobowe = (contributionBasis * socialContributions.uChorobowePercentage) / 100; 
    const uWypadkowe = (contributionBasis * socialContributions.uWypadkowePercentage) / 100;
    const funduszPracy = (contributionBasis * socialContributions.funduszPracyPercentage) / 100;
    const monthlySocialContributions = (uEmerytalne + uRentowe + uChorobowe + uWypadkowe + funduszPracy)
    const yearlySocialContributions =  monthlySocialContributions * 12;

    // Składka zdrowotna
    const healthContributionsValue = (netIncome * healthCountributions.taxScale.valuePercentage) / 100;

    // Podstawa opodatkowania
    const taxBase = (netIncome - yearlySocialContributions);

    // Sprawdzenie kwotwy wolnej od podatku
    const isTaxFree = taxFreeAmout > taxBase ;

    if(!isTaxFree){

        // Progi podatkowe
        if(taxBase <= taxScale.firstMaxIncome){
            tax = ((taxBase * taxScale.firstPercentage) / 100) - 3600;
        } else if(taxBase > taxScale.secondMinIncome){
            tax = (((taxScale.firstMaxIncome * taxScale.firstPercentage) / 100) - 3600) + ((taxBase - taxScale.firstMaxIncome) * taxScale.secondPercentage) / 100; 
        }

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

    useEffect(() => {
        console.log("Calculate Tax Scale",data);
        console.log("Calculate Tax Scale tax data", taxData);
        console.log("Calculate Tax Scale tax parameters", taxParameters);
        console.log(isTaxFree)
        // console.log(typeof(contributionBasis))
        // console.log(typeof(netIncome))
        // console.log(typeof(uEmerytalne))
        // console.log(typeof(uRentowe))
        // console.log(typeof(uChorobowe))
        // console.log(typeof(uWypadkowe))
        // console.log(typeof(funduszPracy))
        // console.log(typeof(socialContributions))
        // console.log(typeof(healthContribution))
        // console.log(typeof(taxBase))
        // console.log(typeof(isTaxFree))
        // console.log(taxData);
        console.log("ulga na dzieci", taxBreaksValue);
    },[])

    return (
        <div className="tax-result__box">
            <TaxResult tax={tax} 
                       socialContributions={yearlySocialContributions}
                       healthContribution={healthContributionsValue}
            />
            <div className="tax-steps">
                <div className="tax-steps__head" onClick={() => setShowSteps(!showSteps)}>
                    <p className="tax-steps__header">Szczegółowe obliczenia podatku</p>
                    <button className="cta">{showSteps ? "Zamknij" : "Zobacz"}</button>
                </div>
                <div className={`tax-steps__body animated-box ${showSteps ? "open" : "closed"}`}>
                    <TaxStep name="Roczny przychód brutto:"
                             calculations={`${taxData.income} zł`} />
                    <TaxStep name="Roczne koszty uzyskania przychodu:"
                             calculations={`${taxData.costsOfIncome} zł`} />
                    <TaxStep name="Roczny przychód netto:"
                             calculations={`${taxData.income} zł - ${taxData.costsOfIncome} zł = ${netIncome} zł`} />
                    <TaxStep name="Ubezpieczenie emerytalne:" 
                             calculations={`${contributionBasis} zł × ${socialContributions.uEmerytalnePercentage} % = ${uEmerytalne} zł`} />
                    <TaxStep name="Ubezpieczenie rentowe:" 
                             calculations={`${contributionBasis} zł × ${socialContributions.uRentowePercentage} % = ${uRentowe} zł`} />
                    <TaxStep name="Ubezpieczenie chorobowe:" 
                             calculations={`${contributionBasis} zł × ${socialContributions.uChorobowePercentage} % = ${uChorobowe} zł`} />
                    <TaxStep name="Ubezpieczenie wypadkowe:" 
                             calculations={`${contributionBasis} zł × ${socialContributions.uWypadkowePercentage} % = ${uWypadkowe} zł`} />
                    <TaxStep name="Składka na fundusz pracy:" 
                             calculations={`${contributionBasis} zł × ${socialContributions.funduszPracyPercentage} % = ${funduszPracy} zł`} />
                    <TaxStep name="Miesięczna suma składek społecznych:" 
                             calculations={`${monthlySocialContributions} zł`} />
                    <TaxStep name="Roczna suma składek społecznych:" 
                             calculations={`${monthlySocialContributions}  ${yearlySocialContributions} zł`} />
                    <TaxStep name="Składka zdrowotna:" 
                             calculations={`${netIncome} zł × 9% = ${healthContributionsValue} zł`} />
                    <TaxStep name="Podstawa opodatkowania:" 
                             calculations={`${taxBase} zł`} />
                    <TaxStep name="Zastosowanie kwoty wolnej od podatku:" 
                             calculations={`${!isTaxFree ? "Nie" : "Tak"} ponieważ ${taxFreeAmout} zł ${!isTaxFree ? "<" : ">"} ${taxBase} zł`} />
                    <TaxStep name="Należny podatek:" 
                             calculations={`${tax} zł`} />

                    {taxBreaksValue}
                    {
                        daninaValue > 0 ? <TaxStep name="Danina solidatnościowa:" 
                            calculations={`(${netIncome} zł - 1000000 zł) * 4% = ${daninaValue} zł`} /> : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default CalculateTaxScale;