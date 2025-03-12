import React, { useEffect, useState } from "react";
import "../styles/calculateTaxScale.css";
import TaxResult from "./TaxResult";
import TaxStep from "./TaxStep";

const CalculateTaxScale = ({data}) => {

    const [showSteps, setShowSteps] = useState(false);

    const contributionBasis = 5203.80;

    const netIncome = (data.income - data.costsOfIncome);

    const uEmerytalne = (contributionBasis * 19.52) / 100;
    const uRentowe = (contributionBasis * 8) / 100;
    const uChorobowe = (contributionBasis * 2.45) / 100; 
    const uWypadkowe = (contributionBasis * 1.67) / 100;
    const funduszPracy = (contributionBasis * 2.45) / 100;

    const socialContributions = uEmerytalne + uRentowe + uChorobowe + uWypadkowe + funduszPracy;
    const healthContribution = (netIncome * 9) / 100;

    const taxBase = (netIncome - socialContributions * 12);

    const isTaxFree = taxBase > 30000;

    let tax;

    if(taxBase <= 120000){
        tax = ((taxBase * 12) / 100) - 3600;
    } else if(taxBase > 120000){
        tax = (((120000 * 12) / 100) - 3600) + ((taxBase - 120000) * 32) / 100; 
    }

    let ulgiPodatkowe;

    if(tax < 0){
        tax = 0;
    }

    let danina;

    if(netIncome > 1000000){
        danina = ((netIncome - 1000000) * 4) / 100;
    }

    useEffect(() => {
        console.log(typeof(contributionBasis))
        console.log(typeof(netIncome))
        console.log(typeof(uEmerytalne))
        console.log(typeof(uRentowe))
        console.log(typeof(uChorobowe))
        console.log(typeof(uWypadkowe))
        console.log(typeof(funduszPracy))
        console.log(typeof(socialContributions))
        console.log(typeof(healthContribution))
        console.log(typeof(taxBase))
        console.log(typeof(isTaxFree))
        console.log(data);
    },[])

    return (
        <div className="tax-result__box">
            <TaxResult tax={tax} 
                       socialContributions={socialContributions}
                       healthContribution={healthContribution}
            />
            <div className="tax-steps">
                <div class="tax-steps__head" onClick={() => setShowSteps(!showSteps)}>
                    <p className="tax-steps__header">Szczegółowe obliczenia podatku</p>
                    <button className="cta">{showSteps ? "Zamknij" : "Zobacz"}</button>
                </div>
                <div className={`tax-steps__body animated-box ${showSteps ? "open" : "closed"}`}>
                    <TaxStep name="Roczny przychód brutto:"
                             calculations={`${data.income} zł`} />
                    <TaxStep name="Roczne koszty uzyskania przychodu:"
                             calculations={`${data.costsOfIncome} zł`} />
                    <TaxStep name="Roczny przychód netto:"
                             calculations={`${data.income} zł - ${data.costsOfIncome} zł = ${netIncome} zł`} />
                    <TaxStep name="Ubezpieczenie emerytalne:" 
                             calculations={`${contributionBasis} zł * 19.52% = ${uEmerytalne} zł`} />
                    <TaxStep name="Ubezpieczenie rentowe:" 
                             calculations={`${contributionBasis} zł * 8% = ${uRentowe} zł`} />
                    <TaxStep name="Ubezpieczenie chorobowe:" 
                             calculations={`${contributionBasis} zł * 2.45% = ${uChorobowe} zł`} />
                    <TaxStep name="Ubezpieczenie wypadkowe:" 
                             calculations={`${contributionBasis} zł * 1.67% = ${uWypadkowe} zł`} />
                    <TaxStep name="Składka na fundusz pracy:" 
                             calculations={`${contributionBasis} zł * 2.45% = ${funduszPracy} zł`} />
                    <TaxStep name="Suma składek społecznych:" 
                             calculations={`${socialContributions} zł`} />
                    <TaxStep name="Składka zdrowotna:" 
                             calculations={`${netIncome} zł * 9% = ${healthContribution} zł`} />
                    <p>{taxBase}</p>
                    <p>{isTaxFree ? "Kontynuacja obliczania podatku" : "Wolny od podatku"}</p>
                    <p>{tax}</p>
                    <TaxStep name="Danina solidatnościowa:" 
                             calculations={`(${netIncome} zł - 1000000 zł) * 4% = ${danina} zł`} />
                    <p>danina {danina}</p>
                </div>
            </div>
        </div>
    )
}

export default CalculateTaxScale;