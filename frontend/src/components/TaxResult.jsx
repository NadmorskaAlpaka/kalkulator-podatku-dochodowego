import React from "react";
import "../styles/taxResult.css";

const TaxResult = ({tax,socialContributions,healthContribution}) => {
    return (
        <div className="tax-result">
            <div className="tax__box">
                <h2 className="tax__name">Podatek dochodowy:</h2>
                <p className="tax__value">{tax.toFixed(2)} zł</p>
            </div>
            <div className="tax__box">
                <h2 className="tax__name">Składki społeczne:</h2>
                <p className="tax__value">{socialContributions.toFixed(2)} zł</p>
            </div>
            <div className="tax__box">
                <h2 className="tax__name">Składka zdrowotna:</h2>
                <p className="tax__value">{healthContribution.toFixed(2)} zł</p>
            </div>
        </div>
    )
}

export default TaxResult;