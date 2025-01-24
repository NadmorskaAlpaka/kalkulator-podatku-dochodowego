import React from "react";
import "../styles/lumpSumTax.css"
import PathHead from "../components/PathHead";

const LumpSumTax = () => {
    return (
        <section id="lump-sum">
            <div className="container">
                <PathHead title="Rozliczam się ryczałtem ewidencjonowanym"
                    text="Coraz bliżej! Wypełnij poniższe pola i podaj wymagane informacje, abyśmy mogli obliczyć twój podatek." />
                <div className="lump-sum__box">

                    <button className="cta">Oblicz podatek</button>
                </div>
            </div>
        </section>
    )
}

export default LumpSumTax;