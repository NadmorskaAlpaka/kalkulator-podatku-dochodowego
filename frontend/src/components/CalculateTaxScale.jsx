import React, { useState } from "react";
import { calculateTaxScale } from "../utils/calculateTaxScale";
import { calculateSocialContributions } from "../utils/calculateSocialContributions"
import { calculateHealthContributionsForTaxScale } from "../utils/calculateHealthContributionsForTaxScale"
import "../styles/calculateTaxScale.css";
import TaxResult from "./TaxResult";
import TaxStep from "./TaxStep";

const CalculateTaxScale = ({data}) => {

    const {taxData} = data;
    const {taxParameters} = data;
    const {socialContributions} = taxParameters;
    const {healthCountributions} = taxParameters;
    const {taxBreaks} = taxParameters;
    const {taxFreeAmout} = taxParameters;

    const [showSteps, setShowSteps] = useState(false);
    
    // Składka społeczna
    let socialContributionsValue = calculateSocialContributions(socialContributions);

    // Wyniki obliczeń podatku
    let taxScaleResult;

    if(taxData.taxWithSpous){
        taxScaleResult = calculateTaxScaleWithSpouse(taxData,taxParameters,socialContributionsValue);
    } else {
        taxScaleResult = calculateTaxScale(taxData,taxParameters,socialContributionsValue);
    }

    // Składka zdrowotna
    const healthContributionsValue = calculateHealthContributionsForTaxScale(taxScaleResult.netIncome, healthCountributions.taxScale.valuePercentage);

    // ulgi podatkowe
    const taxBreaksValue = 0;

    return (
        <div className="tax-result__box">
            <TaxResult tax={taxScaleResult.tax} 
                       socialContributions={socialContributionsValue.yearlySocialContributions}
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
                             calculations={`${taxData.income} zł - ${taxData.costsOfIncome} zł = ${taxScaleResult.netIncome} zł`} />
                    <TaxStep name="Ubezpieczenie emerytalne:" 
                             calculations={`${socialContributionsValue.contributionBasis} zł × ${socialContributions.uEmerytalnePercentage} % = ${socialContributionsValue.uEmerytalne} zł`} />
                    <TaxStep name="Ubezpieczenie rentowe:" 
                             calculations={`${socialContributionsValue.contributionBasis} zł × ${socialContributions.uRentowePercentage} % = ${socialContributionsValue.uRentowe} zł`} />
                    <TaxStep name="Ubezpieczenie chorobowe:" 
                             calculations={`${socialContributionsValue.contributionBasis} zł × ${socialContributions.uChorobowePercentage} % = ${socialContributionsValue.uChorobowe} zł`} />
                    <TaxStep name="Ubezpieczenie wypadkowe:" 
                             calculations={`${socialContributionsValue.contributionBasis} zł × ${socialContributions.uWypadkowePercentage} % = ${socialContributionsValue.uWypadkowe} zł`} />
                    <TaxStep name="Składka na fundusz pracy:" 
                             calculations={`${socialContributionsValue.contributionBasis} zł × ${socialContributions.funduszPracyPercentage} % = ${socialContributionsValue.funduszPracy} zł`} />
                    <TaxStep name="Miesięczna suma składek społecznych:" 
                             calculations={`${socialContributionsValue.monthlySocialContributions} zł`} />
                    <TaxStep name="Roczna suma składek społecznych:" 
                             calculations={`${socialContributionsValue.monthlySocialContributions}  ${socialContributionsValue.yearlySocialContributions} zł`} />
                    <TaxStep name="Składka zdrowotna:" 
                             calculations={`${taxScaleResult.netIncome} zł × 9% = ${healthContributionsValue} zł`} />
                    <TaxStep name="Podstawa opodatkowania:" 
                             calculations={`${taxScaleResult.taxBase} zł`} />
                    <TaxStep name="Zastosowanie kwoty wolnej od podatku:" 
                             calculations={`${!taxScaleResult.isTaxFree ? "Nie" : "Tak"} ponieważ ${taxFreeAmout} zł ${!taxScaleResult.isTaxFree ? "<" : ">"} ${taxScaleResult.taxBase} zł`} />
                    <TaxStep name="Należny podatek:" 
                             calculations={`${taxScaleResult.tax} zł`} />

                    {
                        taxScaleResult.daninaValue > 0 ? <TaxStep name="Danina solidatnościowa:" 
                            calculations={`(${taxScaleResult.netIncome} zł - 1000000 zł) * 4% = ${taxScaleResult.daninaValue} zł`} /> : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default CalculateTaxScale;