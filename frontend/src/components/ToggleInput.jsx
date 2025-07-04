import React from "react";
import "../styles/toggleInput.css";

const ToggleInput = ({label, handleChange, checked}) => {
    return (
        <div className="switch__box">
            <label className="switch__label">{label}</label>
            <label className="switch">
                <input className="switch__checkbox" type="checkbox" onChange={handleChange} {...(checked !== undefined ? { checked } : {})}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default ToggleInput;