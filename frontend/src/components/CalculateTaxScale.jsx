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

    let tax;
    let taxBreaksValue;
    let daninaValue;

    const netIncome = (taxData.income - taxData.costsOfIncome);
    
    // Składka społeczna
    const contributionBasis = socialContributions.minSocialContributionBasis;

    const uEmerytalne = (contributionBasis * socialContributions.uEmerytalnePercentage) / 100;
    const uRentowe = (contributionBasis * socialContributions.uRentowePercentage) / 100;
    const uChorobowe = (contributionBasis * socialContributions.uChorobowePercentage) / 100; 
    const uWypadkowe = (contributionBasis * socialContributions.uWypadkowePercentage) / 100;
    const funduszPracy = (contributionBasis * socialContributions.funduszPracyPercentage) / 100;
    const socialContributionsValue = uEmerytalne + uRentowe + uChorobowe + uWypadkowe + funduszPracy;

    // Składka zdrowotna
    const healthContributionsValue = (netIncome * healthCountributions.taxScale.valuePercentage) / 100;

    // Podstawa opodatkowania
    const taxBase = (netIncome - socialContributionsValue * 12);

    // Sprawdzenie kwotwy wolnej od podatku
    const isTaxFree = taxFreeAmout > taxBase ;

    if(!isTaxFree){

        // Progi podatkowe
        if(taxBase <= taxScale.firstMaxIncome){
            tax = ((taxBase * taxScale.firstPercentage) / 100) - 3600;
        } else if(taxBase > taxScale.secondMinIncome){
            tax = (((taxScale.firstMaxIncome * taxScale.firstPercentage) / 100) - 3600) + ((taxBase - taxScale.firstMaxIncome) * taxScale.secondPercentage) / 100; 
        }

        if(taxData.availableTaxBreaks){

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
    },[])

    return (
        <div className="tax-result__box">
            <TaxResult tax={tax} 
                       socialContributions={socialContributionsValue}
                       healthContribution={healthContributionsValue}
            />
            <div className="tax-steps">
                <div className="tax-steps__head" onClick={() => setShowSteps(!showSteps)}>
                    <p className="tax-steps__header">Szczegółowe obliczenia podatku</p>
                    <button className="cta">{showSteps ? "Zamknij" : "Zobacz"}</button>
                </div>
                <div className={`tax-steps__body animated-box ${showSteps ? "open" : "closed"}`}>
                    {/* <TaxStep name="Roczny przychód brutto:"
                             calculations={`${taxData.income} zł`} />
                    <TaxStep name="Roczne koszty uzyskania przychodu:"
                             calculations={`${taxData.costsOfIncome} zł`} />
                    <TaxStep name="Roczny przychód netto:"
                             calculations={`${taxData.income} zł - ${taxData.costsOfIncome} zł = ${netIncome} zł`} />
                    <TaxStep name="Ubezpieczenie emerytalne:" 
                             calculations={`${contributionBasis} zł * 19.52% = ${uEmerytalne} zł`} />
                    <TaxStep name="Ubezpieczenie rentowe:" 
                             calculations={`${contributionBasis} zł * 8% = ${uRentowe} zł`} />
                    <TaxStep name="Ubezpieczenie chorobowe:" 
                             calculations={`${contributionBasis} zł * 2.45% = ${uChorobowe} zł`} />
                    <TaxStep name="Ubezpieczenie wypadkowe:" 
                             calculations={`${contributionBasis} zł * 1.67% = ${uWypadkowe} zł`} />
                    <TaxStep name="Składka na fundusz pracy:" 
                             calculations={`${contributionBasis} zł * 2.45% = ${funduszPracy} zł`} />
                    <TaxStep name="Suma składek społecznych:" 
                             calculations={`${socialContributions} zł`} />
                    <TaxStep name="Składka zdrowotna:" 
                             calculations={`${netIncome} zł * 9% = ${healthContribution} zł`} />
                    <p>{taxBase}</p>
                    <p>{isTaxFree ? "Kontynuacja obliczania podatku" : "Wolny od podatku"}</p>
                    <p>{tax}</p>
                    <TaxStep name="Danina solidatnościowa:" 
                             calculations={`(${netIncome} zł - 1000000 zł) * 4% = ${danina} zł`} />
                    <p>danina {danina}</p> */}
                </div>
            </div>
        </div>
    )
}

export default CalculateTaxScale;