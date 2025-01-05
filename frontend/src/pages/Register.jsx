import React from "react";
import "../styles/register.css";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <section id="register">
            <div className="container">
                <div className="register__box">
                    <h1 className="register__header">Utwórz konto</h1>
                    <p className="text">Zarejestruj się i zacznij korzystać</p>
                    <div className="register__form">
                        <label className="input__label">Imie</label>
                        <input className="input__field" type="text" name="name" placeholder="Jan"/>
                        <label className="input__label">Adres e-mail</label>
                        <input className="input__field" type="email" name="email" placeholder="jan.kowalski@example.com"/>
                        <label className="input__label">Hasło</label>
                        <input className="input__field" type="password" name="password" placeholder="********" />
                        <label className="input__label">Powtórz hasło</label>
                        <input className="input__field" type="password" name="password" placeholder="********" />
                        <button className="cta">Zarejestruj się</button>
                    </div>
                    <Link to="/logowanie" className="redirection__link">&#x27F5; Powrót do logowania</Link>
                </div>
            </div>
        </section>
    )
}

export default Register;