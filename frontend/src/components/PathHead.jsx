import React from "react";
import "../styles/pathHead.css"

const PathHead = ({title, text}) => {
    return (
        <section id="path-head">
            <div className="container">
                <div className="path-head__box">
                    <h1 className="path-head__title">{title}</h1>
                    <hr className="path-head__line"/>
                    <p className="text">{text}</p>
                </div>
            </div>
        </section>
    )
}

export default PathHead;