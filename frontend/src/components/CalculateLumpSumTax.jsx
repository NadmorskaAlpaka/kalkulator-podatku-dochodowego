import React, { useState,useEffect } from "react";
import { calculateSocialContributions } from "../functions/calculateSocialContributions";
import { calculateHealthContributionForLumpSumTax } from "../functions/calculateHealthContributionForLumpSumTax";
import TaxStep from "./TaxStep";
import TaxResult from "./TaxResult";

const CalculateLumpSumTax = ({data}) => {

    // --- \/ - DATA PREPARATION - \/ --- //

    const income = data.taxData.income;
    const lumpSumValue = data.taxData.selectedLumpSumValue;
    const {taxParameters} = data;
    
    const {socialContributions} = taxParameters;
    const avgIncomeLastQuaterPrevYear = taxParameters.healthCountributions.avgIncomeLastQuaterPrevYear;
    const healthCountributions = taxParameters.healthCountributions.lumpSumTax;
    
    // --- /\ --------------- /\ --- //

    const [showSteps, setShowSteps] = useState(false);

    let tax = 0;

    let socialContributionsValue = calculateSocialContributions(socialContributions)

    let healthContributionsValue = calculateHealthContributionForLumpSumTax(income,healthCountributions,avgIncomeLastQuaterPrevYear);

    const taxBase = income - socialContributionsValue.yearlySocialContributions - (healthContributionsValue.yearlyHealthContributionsValue / 2);

    tax = (taxBase * lumpSumValue) / 100;

    return (
        <div className="tax-result__box">
            <TaxResult tax={tax} 
                socialContributions={socialContributionsValue.yearlySocialContributions}
                healthContribution={healthContributionsValue.yearlyHealthContributionsValue}
            />
            <div className="tax-steps">
                <div className="tax-steps__head" onClick={() => setShowSteps(!showSteps)}>
                    <p className="tax-steps__header">Szczegółowe obliczenia podatku</p>
                    <button className="cta">{showSteps ? "Zamknij" : "Zobacz"}</button>
                </div>
                <div className={`tax-steps__body animated-box ${showSteps ? "open" : "closed"}`}>
                    <TaxStep name="Roczny przychód:"
                             calculations={`${income} zł`} />
                    <TaxStep name="Stawka ryczałtu:"
                             calculations={`${lumpSumValue}%`} />
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
                             calculations={`${socialContributionsValue.monthlySocialContributions} zł × 12 = ${socialContributionsValue.yearlySocialContributions} zł`} />
                    { income < healthCountributions.small.maxIncome ? 
                        <>
                            <TaxStep name="Podstawa do obliczeni składki zdrowotnej:" 
                            calculations={`${avgIncomeLastQuaterPrevYear} zł × ${healthCountributions.small.basisPercentage}%  = ${healthContributionsValue.healthContributionBasis} zł` } />
                            <TaxStep name="Obliczenie składki zdrowotnej:" 
                            calculations={`${healthContributionsValue.healthContributionBasis} zł × ${healthCountributions.small.valuePercentage}%  = ${healthContributionsValue.monthlyHealthContributionsValue} zł` } />
                        </>
                        : null
                    }
                    { (income >= healthCountributions.small.maxIncome && income <= healthCountributions.medium.maxIncome) ?
                        <>
                            <TaxStep name="Podstawa do obliczeni składki zdrowotnej:" 
                            calculations={`${avgIncomeLastQuaterPrevYear} zł × ${healthCountributions.medium.basisPercentage}%  = ${healthContributionsValue.healthContributionBasis} zł` } />
                            <TaxStep name="Obliczenie składki zdrowotnej:" 
                            calculations={`${healthContributionsValue.healthContributionBasis} zł × ${healthCountributions.medium.valuePercentage}%  = ${healthContributionsValue.monthlyHealthContributionsValue} zł` } />
                        </>
                        : null
                    }
                    { income > healthCountributions.big.minIncome ?
                        <>
                            <TaxStep name="Podstawa do obliczeni składki zdrowotnej:" 
                            calculations={`${avgIncomeLastQuaterPrevYear} zł × ${healthCountributions.big.basisPercentage}%  = ${healthContributionsValue.healthContributionBasis} zł` } />
                            <TaxStep name="Obliczenie składki zdrowotnej:" 
                            calculations={`${healthContributionsValue.healthContributionBasis} zł × ${healthCountributions.big.valuePercentage}%  = ${healthContributionsValue.monthlyHealthContributionsValue} zł` } />
                        </>
                        : null
                    }
                    <TaxStep name="Miesięczna składka zdrowotna:" 
                             calculations={`${healthContributionsValue.monthlyHealthContributionsValue} zł`} />
                    <TaxStep name="Roczna składka zdrowotna:" 
                             calculations={`${healthContributionsValue.yearlyHealthContributionsValue} zł`} />
                    <TaxStep name="Obliczenie podstawy opodatkowania:" 
                             calculations={`${income} zł - ${socialContributionsValue.yearlySocialContributions} zł - (${healthContributionsValue.yearlyHealthContributionsValue} /2) = ${taxBase} zł`} />
                    <TaxStep name="Podstawa opodatkowania:" 
                             calculations={`${taxBase} zł`} />
                    <TaxStep name="Obliczenie podatku:" 
                             calculations={`${taxBase} zł * ${lumpSumValue}% = ${tax} zł`} />
                    <TaxStep name="Należny podatek:" 
                             calculations={`${tax} zł`} />
                </div>
            </div>
        </div>
    )
}

export default CalculateLumpSumTax;