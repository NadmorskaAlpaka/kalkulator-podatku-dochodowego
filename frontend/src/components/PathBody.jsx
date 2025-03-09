import React from "react";
import Card from "./Card";
import "../styles/pathBody.css";

const PathBody = ({cards, header}) => {
    return (
        <div className="path-type">
            <h3 className="header">{header}</h3>
            <div className="path-type__box">
                {
                    cards.map((card) =>
                        <Card size="small"
                            imgUrl={card.imgUrl}
                            imgAlt={card.imgAlt}
                            title={card.title}
                            path={card.path}
                            key={card.path}
                            buttonText="Wybierz"
                        />
                    )
                }
            </div>
        </div>
    )
}

export default PathBody;