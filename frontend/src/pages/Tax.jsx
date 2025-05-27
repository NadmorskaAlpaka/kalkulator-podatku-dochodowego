import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import "../styles/tax.css"
import PathHead from "../components/PathHead";
import CalculateTaxScale from "../components/CalculateTaxScale";
import CalculateTaxScaleForEmployee from "../components/CalculateTaxScaleForEmployee";
import CalculateTaxScaleWithSpouse from "../components/CalculateTaxScaleWithSpouse";
import CalculateTaxScaleForYouth from "../components/CalculateTaxScaleForYouth";
import CalculateTaxScaleForEmployeeWithSpouse from "../components/CalculateTaxScaleForEmployeeWithSpouse";
import DisplayTaxComparison from "../components/DisplayTaxComparison";
import CalculateFlatTax from "../components/CalculateFlatTax";
import CalculateLumpSumTax from "../components/CalculateLumpSumTax";
import CalculateTaxScaleWithSpouseEmployee from "../components/CalculateTaxScaleWithSpouseEmployee";

const Tax = () => {
    const location = useLocation();
    const data = location.state;

    return (
        <section id="tax">
            <div className="container">
                <PathHead 
                    title="Podatek obliczony!" 
                    text={`Sposób opodatkowania - ${data.taxType === "pracownik" ? "skala podatkowa" : data.taxType}. Poniżej znajdziesz szczegóły dotyczące Twojego podatku.`}
                />

                {(data.taxType === "pracownik" && !data.taxData.taxWithSpous && !data.taxData.taxBreaksStatus.youth) && <CalculateTaxScaleForEmployee data={data} />}
                {(data.taxType === "pracownik" && data.taxData.taxWithSpous && !data.taxData.taxBreaksStatus.youth) && <CalculateTaxScaleForEmployeeWithSpouse data={data} />}
                {(data.taxType === "pracownik" && data.taxData.taxBreaksStatus.youth) && <CalculateTaxScaleForYouth data={data} />}

                {data.taxType === "skala podatkowa" && !data.taxData.taxWithSpous && <CalculateTaxScale data={data} />}
                {data.taxType === "skala podatkowa" && data.taxData.taxWithSpous && data.taxData.spouseBussines && <CalculateTaxScaleWithSpouse data={data} />}
                {data.taxType === "skala podatkowa" && data.taxData.taxWithSpous && !data.taxData.spouseBussines && <CalculateTaxScaleWithSpouseEmployee data={data} />}

                {data.taxType === "ryczałt" && <CalculateLumpSumTax data={data} />}
                {data.taxType === "podatek liniowy" && <CalculateFlatTax data={data} />}
                {data.taxType === "porównanie opodatkowania" && <DisplayTaxComparison data={data} />}
            </div>
        </section>
    )
}

export default Tax;