import React from "react";
import "../styles/taxInput.css";

const TaxInput = ({label, type, handleChange, value, clear}) => {
    return (
        <div className="tax-input__box">
            <label className="tax-input__label">{label} {!clear && "(zł)"}</label>
            <input className="tax-input" type={type} onChange={handleChange} value={value}/>
        </div>
    )
}

export default TaxInput;