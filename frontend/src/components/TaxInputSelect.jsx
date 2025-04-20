import React from "react";

const TaxInputSelect = ({label,value,handleChange,options,defaultText}) => {
    return (
        <div className="tax-input__box">
            <label className="tax-input__label">{label}</label>
            <select className="input__select" value={value} onChange={handleChange}>   
                <option defaultValue value="0">{defaultText}</option>
                    {
                        options.map((element,index) => <option key={index} value={element}>{element}%</option>)
                    }                    
            </select>
        </div>
    )
}

export default TaxInputSelect;