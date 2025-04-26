import React from "react";
import "../styles/checkbox.css"

const Checkbox = ({text, name, handleChange, disabled}) => {
    return (
        <div className="checkbox__wrapper">
            <input type="checkbox"
                   className="checkbox" 
                   id={text}  
                   name={name}
                   onChange={handleChange}
                   disabled={disabled}
                   />
            <label className="checkbox__label" htmlFor={text}>{text}</label>
        </div>
    )
}

export default Checkbox;