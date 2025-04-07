import React, { useState, useEffect } from "react";
import "../styles/lumpSumTax.css"
import PathHead from "../components/PathHead";
import TaxInput from "../components/TaxInput";

const LumpSumTax = ({taxParameters}) => {

    const {LumpSumTax} = taxParameters;

    const [income, setIncome] = useState(0);
    const [selectedFruit, setSelectedFruit] = useState('orange');

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    useEffect(() => {
        console.log("Przychód:", income);
        console.log("Ryczałt", taxParameters)
    }, [income])

    return (
        <section id="lump-sum">
            <div className="container">
                <PathHead title="Rozliczam się ryczałtem ewidencjonowanym"
                    text="Coraz bliżej! Wypełnij poniższe pola i podaj wymagane informacje, abyśmy mogli obliczyć twój podatek." />
                <div className="lump-sum__box">
                    <TaxInput label="Twoj roczny przychód brutto" type="number" value={income}
                        handleChange={(e) => handleChange(e, setIncome)}
                    />
                    <select
                        value={selectedFruit} 
                        onChange={e => setSelectedFruit(e.target.value)}
                    >   
                        <option value="apple">Apple</option>
                        <option value="banana">Banana</option>
                        <option value="orange">Orange</option>
                    </select>
                    <button className="cta">Oblicz podatek</button>
                </div>
            </div>
        </section>
    )
}

export default LumpSumTax;