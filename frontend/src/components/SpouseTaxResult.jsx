import React from "react";
import "../styles/taxResult.css";

const SpouseTaxResult = ({ tax, socialContributions, healthContribution, spouseSocialContributions, spouseHealthContribution }) => {
    return (
        <div className="tax-result">
            <div className="tax__box">
                <h2 className="header">Rozliczenie wspólne z małżonkiem</h2>
            </div>
            <div className="tax__box">
                <h2 className="tax__name">Łączny podatek dochodowy:</h2>
                <p className="tax__value">{tax.toFixed(2)} zł</p>
            </div>
            <div className="tax__box">
                <h2 className="tax__name">Podatek dochodowy na małżonka:</h2>
                <p className="tax__value">{(tax / 2).toFixed(2)} zł</p>
            </div>
            <div className="tax__box">
                <h2 className="tax__name">Składki społeczne:</h2>
                <p className="tax__value">{socialContributions.toFixed(2)} zł</p>
            </div>
            <div className="tax__box">
                <h2 className="tax__name">Składka zdrowotna</h2>
                <p className="tax__value">{healthContribution.toFixed(2)} zł</p>
            </div>
            <div className="tax__box">
                <h2 className="tax__name">Składki społeczne małżonka:</h2>
                <p className="tax__value">{spouseSocialContributions.toFixed(2)} zł</p>
            </div>
            <div className="tax__box">
                <h2 className="tax__name">Składka zdrowotna małżonka</h2>
                <p className="tax__value">{spouseHealthContribution.toFixed(2)} zł</p>
            </div>
        </div>
    )
}

export default SpouseTaxResult;