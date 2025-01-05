import React from "react";
import "../styles/noAccountYet.css";
import { Link } from "react-router-dom";

const NoAccountYet = () => {
    return (
        <section id="no-account">
            <div className="container">
                <div className="no-account__box">
                    <h2 className="no-account--header">Nie posiadasz jeszcze konta?</h2>
                    <Link to="/rejestracja" className="cta">Zarejestruj się</Link>
                </div>
            </div>
        </section>
    )
}

export default NoAccountYet;