import React, { useEffect, useState } from "react";
import "../styles/taxScale.css";
import PathHead from "../components/PathHead";
import TaxInput from "../components/TaxInput";
import ToggleInput from "../components/ToggleInput";

const TaxScale = () => {

    const [taxWithSpous, setTaxWithSpous] = useState(false);
    const [income, setIncome] = useState(0);
    const [costsOfIncome, setCostsOfIncome] = useState(0);
    const [spouseIncome, setSpouseIncome] = useState(0);

    const handleCheckbox = (e) => {
        setTaxWithSpous(e.target.checked);
    }

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    useEffect(() => {
        console.log("Rozliczenie z małżonkiem:", taxWithSpous)
        console.log("Przychód:", income);
        console.log("Koszty uzyskania przychodu:", costsOfIncome);
        console.log("Dochód małżonka:", spouseIncome);
    },[taxWithSpous,income,costsOfIncome,spouseIncome])

    return (
        <section id="tax-scale">
            <div className="container">
                <PathHead title="Rozliczam się według skali podatkowej" 
                          text="Coraz bliżej! Wypełnij poniższe pola i podaj wymagane informacje, abyśmy mogli obliczyć twój podatek."/>
                <div className="tax-scale__box">
                    <TaxInput label="Przychód" type="number" value={income}
                              handleChange={(e) => handleChange(e,setIncome)} 
                    />
                    <TaxInput label="Koszty uzyskania przychodu" type="number" value={costsOfIncome}
                              handleChange={(e) => handleChange(e,setCostsOfIncome)} 
                    />
                    <ToggleInput label="Wspólne rozliczenie z małżonkiem?" 
                                 handleChange={handleCheckbox}
                    />
                    <div className={`animated-box ${taxWithSpous ? "open" : "closed"}`}>
                        <TaxInput label="Dochód małżonka" type="number" value={spouseIncome}
                                  handleChange={(e) => handleChange(e,setSpouseIncome)} 
                        />
                    </div>
                    <button className="cta">Oblicz podatek</button>
                </div>
            </div>
        </section>
    )
}

export default TaxScale;