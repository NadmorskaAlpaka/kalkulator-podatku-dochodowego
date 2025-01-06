import React from "react";
import "../styles/forgotPassword.css"
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return (
        <section id="forgot-password">
            <div className="container">
                <div className="forgot-password__box">
                    <h1 className="forgot-password__header">Zresetuj hasło</h1>
                    <label className="input__label">Wprowadź adres e-mail</label>
                    <input className="input__field" type="email" name="email" placeholder="jan.kowalski@example.com"/>
                    <button className="cta">Wyślij</button>
                    <Link to="/logowanie" className="redirection__link">&#x27F5; Powrót do logowania</Link>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword;