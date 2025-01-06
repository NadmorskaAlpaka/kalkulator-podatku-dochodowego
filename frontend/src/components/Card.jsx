import React from "react";
import "../styles/card.css";
import { Link } from "react-router-dom";

const Card = ({ size, imgUrl, imgAlt, title, path, buttonText }) => {
    let cardClasses = ""
    if(size == "big"){
        cardClasses = "card card--big"
    } else if(cardClasses == "medium"){
        cardClasses = "card card--medium"
    } else {
        cardClasses = "card card--small"
    }

    return (
        <div className={cardClasses}>
            <img className="card__img" src={imgUrl} alt={imgAlt} />
            <p className='card__title'>{title}</p>
            <Link className="cta" to={path}>{buttonText}</Link>
        </div>
    )
}

export default Card;