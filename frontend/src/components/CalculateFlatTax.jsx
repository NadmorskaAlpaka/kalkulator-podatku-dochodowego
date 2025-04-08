import React, { useState } from "react";
import TaxResult from "./TaxResult";
import TaxStep from "./TaxStep";

const CalculateFlatTax = ({ data }) => {

    // --- \/ - DATA PREPARATION - \/ --- //

    const { taxData } = data;
    const { taxParameters } = data;

    const { socialContributions } = taxParameters;
    const { flatTax } = taxParameters;
    const { healthCountributions } = taxParameters;
    const { danina } = taxParameters;

    // --- /\ --------------- /\ --- //

    const [showSteps, setShowSteps] = useState(false);

    let tax = 0;
    let taxBreaksValue = 0;
    let daninaValue = 0

    const netIncome = (taxData.income - taxData.costsOfIncome);

    // Składka społeczna
    const contributionBasis = socialContributions.minSocialContributionBasis;

    const uEmerytalne = (contributionBasis * socialContributions.uEmerytalnePercentage) / 100;
    const uRentowe = (contributionBasis * socialContributions.uRentowePercentage) / 100;
    const uChorobowe = (contributionBasis * socialContributions.uChorobowePercentage) / 100;
    const uWypadkowe = (contributionBasis * socialContributions.uWypadkowePercentage) / 100;
    const funduszPracy = (contributionBasis * socialContributions.funduszPracyPercentage) / 100;
    const monthlySocialContributions = (uEmerytalne + uRentowe + uChorobowe + uWypadkowe + funduszPracy)
    const yearlySocialContributions = monthlySocialContributions * 12;

    // Składka zdrowotna
    const healthContributionsValue = (netIncome * healthCountributions.flatTax.valuePercentage) / 100;

    const taxBase = (netIncome - yearlySocialContributions - healthContributionsValue);

    if (taxBase > 0) {
        tax = taxBase * flatTax;
    } else {
        tax = 0;
    }

    if (netIncome > danina.minIncome) {
        daninaValue = ((netIncome - danina.minIncome) * danina.valuePercentage) / 100;
    }

    return (
        <>
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
                        <TaxStep name="Należny podatek:" 
                             calculations={`${tax} zł`} />
                        {
                            daninaValue > 0 ? <TaxStep name="Danina solidatnościowa:" 
                                calculations={`(${netIncome} zł - 1000000 zł) * 4% = ${daninaValue} zł`} /> : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CalculateFlatTax;