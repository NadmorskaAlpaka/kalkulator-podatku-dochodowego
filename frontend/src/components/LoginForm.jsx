import React from "react";
import "../styles/loginForm.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
    return (
        <section id="login">
            <div className="container">
                <div className="login__box">
                    <h1 className="login__header">Logowanie</h1>
                    <p className="text">Wpisz adres e-mail i hasło, aby zalogować się do konta</p>
                    <div className="login__form">
                        <label className="input__label">Adres e-mail</label>
                        <input className="input__field" type="email" name="email" placeholder="jan.kowalski@example.com"/>
                        <label className="input__label">Hasło</label>
                        <input className="input__field" type="password" name="password" placeholder="********" />
                        <Link to="/haslo" className="redirection__link">Zapomniałeś hasła?</Link>
                        <button className="cta">Zaloguj się</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginForm;