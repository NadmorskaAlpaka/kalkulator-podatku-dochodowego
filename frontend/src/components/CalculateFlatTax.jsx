import React, { useState } from "react";
import TaxResult from "./TaxResult";
import TaxStep from "./TaxStep";
import { calculateSocialContributions } from "../utils/calculateSocialContributions";

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
    let socialContributionsValue = calculateSocialContributions(socialContributions)

    // Składka zdrowotna
    const healthContributionsValue = (netIncome * healthCountributions.flatTax.valuePercentage) / 100;

    const taxBase = (netIncome - socialContributionsValue.yearlySocialContributions - healthContributionsValue);

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
                             calculations={`${taxData.income} zł - ${taxData.costsOfIncome} zł = ${netIncome} zł`} />
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