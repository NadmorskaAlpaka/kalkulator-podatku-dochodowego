import React from "react";
import "../styles/taxStep.css";

const TaxStep = ({name, calculations}) => {
    return (
        <div className="step">
            <p className="step__name">{name}</p>
            <p className="step__value">{calculations}</p>
        </div>
    )
}

export default TaxStep;