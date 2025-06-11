import React, { useState } from "react";
import { calculateTaxScale } from "../utils/calculateTaxScale";
import { companyTaxBreaks }from "../utils/companyTaxBreaks";
import { calculateSocialContributions } from "../utils/calculateSocialContributions";
import { calculateSmallSocialContributions } from "../utils/calculateSmallSocialContributions";
import { calculateStartSocialContributions } from "../utils/calculateStartSocialContributions";
import { calculateStartAndSmallSocialContributions } from "../utils/calculateStartAndSmallSocialContributions";
import { calculateHealthContributionForTaxScale } from "../utils/calculateHealthContributionForTaxScale";
import { formatPLN } from "../utils/formatPLN";
import "../styles/calculateTaxScale.css";
import TaxResult from "./TaxResult";
import TaxStep from "./TaxStep";

const CalculateTaxScale = ({data}) => {

    const {taxData} = data;
    const {taxParameters} = data;
    const {socialContributions} = taxParameters;
    const {healthContributions} = taxParameters;
    const {taxBreaks} = taxParameters;
    const {taxFreeAmount} = taxParameters;

    const [showSteps, setShowSteps] = useState(false);
    
    // Składka społeczna
    let socialContributionsValue = 0 
    
    if(taxData.zus == "maly_zus"){
        socialContributionsValue = calculateSmallSocialContributions(socialContributions);
    } else if(taxData.zus == "zus_na_start") {
        socialContributionsValue = calculateStartSocialContributions(socialContributions);
    } else if(taxData.zus == "start_i_maly_zus") {
        socialContributionsValue = calculateStartAndSmallSocialContributions(socialContributions);
    } else {
        socialContributionsValue = calculateSocialContributions(socialContributions);
    }

    // Ulgi podatkowe
    const taxBreaksValue = companyTaxBreaks(taxData, taxBreaks);

    // Wyniki obliczeń podatku
    const taxScaleResult = calculateTaxScale(taxData,taxParameters,socialContributionsValue,taxBreaksValue.totalValue);

    // Składka zdrowotna
    const healthContributionsValue = calculateHealthContributionForTaxScale(taxScaleResult.netIncome, healthContributions.taxScale.valuePercentage, taxParameters);

    return (
        <div className="tax-result__box">
            {
                taxData.availableTaxBreaks ?
                <TaxResult tax={taxScaleResult.taxAfterTaxReductions} 
                    socialContributions={socialContributionsValue.yearlySocialContributions}
                    healthContribution={healthContributionsValue}
                /> 
                :
                <TaxResult tax={taxScaleResult.tax} 
                    socialContributions={socialContributionsValue.yearlySocialContributions}
                    healthContribution={healthContributionsValue}
                />
            }
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
                    <p className="tax-step__heading">2. Obliczanie składek społecznych:</p>  
                    {
                        taxData.zus == "maly_zus" && <TaxStep name="Mały ZUS:" />
                    }
                    {
                        taxData.zus == "zus_na_start" && 
                        <>
                            <TaxStep name={`Zus na start: Zwolnienie ze składek przez pierwsze ${socialContributions.ZUSForStartReliefPeriod} miesięcy.`} />
                            <TaxStep name={`Składki w pozostałe miesiące:`} />
                        </>
                    }
                    {
                        taxData.zus == "start_i_maly_zus" && 
                        <>
                            <TaxStep name={"Zus na start z Małym ZUS-em:"} />
                            <TaxStep name={`Zwolnienie ze składek przez pierwsze ${socialContributions.ZUSForStartReliefPeriod} miesięcy.`} />
                            <TaxStep name={`Składki w pozostałe miesiące:`} />
                        </>
                    }       
                    <TaxStep name="Ubezpieczenie emerytalne:" 
                             calculations={`${formatPLN(socialContributionsValue.contributionBasis)} × ${socialContributions.uEmerytalnePercentage} % = ${formatPLN(socialContributionsValue.uEmerytalne)}`} />
                    <TaxStep name="Ubezpieczenie rentowe:" 
                             calculations={`${formatPLN(socialContributionsValue.contributionBasis)} × ${socialContributions.uRentowePercentage} % = ${formatPLN(socialContributionsValue.uRentowe)}`} />
                    <TaxStep name="Ubezpieczenie chorobowe:" 
                             calculations={`${formatPLN(socialContributionsValue.contributionBasis)} × ${socialContributions.uChorobowePercentage} % = ${formatPLN(socialContributionsValue.uChorobowe)}`} />
                    <TaxStep name="Ubezpieczenie wypadkowe:" 
                             calculations={`${formatPLN(socialContributionsValue.contributionBasis)} × ${socialContributions.uWypadkowePercentage} % = ${formatPLN(socialContributionsValue.uWypadkowe)}`} />
                    {
                        (taxData.zus != "maly_zus" && taxData.zus != "start_i_maly_zus") && <TaxStep name="Składka na fundusz pracy:" 
                             calculations={`${formatPLN(socialContributionsValue.contributionBasis)} × ${socialContributions.funduszPracyPercentage} % = ${formatPLN(socialContributionsValue.funduszPracy)}`} />
                    }
                    <TaxStep name="Miesięczna suma składek społecznych:" 
                             calculations={`${formatPLN(socialContributionsValue.monthlySocialContributions)}`} />
                    <TaxStep name="Roczna suma składek społecznych:" 
                             calculations={`${formatPLN(socialContributionsValue.monthlySocialContributions)} × ${(taxData.zus == "start_i_maly_zus" || taxData.zus == "zus_na_start") ? 12 - socialContributions.ZUSForStartReliefPeriod : "12"} = ${formatPLN(socialContributionsValue.yearlySocialContributions)}`} />
                    <p className="tax-step__heading">3. Obliczanie składki zdrowotnej:</p>  
                    <TaxStep name="Składka zdrowotna:" 
                             calculations={`${taxScaleResult.netIncome} zł × ${healthContributions.taxScale.valuePercentage}% = ${formatPLN(healthContributionsValue)}`} />
                    <p className="tax-step__heading">4. Obliczanie podstawy opodatkowania:</p>
                    <TaxStep name="Podstawa opodatkowania:" 
                             calculations={`${formatPLN(taxScaleResult.netIncome)} - ${formatPLN(socialContributionsValue.yearlySocialContributions)} = ${formatPLN(taxScaleResult.taxBase)}`} />
                    <TaxStep name="Podstawa opodatkowania:" 
                             calculations={`${formatPLN(taxScaleResult.taxBase)} zł`} />
                    <p className="tax-step__heading">5. Zastosowanie kwoty wolnej od podatku:</p>     
                    <TaxStep name="Wolny od podatku:" 
                             calculations={`${!taxScaleResult.isTaxFree ? "Nie" : "Tak"} ponieważ ${taxFreeAmount} zł ${!taxScaleResult.isTaxFree ? "<" : ">"} ${formatPLN(taxScaleResult.taxBase)}`} />
                    { 
                        taxScaleResult.taxBase < taxParameters.taxScale.incomeThreshold ? 
                        <>
                            <p className="tax-step__heading">6. Obliczenie podatku - pierwszy prog podatkowy:</p>
                            {
                            !taxScaleResult.isTaxFree ?   
                            <TaxStep name="Obliczenie podatku:" 
                                    calculations={`${formatPLN(taxScaleResult.taxBase)} × ${taxParameters.taxScale.lowerRatePercentage}% - ${formatPLN(taxScaleResult.yearlyTaxReduction)} = ${formatPLN(taxScaleResult.tax)}`} />
                            :
                            <TaxStep name="Wolny od podatku" />
                            }
                        </>
                        :
                        <>
                            <p className="tax-step__heading">6. Obliczenie podatku - drugi próg podatkowy:</p>
                            {
                            !taxScaleResult.isTaxFree ?     
                            <TaxStep name="Obliczenie podatku:" 
                                    calculations={`(${formatPLN(taxParameters.taxScale.incomeThreshold)} × ${taxParameters.taxScale.lowerRatePercentage}% - ${formatPLN(taxScaleResult.yearlyTaxReduction)}) + (${formatPLN(taxScaleResult.taxBase)} - ${formatPLN(taxParameters.taxScale.incomeThreshold)}) × ${taxParameters.taxScale.higherRatePercentage} % = ${formatPLN(taxScaleResult.tax)}`} />
                            :
                            <TaxStep name="Wolny od podatku" />
                            }
                        </>
                    }
                    <TaxStep name="Należny podatek:" 
                             calculations={`${formatPLN(taxScaleResult.tax)}`} />
                    {
                        taxData.availableTaxBreaks &&
                        <>
                            <p className="tax-step__heading">7. Odliczenie ulg podatkowych:</p>
                            <TaxStep name="Ulga na internet:" 
                                    calculations={`${formatPLN(taxBreaksValue.internet)}`} />
                            <TaxStep name="Ulga rehabilitacyjna:" 
                                    calculations={`${formatPLN(taxBreaksValue.rehabilitation)}`} />
                            <TaxStep name="Ulga prorodzinna" 
                                    calculations={`${formatPLN(taxBreaksValue.children)}`} />
                            <TaxStep name="Inna ulga:" 
                                    calculations={`${formatPLN(taxBreaksValue.other)}`} />
                            <TaxStep name="Suma ulg podatkowych:" 
                                    calculations={`${formatPLN(taxBreaksValue.totalValue)}`} />
                            <p className="tax-step__heading">8. Podatek końcowy:</p>
                            <TaxStep name="Obliczenie podatku po odjęciu ulg:" 
                                    calculations={`${formatPLN(taxScaleResult.tax)} - ${formatPLN(taxBreaksValue.totalValue)} = ${formatPLN(taxScaleResult.tax - taxBreaksValue.totalValue)}`} />
                            <TaxStep name="Finalny podatek:" 
                                    calculations={`${formatPLN(taxScaleResult.taxAfterTaxReductions)}`} />
                        </>
                    }
                    {
                        taxScaleResult.daninaValue > 0 ? 
                        <>
                            <p className="tax-step__heading">* Obliczenie daniny solidarnościowej:</p>
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

export default CalculateTaxScale;