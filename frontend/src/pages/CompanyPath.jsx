import React from "react";
import PathHead from "../components/PathHead";
import PathBody from "../components/PathBody";
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

const CompanyPath = () => {
    return (
        <section id="companyPath">
            <div className="container">
                <PathHead title="Osoba prowadząca działalność gospodarczą"
                        text="Jeszcze parę kroków i wspólnie obliczymy twój podatek."
                />
                <PathBody cards={taxPaths} header="Wybierz sposób opodatkowania"/>
            </div>
        </section>
    )
}

export default CompanyPath