import React from "react";
import PathHead from "../components/PathHead";
import PathBody from "../components/PathBody";
import bussinesMan from "../assets/bussines_man.png";
import bussinesWoman from "../assets/bussines_woman.png";
import bussingesGrandpa from "../assets/bussines_grandpa.png";
import bussinesTrio from "../assets/bussines_trio.png";

const taxPaths = [
    {
        title: "Rozliczam się według skali podatkowej",
        imgUrl: bussinesMan,
        imgAlt: "Skala podatkowa",
        path: "skala-podatkowa",
    },
    {
        title: "Rozliczam się podatkiem liniowym",
        imgUrl: bussinesWoman,
        imgAlt: "Podatek liniowy",
        path: "podatek-liniowy"
    },
    {
        title: "Rozliczam się ryczałtem ewidencjonowanym",
        imgUrl: bussingesGrandpa,
        imgAlt: "Ryczałt ewidencjonowany",
        path: "ryczalt-ewidencjonowany"
    },
    {
        title: "Porównanie sposobów opodatkowania",
        imgUrl: bussinesTrio,
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