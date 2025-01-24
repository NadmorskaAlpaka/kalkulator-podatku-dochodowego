import React from "react";
import "../styles/card.css";
import { Link } from "react-router-dom";

const Card = ({ size, imgUrl, imgAlt, title, path, buttonText, handleOnClick }) => {
    let cardClasses = ""
    if(size == "big"){
        cardClasses = "card card--big"
    } else if(size == "medium"){
        cardClasses = "card card--medium"
    } else if(size == "small" || !size) {
        cardClasses = "card card--small"
    }

    return (
        <div className={cardClasses}>
            <img className="card__img" src={imgUrl} alt={imgAlt} />
            <p className='card__title'>{title}</p>
            {   
                path !== "" ? 
                <Link className="cta" to={path}>{buttonText}</Link> :
                <button className="cta" onClick={handleOnClick}>{buttonText}</button>
            }
        </div>
    )
}

export default Card;