import React, { useState } from "react";
import { calculateTaxScaleWithSpouse } from "../utils/calculateTaxScaleWithSpouse";
import { calculateSocialContributions } from "../utils/calculateSocialContributions"
import { calculateHealthContributionsForTaxScale } from "../utils/calculateHealthContributionsForTaxScale"
import { formatPLN } from "../utils/formatPLN";
import "../styles/calculateTaxScale.css";
import TaxResult from "./TaxResult";
import TaxStep from "./TaxStep";

const CalculateTaxScaleWithSpouse = ({data}) => {

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
    const taxScaleResult = calculateTaxScaleWithSpouse(taxData,taxParameters,socialContributionsValue);

    // Składka zdrowotna
    const healthContributionsValue = calculateHealthContributionsForTaxScale(taxScaleResult.netIncome, healthCountributions.taxScale.valuePercentage);
    const spouseHealthContributionValue = calculateHealthContributionsForTaxScale(taxData.spouseIncome, healthCountributions.taxScale.valuePercentage);
    
    // ulgi podatkowe
    const taxBreaksValue = 0;

    return (
        <div className="tax-result__box">
            <TaxResult tax={taxScaleResult.tax} 
                       socialContributions={socialContributionsValue.yearlySocialContributions}
                       healthContribution={healthContributionsValue}
                       spouseHealthContribution={spouseHealthContributionValue}
                       taxWithSpouse={true}
            />
            <div className="tax-steps">
                <div className="tax-steps__head" onClick={() => setShowSteps(!showSteps)}>
                    <p className="tax-steps__header">Szczegółowe obliczenia podatku</p>
                    <button className="cta">{showSteps ? "Zamknij" : "Zobacz"}</button>
                </div>
                <div className={`tax-steps__body animated-box ${showSteps ? "open" : "closed"}`}>
                    <p className="tax-step__heading">1. Dane podstawowe:</p>  
                    <TaxStep name="Roczny przychód:"
                             calculations={`${taxData.income} zł`} />
                    <TaxStep name="Roczne koszty uzyskania przychodu:"
                             calculations={`${taxData.costsOfIncome} zł`} />
                    <TaxStep name="Roczny dochód:"
                             calculations={`${taxData.income} zł - ${taxData.costsOfIncome} zł = ${taxScaleResult.netIncome} zł`} />
                    <TaxStep name="Roczny dochód małżonka:"
                             calculations={`${taxData.spouseIncome} zł`} />
                    <p className="tax-step__heading">2. Obliczanie składek społecznych:</p>   
                    <TaxStep name="Ubezpieczenie emerytalne:" 
                             calculations={`${formatPLN(socialContributionsValue.contributionBasis)} × ${socialContributions.uEmerytalnePercentage} % = ${formatPLN(socialContributionsValue.uEmerytalne)}`} />
                    <TaxStep name="Ubezpieczenie rentowe:" 
                             calculations={`${formatPLN(socialContributionsValue.contributionBasis)} × ${socialContributions.uRentowePercentage} % = ${formatPLN(socialContributionsValue.uRentowe)}`} />
                    <TaxStep name="Ubezpieczenie chorobowe:" 
                             calculations={`${formatPLN(socialContributionsValue.contributionBasis)} × ${socialContributions.uChorobowePercentage} % = ${formatPLN(socialContributionsValue.uChorobowe)}`} />
                    <TaxStep name="Ubezpieczenie wypadkowe:" 
                             calculations={`${formatPLN(socialContributionsValue.contributionBasis)} × ${socialContributions.uWypadkowePercentage} % = ${formatPLN(socialContributionsValue.uWypadkowe)}`} />
                    <TaxStep name="Składka na fundusz pracy:" 
                             calculations={`${formatPLN(socialContributionsValue.contributionBasis)} × ${socialContributions.funduszPracyPercentage} % = ${formatPLN(socialContributionsValue.funduszPracy)}`} />
                    <TaxStep name="Miesięczna suma składek społecznych:" 
                             calculations={`${formatPLN(socialContributionsValue.monthlySocialContributions)}`} />
                    <TaxStep name="Roczna suma składek społecznych:" 
                             calculations={`${formatPLN(socialContributionsValue.monthlySocialContributions)} × 12 = ${formatPLN(socialContributionsValue.yearlySocialContributions)}`} />
                    <p className="tax-step__heading">3. Obliczanie składki zdrowotnej:</p>  
                    <TaxStep name="Składka zdrowotna:" 
                             calculations={`${taxScaleResult.netIncome} zł × ${healthCountributions.taxScale.valuePercentage}% = ${formatPLN(healthContributionsValue)}`} />
                    <TaxStep name="Składka zdrowotna małżonka:" 
                        calculations={`${taxData.spouseIncome} zł × 9% = ${formatPLN(spouseHealthContributionValue)}`} />
                    <p className="tax-step__heading">4. Obliczanie podstawy opodatkowania:</p>
                    <TaxStep name="Podstawa opodatkowania:" 
                             calculations={`${formatPLN(taxScaleResult.taxBase)}`} />
                    <TaxStep name="Podstawa opodatkowania małżonka:" 
                             calculations={`${formatPLN(taxScaleResult.spouseTaxBase)}`} />
                    <TaxStep name="Łączna podstawa opodatkowania:" 
                             calculations={`${formatPLN(taxScaleResult.taxBase)} + ${formatPLN(taxScaleResult.spouseTaxBase)} = ${formatPLN(taxScaleResult.totalTaxBase)}`} />
                    <TaxStep name="Podstawa opodatkowania na małżonka:" 
                             calculations={`${formatPLN(taxScaleResult.totalTaxBase)} / 2 = ${formatPLN(taxScaleResult.taxBasePerSpouse)}`} />
                    <p className="tax-step__heading">5. Zastosowanie kwoty wolnej od podatku:</p>     
                    <TaxStep name="Wolny od podatku:" 
                             calculations={`${!taxScaleResult.isTaxFree ? "Nie" : "Tak"} ponieważ ${taxFreeAmout} zł ${!taxScaleResult.isTaxFree ? "<" : ">"} ${formatPLN(taxScaleResult.taxBasePerSpouse)}`} />
                    { 
                        taxScaleResult.taxBase < taxParameters.taxScale.incomeThreshold ? 
                        <>
                            <p className="tax-step__heading">6. Obliczenie podatku - pierwszy prog podatkowy:</p>  
                            <TaxStep name="Obliczenie podatku:" 
                                    calculations={`${formatPLN(taxScaleResult.taxBasePerSpouse)} × ${taxParameters.taxScale.firstPercentage}% - 3600 zł = ${formatPLN(taxScaleResult.taxPerSpouse)}`} />
                        </>
                        :
                        <>
                            <p className="tax-step__heading">6. Obliczenie podatku - drugi próg podatkowy:</p>  
                            <TaxStep name="Obliczenie podatku:" 
                                    calculations={`(${formatPLN(taxScaleResult.taxBasePerSpouse)} × ${taxParameters.taxScale.firstPercentage}% - 3600 zł) + (${formatPLN(taxScaleResult.taxBasePerSpouse)} - ${formatPLN(taxParameters.taxScale.incomeThreshold)}) × ${taxParameters.taxScale.secondPercentage} % = ${formatPLN(taxScaleResult.taxPerSpouse)}`} />
                        </>
                    }
                    <TaxStep name="Należny podatek na małżonka:" 
                             calculations={`${formatPLN(taxScaleResult.taxPerSpouse)}`} />
                    <TaxStep name="Obliczanie łącznego podatku:" 
                             calculations={`${formatPLN(taxScaleResult.taxPerSpouse)} × 2 = ${formatPLN(taxScaleResult.tax)}`} />
                    <TaxStep name="Łączny podatek:" 
                             calculations={`${formatPLN(taxScaleResult.tax)}`} />
                    {
                        taxScaleResult.daninaValue > 0 ? 
                        <>
                            <p className="tax-step__heading">7. Obliczenie daniny solidarnościowej:</p>
                            <TaxStep name="Danina solidatnościowa:" 
                                     calculations={`(${taxScaleResult.netIncome} zł - 1000000 zł) * 4% = ${taxScaleResult.daninaValue} zł`} /> 
                        </>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default CalculateTaxScaleWithSpouse;