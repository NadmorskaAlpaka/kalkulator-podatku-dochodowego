import React, { useState } from "react";
import TaxResult from "./TaxResult";
import TaxStep from "./TaxStep";
import { calculateSocialContributions } from "../utils/calculateSocialContributions";
import { calculateSmallSocialContributions } from "../utils/calculateSmallSocialContributions";
import { calculateStartSocialContributions } from "../utils/calculateStartSocialContributions";
import { calculateStartAndSmallSocialContributions } from "../utils/calculateStartAndSmallSocialContributions";
import { calculateHealthContributionForFlatTax } from "../utils/calculateHealthContributionForFlatTax";
import { calculateFlatTax } from "../utils/calculateFlatTax";
import { formatPLN } from "../utils/formatPLN";

const CalculateFlatTax = ({ data }) => {

    console.log(data)
    const { taxData } = data;
    const { taxParameters } = data;
    const { socialContributions } = taxParameters;
    const { healthContributions } = taxParameters;

    const [showSteps, setShowSteps] = useState(false);

    const netIncome = (taxData.income - taxData.costsOfIncome);

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

    // Składka zdrowotna
    const healthContributionsValue = calculateHealthContributionForFlatTax(netIncome,healthContributions);

    // Wyniki obliczeń podatku
    const flatTaxResult = calculateFlatTax(taxData,taxParameters,socialContributionsValue,healthContributionsValue);

    return (
        <>
            <div className="tax-result__box">
                <TaxResult tax={flatTaxResult.tax}
                    socialContributions={socialContributionsValue.yearlySocialContributions}
                    healthContribution={healthContributionsValue}
                />
                <div className="tax-steps">
                    <div className="tax-steps__head" onClick={() => setShowSteps(!showSteps)}>
                        <p className="tax-steps__header">Szczegółowe obliczenia podatku</p>
                        <button className="cta">{showSteps ? "Zamknij" : "Zobacz"}</button>
                    </div>
                    <div className={`tax-steps__body animated-box ${showSteps ? "open" : "closed"}`}>
                        <p className="tax-step__heading">1. Dane podstawowe:</p>
                        <TaxStep name="Roczny przychód:"
                            calculations={`${formatPLN(taxData.income)}`} />
                        <TaxStep name="Roczne koszty uzyskania przychodu:"
                            calculations={`${formatPLN(taxData.costsOfIncome)}`} />
                        <TaxStep name="Roczny dochód:"
                             calculations={`${formatPLN(taxData.income)} - ${formatPLN(taxData.costsOfIncome)} = ${formatPLN(flatTaxResult.netIncome)}`} />
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
                             calculations={`${formatPLN(flatTaxResult.netIncome)} × ${healthContributions.flatTax.valuePercentage}% = ${formatPLN(healthContributionsValue)}`} />
                        {
                            healthContributionsValue > healthContributions.flatTax.healthDeductionLimit && 
                            <TaxStep name="Limit odliczenia składki zdrowotnej:" 
                                 calculations={`${formatPLN(healthContributions.flatTax.healthDeductionLimit)} ponieważ ${formatPLN(healthContributionsValue)} > ${formatPLN(healthContributions.flatTax.healthDeductionLimit)}`} />
                        }
                        <p className="tax-step__heading">4. Obliczanie podstawy opodatkowania:</p>
                        <TaxStep name="Podstawa opodatkowania:" 
                             calculations={`${formatPLN(flatTaxResult.netIncome)} - ${formatPLN(socialContributionsValue.yearlySocialContributions)} - ${formatPLN(flatTaxResult.healthContriubutionWithLimit)} = ${formatPLN(flatTaxResult.taxBase)}`} />
                        <p className="tax-step__heading">5. Obliczenie podatku:</p>
                        <TaxStep name="Obliczenie podatku:" 
                             calculations={`${formatPLN(flatTaxResult.taxBase)} × ${taxParameters.flatTax} % = ${formatPLN(flatTaxResult.tax)}`} />  
                        <TaxStep name="Należny podatek:" 
                             calculations={`${formatPLN(flatTaxResult.tax)}`} />
                        {
                            flatTaxResult.daninaValue > 0 ? 
                            <>
                                <p className="tax-step__heading">7. Obliczenie daniny solidarnościowej:</p>
                                <TaxStep name="Danina solidatnościowa:" 
                                    calculations={`(${formatPLN(flatTaxResult.netIncome)} - ${formatPLN(taxParameters.danina.minIncome)}) * ${taxParameters.danina.valuePercentage}% = ${formatPLN(flatTaxResult.daninaValue)}`} />
                            </>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CalculateFlatTax;