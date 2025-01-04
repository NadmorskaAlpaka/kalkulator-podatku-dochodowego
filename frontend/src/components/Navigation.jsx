import React from "react";
import "../styles/navigation.css";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <div className="nav__container">
                <Link className="nav__icon" to="/">
                    <span className="material-symbols-outlined">home</span>
                </Link>
                <Link className="nav__icon" to="/login">
                    <span className="material-symbols-outlined">account_circle</span>
                </Link>
            </div>
        </nav>
    )
}

export default Navigation;