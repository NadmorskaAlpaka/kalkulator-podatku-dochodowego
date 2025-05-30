import React, { useState } from "react";
import TaxResult from "./TaxResult";
import TaxStep from "./TaxStep";
import { calculateSocialContributions } from "../utils/calculateSocialContributions";
import { calculateHealtContributionForFlatTax } from "../utils/calculateHealtContributionForFlatTax";
import { calculateFlatTax } from "../utils/calculateFlatTax";
import { formatPLN } from "../utils/formatPLN";

const CalculateFlatTax = ({ data }) => {

    const { taxData } = data;
    const { taxParameters } = data;
    const { socialContributions } = taxParameters;
    const { healthCountributions } = taxParameters;

    const [showSteps, setShowSteps] = useState(false);

    let taxBreaksValue = 0;

    const netIncome = (taxData.income - taxData.costsOfIncome);

    // Składka społeczna
    const socialContributionsValue = calculateSocialContributions(socialContributions);

    // Składka zdrowotna
    const healthContributionsValue = calculateHealtContributionForFlatTax(netIncome,healthCountributions);

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
                             calculations={`${formatPLN(flatTaxResult.netIncome)} zł × ${healthCountributions.flatTax.valuePercentage}% = ${formatPLN(healthContributionsValue)}`} />
                        {
                            healthContributionsValue > 12900 && 
                            <TaxStep name="Limit odliczenia składki zdrowotnej:" 
                                 calculations={`12900 zł ponieważ ${formatPLN(healthContributionsValue)} > 12900 zł`} />
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
                                    calculations={`(${flatTaxResult.netIncome} zł - 1000000 zł) * 4% = ${flatTaxResult.daninaValue} zł`} />
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