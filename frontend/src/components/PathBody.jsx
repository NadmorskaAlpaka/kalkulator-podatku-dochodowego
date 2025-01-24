import React from "react";
import Card from "./Card";
import "../styles/pathBody.css";
import image from "../assets/bussines_man.png";

const taxPaths = [
    {
        title: "Rozliczam się według skali podatkowej",
        imgUrl: image,
        imgAlt: "Skala podatkowa",
        path: "skala-podatkowa",
    },
    {
        title: "Rozliczam się podatkiem liniowym",
        imgUrl: image,
        imgAlt: "Podatek liniowy",
        path: "podatek-liniowy"
    },
    {
        title: "Rozliczam się ryczałtem ewidencjonowanym",
        imgUrl: image,
        imgAlt: "Ryczałt ewidencjonowany",
        path: "ryczalt-ewidencjonowany"
    },
    {
        title: "Porównanie sposobów opodatkowania",
        imgUrl: image,
        imgAlt: "Porównanie opodatkowania",
        path: "porownanie-opodatkowania"
    }
];

const PathBody = () => {
    return (
        <div className="path-type">
            <h3 className="header">Wybierz sposób opodatkowania</h3>
            <div className="path-type__box">
                {
                    taxPaths.map((taxPath) =>
                        <Card size="small"
                            imgUrl={taxPath.imgUrl}
                            imgAlt={taxPath.imgAlt}
                            title={taxPath.title}
                            path={taxPath.path}
                            key={taxPath.path}
                            buttonText="Wybierz"
                        />
                    )
                }
            </div>
        </div>
    )
}

export default PathBody;