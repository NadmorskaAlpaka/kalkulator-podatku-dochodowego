import React from "react";
import PathHead from "../components/PathHead";
import TaxInput from "../components/TaxInput";

const TaxCompare = () => {
    return (
        <section id="tax-compare">
            <div className="container">
                <PathHead title="Porównanie sposobów opodatkowania"
                          text="Coraz bliżej! Wypełnij poniższe pola i podaj wymagane informacje, abyśmy mogli porównać sposoby opodatkowania." />
                <div className="tax-compare__box">
                    <TaxInput />
                </div>
            </div>
        </section>
    )
}

export default TaxCompare;