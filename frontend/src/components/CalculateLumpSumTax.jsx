import React, { useState } from "react";
import { calculateSocialContributions } from "../utils/calculateSocialContributions";
import { calculateSmallSocialContributions } from "../utils/calculateSmallSocialContributions";
import { calculateStartSocialContributions } from "../utils/calculateStartSocialContributions";
import { calculateStartAndSmallSocialContributions } from "../utils/calculateStartAndSmallSocialContributions";
import { calculateHealthContributionForLumpSumTax } from "../utils/calculateHealthContributionForLumpSumTax";
import { calculateLumpSumTax } from "../utils/calculateLumpSumTax";
import { formatPLN } from "../utils/formatPLN";
import TaxStep from "./TaxStep";
import TaxResult from "./TaxResult";

const CalculateLumpSumTax = ({data}) => {

    const { taxData } = data;
    const income = data.taxData.income;
    const socialContributions = data.taxParameters.socialContributions;
    const avgIncomeLastQuaterPrevYear = data.taxParameters.healthContributions.avgIncomeLastQuaterPrevYear;
    const healthContributions = data.taxParameters.healthContributions.lumpSumTax;

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
    
    const healthContributionsValue = calculateHealthContributionForLumpSumTax(income,healthContributions,avgIncomeLastQuaterPrevYear);
    
    const lumpSumTaxResult = calculateLumpSumTax(data,socialContributionsValue,healthContributionsValue)

    return (
        <div className="tax-result__box">
            <TaxResult tax={lumpSumTaxResult.tax} 
                socialContributions={socialContributionsValue.yearlySocialContributions}
                healthContribution={healthContributionsValue.yearlyHealthContributionsValue}
            />
            <div className="tax-steps">
                <div className="tax-steps__head" onClick={() => setShowSteps(!showSteps)}>
                    <p className="tax-steps__header">Szczegółowe obliczenia podatku</p>
                    <button className="cta">{showSteps ? "Zamknij" : "Zobacz"}</button>
                </div>
                <div className={`tax-steps__body animated-box ${showSteps ? "open" : "closed"}`}>
                    <p className="tax-step__heading">1. Dane podstawowe:</p>
                    <TaxStep name="Roczny przychód:"
                             calculations={`${income} zł`} />
                    <TaxStep name="Stawka ryczałtu:"
                             calculations={`${lumpSumTaxResult.lumpSumValue}%`} />
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
                    { income < healthContributions.small.maxIncome ? 
                        <>
                            <TaxStep name="Podstawa do obliczeni składki zdrowotnej:" 
                            calculations={`${formatPLN(avgIncomeLastQuaterPrevYear)} × ${healthContributions.small.basisPercentage}% = ${formatPLN(healthContributionsValue.healthContributionBasis)}` } />
                            <TaxStep name="Obliczenie składki zdrowotnej:" 
                            calculations={`${formatPLN(healthContributionsValue.healthContributionBasis)} × ${healthContributions.small.valuePercentage}% = ${formatPLN(healthContributionsValue.monthlyHealthContributionsValue)}` } />
                        </>
                        : null
                    }
                    { (income >= healthContributions.small.maxIncome && income <= healthContributions.medium.maxIncome) ?
                        <>
                            <TaxStep name="Podstawa do obliczeni składki zdrowotnej:" 
                            calculations={`${formatPLN(avgIncomeLastQuaterPrevYear)} × ${healthContributions.medium.basisPercentage}%  = ${formatPLN(healthContributionsValue.healthContributionBasis)}` } />
                            <TaxStep name="Obliczenie składki zdrowotnej:" 
                            calculations={`${formatPLN(healthContributionsValue.healthContributionBasis)} × ${healthContributions.medium.valuePercentage}%  = ${formatPLN(healthContributionsValue.monthlyHealthContributionsValue)}` } />
                        </>
                        : null
                    }
                    { income > healthContributions.medium.maxIncome ?
                        <>
                            <TaxStep name="Podstawa do obliczeni składki zdrowotnej:" 
                            calculations={`${formatPLN(avgIncomeLastQuaterPrevYear)} × ${healthContributions.big.basisPercentage}%  = ${formatPLN(healthContributionsValue.healthContributionBasis)}` } />
                            <TaxStep name="Obliczenie składki zdrowotnej:" 
                            calculations={`${formatPLN(healthContributionsValue.healthContributionBasis)} × ${healthContributions.big.valuePercentage}%  = ${formatPLN(healthContributionsValue.monthlyHealthContributionsValue)}` } />
                        </>
                        : null
                    }
                    <TaxStep name="Miesięczna składka zdrowotna:" 
                             calculations={`${formatPLN(healthContributionsValue.monthlyHealthContributionsValue)}`} />
                    <TaxStep name="Roczna składka zdrowotna:" 
                             calculations={`${formatPLN(healthContributionsValue.yearlyHealthContributionsValue)}`} />
                    <TaxStep name="Limit odliczenia składki zdrowotnej" 
                             calculations={`${formatPLN(healthContributionsValue.yearlyHealthContributionsValue)} * ${healthContributions.healthDeductionLimitPercentage}% = ${formatPLN(lumpSumTaxResult.limitHealtContribution)}`} />
                    <p className="tax-step__heading">4. Obliczanie podstawy opodatkowania:</p>
                    <TaxStep name="Obliczenie podstawy opodatkowania:" 
                             calculations={`${formatPLN(income)} - ${formatPLN(socialContributionsValue.yearlySocialContributions)} - ${formatPLN(lumpSumTaxResult.limitHealtContribution)} = ${formatPLN(lumpSumTaxResult.taxBase)}`} />
                    <TaxStep name="Podstawa opodatkowania:" 
                             calculations={`${formatPLN(lumpSumTaxResult.taxBase)}`} />
                    <p className="tax-step__heading">5. Obliczenie podatku:</p>
                    <TaxStep name="Obliczenie podatku:" 
                             calculations={`${formatPLN(lumpSumTaxResult.taxBase)} * ${lumpSumTaxResult.lumpSumValue}% = ${formatPLN(lumpSumTaxResult.tax)}`} />
                    <TaxStep name="Należny podatek:" 
                             calculations={`${formatPLN(lumpSumTaxResult.tax)}`} />
                </div>
            </div>
        </div>
    )
}

export default CalculateLumpSumTax;