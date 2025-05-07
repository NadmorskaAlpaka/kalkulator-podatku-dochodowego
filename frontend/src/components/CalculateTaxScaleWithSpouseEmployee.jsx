import React, { useState } from "react";
import { calculateTaxScaleWithSpouseEmployee } from "../utils/calculateTaxScaleWithSpouseEmployee";
import { calculateSocialContributions } from "../utils/calculateSocialContributions";
import { calculateHealthContributionsForTaxScale } from "../utils/calculateHealthContributionsForTaxScale";
import { calculateEmployeeHealthContributionsForTaxScale } from "../utils/calculateEmployeeHealthContributionsForTaxScale";
import { calculateEmployeeSocialContributionsForTaxScale } from "../utils/calculateEmployeeSocialContributionsForTaxScale";
import { companyTaxBreaks } from "../utils/companyTaxBreaks";
import { formatPLN } from "../utils/formatPLN";
import "../styles/calculateTaxScale.css";
import TaxResultSpouseEmployee from "./TaxResultSpouseEmployee";
import TaxStep from "./TaxStep";

const CalculateTaxScaleWithSpouseEmployee = ({data}) => {

    const {taxData} = data;
    const {taxParameters} = data;
    const {socialContributions} = taxParameters;
    const {employeeSocialContributions} = taxParameters;
    const {healthCountributions} = taxParameters;
    const {taxBreaks} = taxParameters;
    const {taxFreeAmout} = taxParameters;

    const [showSteps, setShowSteps] = useState(false);
    
    // Składka społeczna
    let socialContributionsValue = calculateSocialContributions(socialContributions);
    let spousSocialContributionsValue = calculateEmployeeSocialContributionsForTaxScale(employeeSocialContributions,taxData.spouseIncome);

    // ulgi podatkowe
    const taxBreaksValue = companyTaxBreaks(taxData, taxBreaks);

    // Wyniki obliczeń podatku
    const taxScaleResult = calculateTaxScaleWithSpouseEmployee(taxData,taxParameters,socialContributionsValue,spousSocialContributionsValue,taxBreaksValue.totalValue);

    // Składka zdrowotna
    const healthContributionsValue = calculateHealthContributionsForTaxScale(taxScaleResult.netIncome, healthCountributions.taxScale.valuePercentage);
    const spouseHealthContributionValue = calculateEmployeeHealthContributionsForTaxScale(taxData.spouseIncome,healthCountributions,spousSocialContributionsValue);


    return (
        <div className="tax-result__box">
            <TaxResultSpouseEmployee tax={taxData.availableTaxBreaks ? taxScaleResult.taxAfterTaxReductions : taxScaleResult.tax} 
                       socialContributions={socialContributionsValue.yearlySocialContributions}
                       spouseSocialContributions={spousSocialContributionsValue.yearlySocialContributions}
                       healthContribution={healthContributionsValue}
                       spouseHealthContribution={spouseHealthContributionValue.yearlyHealthContribution}
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
                    <TaxStep name="Roczne wynagrodzenie małżonka:"
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
                    <hr />
                    <TaxStep name="Ubezpieczenie emerytalne małżonka:" 
                             calculations={`${formatPLN(spousSocialContributionsValue.monthlyIncome)} × ${employeeSocialContributions.uEmerytalnePercentage} % = ${formatPLN(spousSocialContributionsValue.uEmerytalne)}`} />
                    <TaxStep name="Ubezpieczenie rentowe małżonka:" 
                             calculations={`${formatPLN(spousSocialContributionsValue.monthlyIncome)} × ${employeeSocialContributions.uRentowePercentage} % = ${formatPLN(spousSocialContributionsValue.uRentowe)}`} />
                    <TaxStep name="Ubezpieczenie chorobowe małżonka:" 
                             calculations={`${formatPLN(spousSocialContributionsValue.monthlyIncome)} × ${employeeSocialContributions.uChorobowePercentage} % = ${formatPLN(spousSocialContributionsValue.uChorobowe)}`} />
                    <TaxStep name="Miesięczna suma składek społecznych małżonka:" 
                             calculations={`${formatPLN(spousSocialContributionsValue.monthlySocialContributions)}`} />
                    <TaxStep name="Roczna suma składek społecznych małżonka:" 
                             calculations={`${formatPLN(spousSocialContributionsValue.monthlySocialContributions)} × 12 = ${formatPLN(spousSocialContributionsValue.yearlySocialContributions)}`} />
                    <p className="tax-step__heading">3. Obliczanie składki zdrowotnej:</p>  
                    <TaxStep name="Składka zdrowotna:" 
                             calculations={`${taxScaleResult.netIncome} zł × ${healthCountributions.taxScale.valuePercentage}% = ${formatPLN(healthContributionsValue)}`} />
                    <hr />
                    <TaxStep name="Miesięczne ubezpieczenie zdrowotne małżonka:" 
                             calculations={`(${spousSocialContributionsValue.monthlyIncome} zł - ${formatPLN(spousSocialContributionsValue.monthlySocialContributions)}) × ${healthCountributions.taxScale.employeeValuePercentage}% = ${formatPLN(spouseHealthContributionValue.monthlyHealthContribution)}`} />
                    <TaxStep name="Roczne ubezpieczenie zdrowotne małżonka:" 
                             calculations={`(${taxScaleResult.spouseIncome} zł - ${formatPLN(spousSocialContributionsValue.yearlySocialContributions)}) × ${healthCountributions.taxScale.employeeValuePercentage}% = ${formatPLN(spouseHealthContributionValue.yearlyHealthContribution)}`} />
                    <p className="tax-step__heading">4. Obliczanie podstawy opodatkowania:</p>
                    <TaxStep name="Podstawa opodatkowania:" 
                             calculations={`${formatPLN(taxScaleResult.netIncome)} - ${formatPLN(socialContributionsValue.yearlySocialContributions)} = ${formatPLN(taxScaleResult.taxBase)}`} />
                    <TaxStep name="Podstawa opodatkowania:" 
                             calculations={`${formatPLN(taxScaleResult.taxBase)}`} />
                    <TaxStep name="Podstawa opodatkowania małżonka:" 
                             calculations={`${formatPLN(taxScaleResult.spouseIncome)} - ${formatPLN(spousSocialContributionsValue.yearlySocialContributions)} = ${formatPLN(taxScaleResult.spouseTaxBase)}`} />
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
                                    calculations={`${formatPLN(taxScaleResult.taxBasePerSpouse)} × ${taxParameters.taxScale.firstPercentage}% - ${formatPLN(taxScaleResult.yearlyTaxReduction)} = ${formatPLN(taxScaleResult.taxPerSpouse)}`} />
                        </>
                        :
                        <>
                            <p className="tax-step__heading">6. Obliczenie podatku - drugi próg podatkowy:</p>  
                            <TaxStep name="Obliczenie podatku:" 
                                    calculations={`(${formatPLN(taxScaleResult.taxBasePerSpouse)} × ${taxParameters.taxScale.firstPercentage}% - ${formatPLN(taxScaleResult.yearlyTaxReduction)}) + (${formatPLN(taxScaleResult.taxBasePerSpouse)} - ${formatPLN(taxParameters.taxScale.incomeThreshold)}) × ${taxParameters.taxScale.secondPercentage} % = ${formatPLN(taxScaleResult.taxPerSpouse)}`} />
                        </>
                    }
                    <TaxStep name="Należny podatek na małżonka:" 
                             calculations={`${formatPLN(taxScaleResult.taxPerSpouse)}`} />
                    <TaxStep name="Obliczanie łącznego podatku:" 
                             calculations={`${formatPLN(taxScaleResult.taxPerSpouse)} × 2 = ${formatPLN(taxScaleResult.tax)}`} />
                    <TaxStep name="Łączny podatek:" 
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
                        (taxScaleResult.daninaValue > 0 || taxScaleResult.spouseDaninaValue > 0) &&
                        <p className="tax-step__heading">* Obliczenie daniny solidarnościowej:</p> 
                    }      
                    {
                        taxScaleResult.daninaValue > 0 &&
                        <TaxStep name="Danina solidatnościowa:" 
                                  calculations={`(${formatPLN(taxScaleResult.netIncome)} - ${formatPLN(taxParameters.danina.minIncome)}) * ${taxParameters.danina.valuePercentage}% = ${formatPLN(taxScaleResult.daninaValue)}`} /> 
                    }
                    {
                        taxScaleResult.spouseDaninaValue > 0 &&
                        <TaxStep name="Danina solidatnościowa małżonka:" 
                                  calculations={`(${formatPLN(taxScaleResult.spouseIncome)} - ${formatPLN(taxParameters.danina.minIncome)}) * ${taxParameters.danina.valuePercentage}% = ${formatPLN(taxScaleResult.spouseDaninaValue)}`} /> 
                    }
                </div>
            </div>
        </div>
    )
}

export default CalculateTaxScaleWithSpouseEmployee;