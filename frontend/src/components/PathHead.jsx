import React from "react";
import "../styles/pathHead.css"

const PathHead = ({title, text}) => {
    return (
        <div className="path-head">
            <h1 className="path-head__title">{title}</h1>
            <hr className="path-head__line"/>
            <p className="text">{text}</p>
        </div>
    )
}

export default PathHead;