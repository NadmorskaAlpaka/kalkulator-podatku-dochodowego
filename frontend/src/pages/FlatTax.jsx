import React, {useState, useEffect } from "react";
import "../styles/flatTax.css";
import PathHead from "../components/PathHead";
import TaxInput from "../components/TaxInput";

const FlatTax = () => {

    const [costsOfIncome, setCostsOfIncome] = useState(0);
    const [income, setIncome] = useState(0);
    
    const handleChange = (e, setter) => {
        setter(e.target.value)
    }
    
    useEffect(() => {
        console.log("Przychód:", income);
        console.log("Koszty uzyskania przychodu:", costsOfIncome);
    },[income,costsOfIncome])

    return (
        <section id="flat-tax">
            <div className="container">
                <PathHead title="Rozliczam się podatkiem liniowym"
                    text="Coraz bliżej! Wypełnij poniższe pola i podaj wymagane informacje, abyśmy mogli obliczyć twój podatek." />
                <div className="flat-tax__box">
                    <TaxInput label="Przychód" type="number" value={income}
                        handleChange={(e) => handleChange(e, setIncome)}
                    />
                    <TaxInput label="Koszty uzyskania przychodu" type="number" value={costsOfIncome}
                        handleChange={(e) => handleChange(e, setCostsOfIncome)}
                    />
                    <button className="cta">Oblicz podatek</button>
                </div>
            </div>
        </section>
    )
}

export default FlatTax;