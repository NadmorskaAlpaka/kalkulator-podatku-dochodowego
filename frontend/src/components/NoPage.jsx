import { Link } from "react-router-dom";

const NoPage = () => {
    return (
        <section id="no-page" style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "80px 0"}}>
                <h1>Nie ma takiej strony</h1>
                <Link className="cta" to="/" >
                    Powrót do strony głównej
                </Link>
        </section>
    )
}

export default NoPage;