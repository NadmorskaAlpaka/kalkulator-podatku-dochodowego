import React from "react";
import "../styles/taxResult.css";

const TaxResult = ({tax,socialContributions,healthContribution,taxWithSpouse,spouseHealthContribution}) => {
    return (
        <div className="tax-result">
            {
                taxWithSpouse && 
                <>
                    <div className="tax__box">
                        <h2 className="header">Rozliczenie wspólne z małżonkiem</h2>
                    </div>
                    <div className="tax__box">
                        <h2 className="tax__name">Łączny podatek dochodowy:</h2>
                        <p className="tax__value">{tax.toFixed(2)} zł</p>
                    </div>
                </>
            }
            <div className="tax__box">
                <h2 className="tax__name">Podatek dochodowy {taxWithSpouse && "na małżonka"}:</h2>
                <p className="tax__value">{taxWithSpouse ? (tax / 2).toFixed(2) : tax.toFixed(2)} zł</p>
            </div>
            <div className="tax__box">
                <h2 className="tax__name">Składki społeczne {taxWithSpouse && "na małżonka"}:</h2>
                <p className="tax__value">{socialContributions.toFixed(2)} zł</p>
            </div>
            <div className="tax__box">
                <h2 className="tax__name">Składka zdrowotna</h2>
                <p className="tax__value">{healthContribution.toFixed(2)} zł</p>
            </div>
            {
                taxWithSpouse && 
                <>
                    <div className="tax__box">
                        <h2 className="tax__name">Składka zdrowotna {taxWithSpouse && "małżonka"}:</h2>
                        <p className="tax__value">{spouseHealthContribution.toFixed(2)} zł</p>
                    </div>
                </>
            }
        </div>
    )
}

export default TaxResult;