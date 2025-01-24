import React from "react";
import PathHead from "../components/PathHead";
import PathBody from "../components/PathBody";

const CompanyPath = () => {
    return (
        <section id="companyPath">
            <div className="container">
                <PathHead title="Osoba prowadząca działalność gospodarczą"
                        text="Jeszcze parę kroków i wspólnie obliczymy twój podatek."
                />
                <PathBody />
            </div>
        </section>
    )
}

export default CompanyPath