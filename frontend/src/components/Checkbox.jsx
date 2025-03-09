import React from "react";
import "../styles/checkbox.css"

const Checkbox = ({text, name, handleChange}) => {
    return (
        <div className="checkbox__wrapper">
            <input type="checkbox"
                   className="checkbox" 
                   id={text}  
                   name={name}
                   onChange={handleChange}
                   />
            <label className="checkbox__label" htmlFor={text}>{text}</label>
        </div>
    )
}

export default Checkbox;