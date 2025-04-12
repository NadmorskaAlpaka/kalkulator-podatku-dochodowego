import React, { useState,useEffect } from "react";
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
    let monthlyHealthContributionsValue = 0;

    // Składka społeczna
    const contributionBasis = socialContributions.minSocialContributionBasis;

    const uEmerytalne = (contributionBasis * socialContributions.uEmerytalnePercentage) / 100;
    const uRentowe = (contributionBasis * socialContributions.uRentowePercentage) / 100;
    const uChorobowe = (contributionBasis * socialContributions.uChorobowePercentage) / 100; 
    const uWypadkowe = (contributionBasis * socialContributions.uWypadkowePercentage) / 100;
    const funduszPracy = (contributionBasis * socialContributions.funduszPracyPercentage) / 100;
    const monthlySocialContributions = (uEmerytalne + uRentowe + uChorobowe + uWypadkowe + funduszPracy)
    const yearlySocialContributions =  monthlySocialContributions * 12;

    if(income < 60000){
        let healthContributionBasis = (avgIncomeLastQuaterPrevYear * healthCountributions.small.basisPercentage) / 100;
        monthlyHealthContributionsValue =  (healthContributionBasis * healthCountributions.small.valuePercentage) / 100;
    } else if (income >= 60000 && income <= 300000){
        let healthContributionBasis = (avgIncomeLastQuaterPrevYear * healthCountributions.medium.basisPercentage) / 100;
        monthlyHealthContributionsValue =  (healthContributionBasis * healthCountributions.medium.valuePercentage) / 100;
    } else if (income > 300000) {
        let healthContributionBasis = (avgIncomeLastQuaterPrevYear * healthCountributions.big.basisPercentage) / 100;
        monthlyHealthContributionsValue =  (healthContributionBasis * healthCountributions.big.valuePercentage) / 100;
    }

    let yearlyHealthContributionsValue = monthlyHealthContributionsValue * 12;

    const taxBase = income - yearlySocialContributions;
    tax = (taxBase * lumpSumValue) / 100;

    useEffect(() => {
        console.log(lumpSumValue)
        console.log(income)
        console.log(data);
        console.log("pierwsza zdrowotna", monthlyHealthContributionsValue)
    },[])

    return (
        <div className="tax-result__box">
            <TaxResult tax={tax} 
                socialContributions={yearlySocialContributions}
                healthContribution={yearlyHealthContributionsValue}
            />
            <div className="tax-steps">
                <div className="tax-steps__head" onClick={() => setShowSteps(!showSteps)}>
                    <p className="tax-steps__header">Szczegółowe obliczenia podatku</p>
                    <button className="cta">{showSteps ? "Zamknij" : "Zobacz"}</button>
                </div>
                <div className={`tax-steps__body animated-box ${showSteps ? "open" : "closed"}`}>

                </div>
            </div>
        </div>
    )
}

export default CalculateLumpSumTax;