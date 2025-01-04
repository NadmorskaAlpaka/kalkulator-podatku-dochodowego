import React from "react";
import "../styles/footer.css";
import PrzLogo from "../assets/prz_pl.png";
import WeiiLogo from "../assets/weii_pl.png";

const Footer = () => {
    return (
        <footer>
            <p className="footer__title">Projekt inżynierski 2025</p>
            <div className="footer__container">
                <img className="university__logo" src={PrzLogo} alt="Politechnika Rzeszowska" />
                <div className="author__box">
                    <p className="author__text">Wykonał:</p>
                    <p className="author__text">Grzegorz Szerszeń</p>
                    <p className="author__text">171678</p>
                </div>
                <img className="university__logo" src={WeiiLogo} alt="Wydział Elektrotechniki i Informatyki" />
            </div>
        </footer>
    )
}

export default Footer;