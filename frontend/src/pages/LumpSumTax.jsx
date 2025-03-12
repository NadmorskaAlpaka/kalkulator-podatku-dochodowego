import React, {useState, useEffect} from "react";
import "../styles/lumpSumTax.css"
import PathHead from "../components/PathHead";
import TaxInput from "../components/TaxInput";

const LumpSumTax = () => {

    const [income, setIncome] = useState(0);

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }
        
    useEffect(() => {
        console.log("Przychód:", income);
    },[income])

    return (
        <section id="lump-sum">
            <div className="container">
                <PathHead title="Rozliczam się ryczałtem ewidencjonowanym"
                    text="Coraz bliżej! Wypełnij poniższe pola i podaj wymagane informacje, abyśmy mogli obliczyć twój podatek." />
                <div className="lump-sum__box">
                    <TaxInput label="Twoj roczny przychód brutto" type="number" value={income}
                        handleChange={(e) => handleChange(e, setIncome)}
                    />
                    <button className="cta">Oblicz podatek</button>
                </div>
            </div>
        </section>
    )
}

export default LumpSumTax;