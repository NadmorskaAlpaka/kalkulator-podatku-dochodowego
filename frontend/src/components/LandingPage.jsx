import React from "react";
import Image1 from "../assets/lp_person.png";
import "../styles/landingPage.css";

const LandingPage = () => {
    return (
        <section id="landing-page">
            <div className="landig-page__box">
                <div className="landig-page__content">
                    <h1 className="title">Kalkulator podatku dochodowego<br class="landing-page__line-break"/> dla osób fizycznych i firm</h1>
                    <h2 className="sub-title">Oblicz podatek dochodowy w prosty sposób</h2>
                    <p className="text">Sprawdź ile wyniesie twój podatek</p>
                    <button className="cta">Zaczynamy</button>
                </div>
                <img src={Image1} class="landing-page__img" alt="person with computer ilustration" />
            </div>
        </section>
    )
}

export default LandingPage