import React, { useState } from "react";
import { calculateTaxScale } from "../utils/calculateTaxScale";
import { employeeTaxScale } from "../utils/employeeTaxScale";
import { calculateEmployeeHealthContributionsForTaxScale } from "../utils/calculateEmployeeHealthContributionsForTaxScale"
import { calculateEmployeeSocialContributionsForTaxScale } from "../utils/calculateEmployeeSocialContributionsForTaxScale"
import { youthEmployeSocialContributionsOverLimit } from "../utils/youthEmployeSocialContributionsOverLimit"
import { formatPLN } from "../utils/formatPLN";
import "../styles/calculateTaxScale.css";
import TaxResult from "./TaxResult";
import TaxStep from "./TaxStep";
import ToggleInput from "./ToggleInput";

const CalculateTaxScaleForYouth = ({data}) => {

    const {taxData} = data;
    const {taxParameters} = data;
    const {employeeSocialContributions} = taxParameters;
    const {healthCountributions} = taxParameters;
    const {taxBreaks} = taxParameters;
    const {taxFreeAmout} = taxParameters;

    const incomeLimit = taxParameters.taxBreaks.youth;

    const [showSteps, setShowSteps] = useState(false);
    const [monthly,setMonthly] = useState(false);
    
    let socialContributionsValue;
    let taxScaleResult;
    let healthContributionsValue;

    if(taxData.contract === "zlecenie" && taxData.income <= incomeLimit) {
            // Składka społeczna
        socialContributionsValue = {
            monthlyIncome: 0,
            uEmerytalne: 0,
            uRentowe: 0,
            uChorobowe: 0,
            monthlySocialContributions: 0,
            yearlySocialContributions: 0
        }

            // Wyniki obliczeń podatku
        taxScaleResult = {
            netIncome: taxData.income,
            taxBase: 0,
            isTaxFree: true,
            tax: 0,
            daninaValue: 0,
        }
        
            // Składka zdrowotna
        healthContributionsValue = {
            monthlyHealthContribution: 0,
            yearlyHealthContribution: 0
        }

    } else if (taxData.contract === "praca" && taxData.income <= incomeLimit) {
        // Składka społeczna
        socialContributionsValue = calculateEmployeeSocialContributionsForTaxScale(employeeSocialContributions,taxData);

        // Wyniki obliczeń podatku
        taxScaleResult = {
            netIncome: taxData.income,
            tax: 0
        };
                
        // Składka zdrowotna
        healthContributionsValue = calculateEmployeeHealthContributionsForTaxScale(taxData,healthCountributions,socialContributionsValue);

    } else if (taxData.contract === "zlecenie" && taxData.income > incomeLimit){
        let incomeOverLimit = taxData.income - incomeLimit;
        console.log(incomeOverLimit);
        let updatedTaxData = {
            ...taxData,
            income: parseFloat(incomeOverLimit)
        }
        console.log(updatedTaxData)

        // Składka społeczna
        socialContributionsValue = youthEmployeSocialContributionsOverLimit(employeeSocialContributions,updatedTaxData);

        // Wyniki obliczeń podatku
        taxScaleResult = employeeTaxScale(updatedTaxData,taxParameters,socialContributionsValue);

        console.log(taxScaleResult)

        // Składka zdrowotna
        healthContributionsValue = calculateEmployeeHealthContributionsForTaxScale(updatedTaxData,healthCountributions,socialContributionsValue);

    } else if (taxData.contract === "praca" && taxData.income > incomeLimit){
        let incomeOverLimit = taxData.income - incomeLimit;
        console.log(incomeOverLimit);
        let updatedTaxData = {
            ...taxData,
            income: parseFloat(incomeOverLimit)
        }
        console.log(updatedTaxData)
                // Składka społeczna
        socialContributionsValue = youthEmployeSocialContributionsOverLimit(employeeSocialContributions,updatedTaxData);

                // Wyniki obliczeń podatku
        taxScaleResult = employeeTaxScale(updatedTaxData,taxParameters,socialContributionsValue);
        
                // Składka zdrowotna
        healthContributionsValue = calculateEmployeeHealthContributionsForTaxScale(updatedTaxData,healthCountributions,socialContributionsValue);
    }

    // ulgi podatkowe
    const taxBreaksValue = 0;

    const handleCheckbox = (e,setter) => {
        setter(e.target.checked);
    }

    return (
        <div className="tax-result__box employee">
            <p className="tax__header">Zatrudnienie na podstawie {taxData.contract === "praca" ? "umowy o pracę" : "umowy zlecenie"}</p>
            <ToggleInput label="Podatek w skali miesiąca" 
                         handleChange={(e) => handleCheckbox(e,setMonthly)}
            />
            {
                monthly ?
                <TaxResult tax={taxScaleResult.tax / 12} 
                socialContributions={socialContributionsValue.monthlySocialContributions}
                healthContribution={healthContributionsValue.monthlyHealthContribution}
                />
                :
                <TaxResult tax={taxScaleResult.tax} 
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
                    {
                        taxData.contract === "zlecenie" && taxData.income <= incomeLimit &&
                        <>
                            <p className="tax-step__heading">1. Dane podstawowe:</p>
                            <TaxStep name="Roczne wynagordzenie brutto:"
                             calculations={`${taxData.income} zł`} />
                            <p className="tax-step__heading">2. Ulgi podatkowe:</p>
                            <TaxStep name={`Ulga dla młodych do kwoty ${formatPLN(incomeLimit)}:`} />
                            <TaxStep name="Zwolnienie z podatku ponieważ:"
                             calculations={`${formatPLN(incomeLimit)} > ${formatPLN(taxData.income)}`} />
                            <p className="tax-step__heading">2. Obliczanie składek społecznych:</p>   
                            <TaxStep name="Ubezpieczenie emerytalne:" 
                                    calculations={`${formatPLN(socialContributionsValue.uEmerytalne)}`} />
                            <TaxStep name="Ubezpieczenie rentowe:" 
                                    calculations={`${formatPLN(socialContributionsValue.uRentowe)}`} />
                            <TaxStep name="Ubezpieczenie chorobowe:" 
                                    calculations={`${formatPLN(socialContributionsValue.uChorobowe)}`} />
                            <p className="tax-step__heading">3. Obliczanie ubezpieczenia zdrowotnego:</p>  
                            <TaxStep name="Ubezpieczenie zdrowotne:" 
                                    calculations={`${formatPLN(healthContributionsValue.yearlyHealthContribution)}`} />
                            <p className="tax-step__heading">4. Obliczenie podatku</p>  
                            <TaxStep name="Należny podatek w skali roku:" 
                                    calculations={`${formatPLN(taxScaleResult.tax)}`} />
                        </>
                          
                    }
                    {
                        taxData.contract === "zlecenie" && taxData.income > incomeLimit &&
                        <>
                            <p className="tax-step__heading">1. Dane podstawowe:</p>
                            <TaxStep name="Roczne wynagordzenie brutto:"
                             calculations={`${taxData.income} zł`} />
                            <p className="tax-step__heading">2. Ulgi podatkowe:</p>
                            <TaxStep name={`Ulga dla młodych do kwoty ${formatPLN(incomeLimit)}:`} />
                            <TaxStep name="Kwota zwolniona z podatku:"
                             calculations={formatPLN(incomeLimit)} />
                            <TaxStep name="Pozostała kwota podlegająca opodatkowaniu:"
                             calculations={`${formatPLN(taxData.income)} - ${formatPLN(incomeLimit)} = ${formatPLN(taxScaleResult.netIncome)}`} />
                            <p className="tax-step__heading">2. Obliczanie składek społecznych:</p>   
                            <TaxStep name="Ubezpieczenie emerytalne:" 
                                    calculations={`${formatPLN(socialContributionsValue.taxedIncome)} × ${employeeSocialContributions.uEmerytalnePercentage} % = ${formatPLN(socialContributionsValue.uEmerytalne)}`} />
                            <TaxStep name="Ubezpieczenie rentowe:" 
                                    calculations={`${formatPLN(socialContributionsValue.taxedIncome)} × ${employeeSocialContributions.uRentowePercentage} % = ${formatPLN(socialContributionsValue.uRentowe)}`} />
                            <TaxStep name="Ubezpieczenie chorobowe:" 
                                    calculations={`${formatPLN(socialContributionsValue.taxedIncome)} × ${employeeSocialContributions.uChorobowePercentage} % = ${formatPLN(socialContributionsValue.uChorobowe)}`} />
                            <TaxStep name="Roczna suma składek społecznych:" 
                                    calculations={`${formatPLN(socialContributionsValue.uEmerytalne)} + ${formatPLN(socialContributionsValue.uRentowe)} + ${formatPLN(socialContributionsValue.uChorobowe)} = ${formatPLN(socialContributionsValue.yearlySocialContributions)}`} />
                            <TaxStep name="Miesięczna suma składek społecznych:" 
                                    calculations={`${formatPLN(socialContributionsValue.yearlySocialContributions)} / 12 = ${formatPLN(socialContributionsValue.monthlySocialContributions)}`} />
                             <p className="tax-step__heading">3. Obliczanie ubezpieczenia zdrowotnego:</p>  
                            <TaxStep name="Roczne ubezpieczenie zdrowotne:" 
                                    calculations={`(${formatPLN(taxScaleResult.netIncome)} - ${formatPLN(socialContributionsValue.yearlySocialContributions)}) × ${healthCountributions.taxScale.valuePercentage}% = ${formatPLN(healthContributionsValue.yearlyHealthContribution)}`} />
                            <TaxStep name="Miesięczne ubezpieczenie zdrowotne:" 
                                    calculations={`${formatPLN(healthContributionsValue.yearlyHealthContribution)} / 12 = ${formatPLN(healthContributionsValue.monthlyHealthContribution)}`} />
                            <p className="tax-step__heading">4. Obliczanie podstawy opodatkowania:</p>
                            <TaxStep name="Obliczenia podstawy opodatkowania:" 
                                    calculations={`${formatPLN(taxScaleResult.netIncome)} - ${formatPLN(socialContributionsValue.yearlySocialContributions)} = ${formatPLN(taxScaleResult.taxBase)}`} />
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
                                            calculations={`(${formatPLN(taxScaleResult.taxBase)} × ${taxParameters.taxScale.firstPercentage}%) - 3600 zł = ${formatPLN(taxScaleResult.tax)}`} />
                                </>
                                :
                                <>
                                    <p className="tax-step__heading">6. Obliczenie podatku - drugi próg podatkowy:</p>  
                                    <TaxStep name="Obliczenie podatku:" 
                                            calculations={`(${formatPLN(taxScaleResult.taxBase)} × ${taxParameters.taxScale.firstPercentage}% - 3600 zł) + (${formatPLN(taxScaleResult.taxBase)} - ${formatPLN(taxParameters.taxScale.incomeThreshold)}) × ${taxParameters.taxScale.secondPercentage} % = ${formatPLN(taxScaleResult.tax)}`} />
                                </>
                            }
                            <TaxStep name="Miesięczna zaliczka na podatek" 
                                    calculations={`${formatPLN(taxScaleResult.tax / 12)}`} />
                            <TaxStep name="Należny podatek w skali roku:" 
                                    calculations={`${formatPLN(taxScaleResult.tax)}`} />
                        </>
                    }
                    {
                        taxData.contract === "praca" && taxData.income <= incomeLimit &&
                        <>
                            <p className="tax-step__heading">1. Dane podstawowe:</p>
                            <TaxStep name="Roczne wynagordzenie brutto:"
                             calculations={`${formatPLN(taxData.income)}`} />
                            <TaxStep name="Miesięczne wynagordzenie brutto:"
                             calculations={`${formatPLN(socialContributionsValue.monthlyIncome)}`} />
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
                                    calculations={`(${formatPLN(socialContributionsValue.monthlyIncome)} - ${formatPLN(socialContributionsValue.monthlySocialContributions)}) × ${healthCountributions.taxScale.valuePercentage}% = ${formatPLN(healthContributionsValue.monthlyHealthContribution)}`} />
                            <TaxStep name="Roczne ubezpieczenie zdrowotne:" 
                                    calculations={`(${taxScaleResult.netIncome} zł - ${formatPLN(socialContributionsValue.yearlySocialContributions)}) × ${healthCountributions.taxScale.valuePercentage}% = ${formatPLN(healthContributionsValue.yearlyHealthContribution)}`} />
                            <p className="tax-step__heading">4. Ulgi podatkowe:</p>
                            <TaxStep name={`Ulga dla młodych do kwoty ${formatPLN(incomeLimit)}:`} />
                            <TaxStep name="Przysługuje zwolnienie z podatku ponieważ:"
                             calculations={`${formatPLN(incomeLimit)} > ${formatPLN(taxData.income)}`} />
                            <p className="tax-step__heading">6. Obliczenie podatku - zwolniony</p>  
                            <TaxStep name="Miesięczna zaliczka na podatek" 
                                    calculations={`${formatPLN(taxScaleResult.tax / 12)}`} />
                            <TaxStep name="Należny podatek w skali roku:" 
                                    calculations={`${formatPLN(taxScaleResult.tax)}`} />
                        </>
                    }
                    {
                        taxData.contract === "praca" && taxData.income > incomeLimit && 
                        <>
                            <p className="tax-step__heading">1. Dane podstawowe:</p>  
                            <TaxStep name="Roczne wynagordzenie brutto:"
                                    calculations={`${taxData.income} zł`} />
                            <p className="tax-step__heading">2. Ulgi podatkowe:</p>
                            <TaxStep name={`Ulga dla młodych do kwoty ${formatPLN(incomeLimit)}:`} />
                            <TaxStep name="Kwota zwolniona z podatku:"
                             calculations={formatPLN(incomeLimit)} />
                            <TaxStep name="Pozostała kwota podlegająca opodatkowaniu:"
                             calculations={`${formatPLN(taxData.income)} - ${formatPLN(incomeLimit)} = ${formatPLN(taxScaleResult.netIncome)}`} />
                            <p className="tax-step__heading">2. Obliczanie składek społecznych:</p>   
                            <TaxStep name="Ubezpieczenie emerytalne:" 
                                    calculations={`${formatPLN(socialContributionsValue.taxedIncome)} × ${employeeSocialContributions.uEmerytalnePercentage} % = ${formatPLN(socialContributionsValue.uEmerytalne)}`} />
                            <TaxStep name="Ubezpieczenie rentowe:" 
                                    calculations={`${formatPLN(socialContributionsValue.taxedIncome)} × ${employeeSocialContributions.uRentowePercentage} % = ${formatPLN(socialContributionsValue.uRentowe)}`} />
                            <TaxStep name="Ubezpieczenie chorobowe:" 
                                    calculations={`${formatPLN(socialContributionsValue.taxedIncome)} × ${employeeSocialContributions.uChorobowePercentage} % = ${formatPLN(socialContributionsValue.uChorobowe)}`} />
                            <TaxStep name="Miesięczna suma składek społecznych:" 
                                    calculations={`${formatPLN(socialContributionsValue.monthlySocialContributions)}`} />
                            <TaxStep name="Roczna suma składek społecznych:" 
                                    calculations={`${formatPLN(socialContributionsValue.monthlySocialContributions)} × 12 = ${formatPLN(socialContributionsValue.yearlySocialContributions)}`} />
                            <p className="tax-step__heading">3. Obliczanie ubezpieczenia zdrowotnego:</p>  
                            <TaxStep name="Roczne ubezpieczenie zdrowotne:" 
                                    calculations={`(${formatPLN(taxScaleResult.netIncome)} - ${formatPLN(socialContributionsValue.yearlySocialContributions)}) × ${healthCountributions.taxScale.valuePercentage}% = ${formatPLN(healthContributionsValue.yearlyHealthContribution)}`} />
                            <TaxStep name="Miesięczne ubezpieczenie zdrowotne:" 
                                    calculations={`${formatPLN(healthContributionsValue.yearlyHealthContribution)} / 12 = ${formatPLN(healthContributionsValue.monthlyHealthContribution)}`} />
                            <p className="tax-step__heading">4. Obliczanie podstawy opodatkowania:</p>
                            <TaxStep name="Obliczenia podstawy opodatkowania:" 
                                    calculations={`${formatPLN(taxScaleResult.netIncome)} - ${formatPLN(socialContributionsValue.yearlySocialContributions)} = ${formatPLN(taxScaleResult.taxBase)}`} />
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
                                            calculations={`(${formatPLN(taxScaleResult.taxBase)} × ${taxParameters.taxScale.firstPercentage}%) - 3600 zł = ${formatPLN(taxScaleResult.tax)}`} />
                                </>
                                :
                                <>
                                    <p className="tax-step__heading">6. Obliczenie podatku - drugi próg podatkowy:</p>  
                                    <TaxStep name="Obliczenie podatku:" 
                                            calculations={`(${formatPLN(taxScaleResult.taxBase)} × ${taxParameters.taxScale.firstPercentage}% - 3600 zł) + (${formatPLN(taxScaleResult.taxBase)} - ${formatPLN(taxParameters.taxScale.incomeThreshold)}) × ${taxParameters.taxScale.secondPercentage} % = ${formatPLN(taxScaleResult.tax)}`} />
                                </>
                            }
                            <TaxStep name="Miesięczna zaliczka na podatek" 
                                    calculations={`${formatPLN(taxScaleResult.tax / 12)}`} />
                            <TaxStep name="Należny podatek w skali roku:" 
                                    calculations={`${formatPLN(taxScaleResult.tax)}`} />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default CalculateTaxScaleForYouth;