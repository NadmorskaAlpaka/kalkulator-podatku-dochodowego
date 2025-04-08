import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/tax.css"
import PathHead from "../components/PathHead";
import CalculateTaxScale from "../components/CalculateTaxScale";
import CalculateTaxCompare from "../components/CalculateTaxCompare";
import CalculateFlatTax from "../components/CalculateFlatTax";
import CalculateLumpSumTax from "../components/CalculateLumpSumTax";

const Tax = () => {
    const location = useLocation();
    const data = location.state;
    useEffect(() => {
        console.log("TAX",data)
    },[])

    return (
        <section id="tax">
            <div className="container">
                <PathHead 
                    title="Podatek obliczony!" 
                    text={`Sposób opodatkowania - ${data.taxType}. Poniżej znajdziesz szczegóły dotyczące Twojego podatku.`}
                />
                {data.taxType === "skala podatkowa" && <CalculateTaxScale data={data} />}
                {data.taxType === "ryczałt" && <CalculateLumpSumTax data={data} />}
                {data.taxType === "podatek liniowy" && <CalculateFlatTax data={data} />}
                {data.taxType === "porównanie opodatkowania" && <CalculateTaxCompare data={data} />}
            </div>
        </section>
    )
}

export default Tax;