import React, { useState } from "react";
import { employeeTaxScaleWithSpouse } from "../utils/employeeTaxScaleWithSpouse";
import { employeeTaxBreaks } from "../utils/employeeTaxBreaks";
import { calculateEmployeeHealthContributionsForTaxScale } from "../utils/calculateEmployeeHealthContributionsForTaxScale"
import { calculateEmployeeSocialContributionsForTaxScale } from "../utils/calculateEmployeeSocialContributionsForTaxScale"
import { formatPLN } from "../utils/formatPLN";
import "../styles/calculateTaxScale.css";
import SpouseTaxResult from "./SpouseTaxResult";
import TaxStep from "./TaxStep";
import ToggleInput from "./ToggleInput";

const CalculateTaxScaleForEmployeeWithSpouse = ({data}) => {

    const {taxData} = data;
    const {taxParameters} = data;
    const {employeeSocialContributions} = taxParameters;
    const {healthCountributions} = taxParameters;
    const {taxBreaks} = taxParameters;
    const {taxFreeAmout} = taxParameters;

    const [showSteps, setShowSteps] = useState(false);
    const [monthly,setMonthly] = useState(false);
    
    // pracownik
    let socialContributionsValue = calculateEmployeeSocialContributionsForTaxScale(employeeSocialContributions,taxData.income);
    let spousSocialContributionsValue = calculateEmployeeSocialContributionsForTaxScale(employeeSocialContributions,taxData.spouseIncome);

    // Ulgi podatkowe
    const taxBreaksValue = employeeTaxBreaks(taxData, taxBreaks);

    // Wyniki obliczeń podatku
    const taxScaleResult = employeeTaxScaleWithSpouse(taxData,taxParameters,socialContributionsValue,spousSocialContributionsValue,taxBreaksValue.totalValue);

    // Składka zdrowotna
    const healthContributionsValue = calculateEmployeeHealthContributionsForTaxScale(taxData.income,healthCountributions,socialContributionsValue);
    const spouseHealthContributionValue = calculateEmployeeHealthContributionsForTaxScale(taxData.spouseIncome,healthCountributions,spousSocialContributionsValue);

    const handleCheckbox = (e,setter) => {
        setter(e.target.checked);
    }

    return (
        <div className="tax-result__box employee">
            <p className="tax__header">Zatrudnienie na podstawie { taxData.contract === "praca" ? "umowy o pracę" : "umowy zlecenie"}</p>
            <ToggleInput label="Rozliczenie w skali miesiąca" 
                         handleChange={(e) => handleCheckbox(e,setMonthly)}
            />
            {
                monthly ?
                <SpouseTaxResult 
                    tax={taxData.availableTaxBreaks ? taxScaleResult.taxAfterTaxReductions / 12 : taxScaleResult.tax / 12}
                    socialContributions={socialContributionsValue.monthlySocialContributions}
                    healthContribution={healthContributionsValue.monthlyHealthContribution} 
                    spouseSocialContributions={spousSocialContributionsValue.monthlySocialContributions} 
                    spouseHealthContribution={spouseHealthContributionValue.monthlyHealthContribution}
                />
                :
                <SpouseTaxResult 
                    tax={taxData.availableTaxBreaks ? taxScaleResult.taxAfterTaxReductions : taxScaleResult.tax}
                    socialContributions={socialContributionsValue.yearlySocialContributions}
                    healthContribution={healthContributionsValue.yearlyHealthContribution} 
                    spouseSocialContributions={spousSocialContributionsValue.yearlySocialContributions} 
                    spouseHealthContribution={spouseHealthContributionValue.yearlyHealthContribution}
                />
            }
            <div className="tax-steps">
                <div className="tax-steps__head" onClick={() => setShowSteps(!showSteps)}>
                    <p className="tax-steps__header">Szczegółowe obliczenia podatku</p>
                    <button className="cta">{showSteps ? "Zamknij" : "Zobacz"}</button>
                </div>
                <div className={`tax-steps__body animated-box ${showSteps ? "open" : "closed"}`}>
                    <p className="tax-step__heading">1. Dane podstawowe:</p>  
                    <TaxStep name="Roczne wynagordzenie brutto:"
                             calculations={`${taxData.income} zł`} />
                    <TaxStep name="Miesięczne wynagordzenie brutto:"
                             calculations={`${socialContributionsValue.monthlyIncome} zł`} />
                    <hr />
                    <TaxStep name="Roczne wynagordzenie brutto małżonka:"
                             calculations={`${taxData.spouseIncome} zł`} />
                    <TaxStep name="Miesięczne wynagordzenie brutto małżonka:"
                             calculations={`${spousSocialContributionsValue.monthlyIncome} zł`} />
                    <p className="tax-step__heading">2. Obliczanie składek społecznych:</p>   
                    <TaxStep name="Ubezpieczenie emerytalne:" 
                             calculations={`${formatPLN(socialContributionsValue.monthlyIncome)} × ${employeeSocialContributions.uEmerytalnePercentage} % = ${formatPLN(socialContributionsValue.uEmerytalne)}`} />
                    <TaxStep name="Ubezpieczenie rentowe:" 
                             calculations={`${formatPLN(socialContributionsValue.monthlyIncome)} × ${employeeSocialContributions.uRentowePercentage} % = ${formatPLN(socialContributionsValue.uRentowe)}`} />
                    <TaxStep name="Ubezpieczenie chorobowe:" 
                             calculations={`${formatPLN(socialContributionsValue.monthlyIncome)} × ${employeeSocialContributions.uChorobowePercentage} % = ${formatPLN(socialContributionsValue.uChorobowe)}`} />
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
                    <p className="tax-step__heading">3. Obliczanie ubezpieczenia zdrowotnego:</p>  
                    <TaxStep name="Miesięczne ubezpieczenie zdrowotne:" 
                             calculations={`(${socialContributionsValue.monthlyIncome} zł - ${formatPLN(socialContributionsValue.monthlySocialContributions)}) × ${healthCountributions.taxScale.employeeValuePercentage}% = ${formatPLN(healthContributionsValue.monthlyHealthContribution)}`} />
                    <TaxStep name="Roczne ubezpieczenie zdrowotne:" 
                             calculations={`(${formatPLN(taxScaleResult.netIncome)} - ${formatPLN(socialContributionsValue.yearlySocialContributions)}) × ${healthCountributions.taxScale.employeeValuePercentage}% = ${formatPLN(healthContributionsValue.yearlyHealthContribution)}`} />
                    <hr />
                    <TaxStep name="Miesięczne ubezpieczenie zdrowotne:" 
                             calculations={`(${spousSocialContributionsValue.monthlyIncome} zł - ${formatPLN(spousSocialContributionsValue.monthlySocialContributions)}) × ${healthCountributions.taxScale.employeeValuePercentage}% = ${formatPLN(spouseHealthContributionValue.monthlyHealthContribution)}`} />
                    <TaxStep name="Roczne ubezpieczenie zdrowotne:" 
                             calculations={`(${taxScaleResult.spouseNetIncome} zł - ${formatPLN(spousSocialContributionsValue.yearlySocialContributions)}) × ${healthCountributions.taxScale.employeeValuePercentage}% = ${formatPLN(spouseHealthContributionValue.yearlyHealthContribution)}`} />
                    <p className="tax-step__heading">4. Obliczanie podstawy opodatkowania:</p>
                    <TaxStep name="Podstawa opodatkowania:" 
                             calculations={`${formatPLN(taxScaleResult.netIncome)} - ${formatPLN(socialContributionsValue.yearlySocialContributions)} = ${formatPLN(taxScaleResult.taxBase)}`} />
                    <TaxStep name="Podstawa opodatkowania małżonka:" 
                             calculations={`${formatPLN(taxScaleResult.spouseNetIncome)} - ${formatPLN(spousSocialContributionsValue.yearlySocialContributions)} = ${formatPLN(taxScaleResult.spouseTaxBase)}`} />
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
                            <TaxStep name="Ulga dla krwiodawców:" 
                                    calculations={`${formatPLN(taxBreaksValue.bloodDonation)}`} />
                            <TaxStep name="Ulga na nowe technologie:" 
                                    calculations={`${formatPLN(taxBreaksValue.newTechnology)}`} />
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
                        <TaxStep name="Danina solidatnościowa:" 
                                  calculations={`(${formatPLN(taxScaleResult.spouseNetIncome)} - ${formatPLN(taxParameters.danina.minIncome)}) * ${taxParameters.danina.valuePercentage}% = ${formatPLN(taxScaleResult.spouseDaninaValue)}`} /> 
                    }
                </div>
            </div>
        </div>
    )
}

export default CalculateTaxScaleForEmployeeWithSpouse;