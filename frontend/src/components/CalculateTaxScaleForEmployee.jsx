import React, { useState } from "react";
import { employeeTaxScale } from "../utils/employeeTaxScale";
import { calculateEmployeeHealthContributionsForTaxScale } from "../utils/calculateEmployeeHealthContributionsForTaxScale"
import { calculateEmployeeSocialContributionsForTaxScale } from "../utils/calculateEmployeeSocialContributionsForTaxScale"
import { employeeTaxBreaks } from "../utils/employeeTaxBreaks";
import { formatPLN } from "../utils/formatPLN";
import "../styles/calculateTaxScale.css";
import TaxResult from "./TaxResult";
import TaxStep from "./TaxStep";
import ToggleInput from "./ToggleInput";

const CalculateTaxScaleForEmployee = ({data}) => {

    const {taxData} = data;
    const {taxParameters} = data;
    const {employeeSocialContributions} = taxParameters;
    const {healthCountributions} = taxParameters;
    const {taxBreaks} = taxParameters;
    const {taxFreeAmout} = taxParameters;

    const [showSteps, setShowSteps] = useState(false);
    const [monthly,setMonthly] = useState(false);
    
    // Składka społeczna
    let socialContributionsValue = calculateEmployeeSocialContributionsForTaxScale(employeeSocialContributions,taxData.income);

    // Ulgi podatkowe
    const taxBreaksValue = employeeTaxBreaks(taxData, taxBreaks);

    // Wyniki obliczeń podatku
    const taxScaleResult = employeeTaxScale(taxData,taxParameters,socialContributionsValue,taxBreaksValue.totalValue);

    // Składka zdrowotna
    const healthContributionsValue = calculateEmployeeHealthContributionsForTaxScale(taxData.income,healthCountributions,socialContributionsValue);


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
                <TaxResult tax={taxData.availableTaxBreaks ? taxScaleResult.taxAfterTaxReductions / 12 : taxScaleResult.tax / 12} 
                socialContributions={socialContributionsValue.monthlySocialContributions}
                healthContribution={healthContributionsValue.monthlyHealthContribution}
                />
                :
                <TaxResult tax={taxData.availableTaxBreaks ? taxScaleResult.taxAfterTaxReductions : taxScaleResult.tax} 
                socialContributions={socialContributionsValue.yearlySocialContributions}
                healthContribution={healthContributionsValue.yearlyHealthContribution}
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
                    <p className="tax-step__heading">3. Obliczanie ubezpieczenia zdrowotnego:</p>  
                    <TaxStep name="Miesięczne ubezpieczenie zdrowotne:" 
                             calculations={`(${socialContributionsValue.monthlyIncome} zł - ${formatPLN(socialContributionsValue.monthlySocialContributions)}) × ${healthCountributions.taxScale.valuePercentage}% = ${formatPLN(healthContributionsValue.monthlyHealthContribution)}`} />
                     <TaxStep name="Roczne ubezpieczenie zdrowotne:" 
                             calculations={`(${taxScaleResult.netIncome} zł - ${formatPLN(socialContributionsValue.yearlySocialContributions)}) × ${healthCountributions.taxScale.valuePercentage}% = ${formatPLN(healthContributionsValue.yearlyHealthContribution)}`} />
                    <p className="tax-step__heading">4. Obliczanie podstawy opodatkowania:</p>
                    <TaxStep name="Obliczenia podstawy opodatkowania:" 
                             calculations={`${formatPLN(taxData.income)} - ${formatPLN(socialContributionsValue.yearlySocialContributions)} = ${formatPLN(taxScaleResult.taxBase)}`} />
                    <TaxStep name="Podstawa opodatkowania:" 
                             calculations={`${formatPLN(taxScaleResult.taxBase)}`} />
                    <p className="tax-step__heading">5. Zastosowanie kwoty wolnej od podatku:</p>     
                    <TaxStep name="Wolny od podatku:" 
                             calculations={`${!taxScaleResult.isTaxFree ? "Nie" : "Tak"} ponieważ ${taxFreeAmout} zł ${!taxScaleResult.isTaxFree ? "<" : ">"} ${formatPLN(taxScaleResult.taxBase)}`} />
                    { 
                        taxScaleResult.taxBase < taxParameters.taxScale.incomeThreshold ? 
                        <>
                            <p className="tax-step__heading">6. Obliczenie podatku - pierwszy prog podatkowy:</p>  
                            <TaxStep name="Obliczenie podatku:" 
                                    calculations={`(${formatPLN(taxScaleResult.taxBase)} × ${taxParameters.taxScale.firstPercentage}%) - ${formatPLN(taxScaleResult.yearlyTaxReduction)} = ${formatPLN(taxScaleResult.tax)}`} />
                        </>
                        :
                        <>
                            <p className="tax-step__heading">6. Obliczenie podatku - drugi próg podatkowy:</p>  
                            <TaxStep name="Obliczenie podatku:" 
                                    calculations={`(${formatPLN(taxScaleResult.taxBase)} × ${taxParameters.taxScale.firstPercentage}% - ${formatPLN(taxScaleResult.yearlyTaxReduction)}) + (${formatPLN(taxScaleResult.taxBase)} - ${formatPLN(taxParameters.taxScale.incomeThreshold)}) × ${taxParameters.taxScale.secondPercentage} % = ${formatPLN(taxScaleResult.tax)}`} />
                        </>
                    }
                    <TaxStep name="Miesięczna zaliczka na podatek" 
                             calculations={`${formatPLN(taxScaleResult.tax / 12)}`} />
                    <TaxStep name="Należny podatek w skali roku:" 
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
                        taxScaleResult.daninaValue > 0 &&
                        <>
                            <p className="tax-step__heading">* Obliczenie daniny solidarnościowej:</p>
                            <TaxStep name="Danina solidatnościowa:" 
                            calculations={`(${formatPLN(taxScaleResult.netIncome)} - ${formatPLN(taxParameters.danina.minIncome)}) * ${taxParameters.danina.valuePercentage}% = ${formatPLN(taxScaleResult.daninaValue)}`} />  
                        </>
                    }      
                </div>
            </div>
        </div>
    )
}

export default CalculateTaxScaleForEmployee;