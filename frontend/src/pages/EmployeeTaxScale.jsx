import React, { useState } from "react";
import "../styles/taxScale.css";
import PathHead from "../components/PathHead";
import TaxInput from "../components/TaxInput";
import ToggleInput from "../components/ToggleInput";
import Checkbox from "../components/Checkbox";
import { useNavigate } from "react-router-dom";

const EmployeeTaxScale = ({ taxParameters }) => {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState([]);
    const [error, setError] = useState(false);

    const [income, setIncome] = useState(0);
    const [taxBreaksStatus, setTaxBreaksStatus] = useState({
        internet: false,
        rehabilitation: false,
        child: false,
        bloodDonation: false,
        youth: false,
        other: false
    });
    const [availableTaxBreaks, setAvailableTaxBreaks] = useState(false);
    const [taxWithSpous, setTaxWithSpous] = useState(false);
    const [spouseIncome, setSpouseIncome] = useState(0);
    const [contract, setContract] = useState("");

    const [internetValue, setInternetValue] = useState(0);
    const [rehabilitationValue, setrehabilitationValue] = useState(0);
    const [childrenNumber, setChildrenNumber] = useState(0);
    const [bloodLiters, setBloodLiters] = useState(0);
    const [otherTaxBreakValue, setOtherTaxBreakValue] = useState(0);

    const handleCheckbox = (e, setter) => {
        setter(e.target.checked);
    }

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    const handleTaxBreaksStatus = (e) => {
        setTaxBreaksStatus((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked,
        }));
    };

    const validateInputs = () => {
        let error = false;
        let errorMessage = [];

        if (contract === "") {
            errorMessage.push("Wybierz formę zatrudnienia");
            error = true;
        }

        if (income <= 0) {
            errorMessage.push("Wynagordzenie musi być większy od zera.");
            error = true;
        }

        if (availableTaxBreaks && (!taxBreaksStatus.internet && !taxBreaksStatus.rehabilitation && !taxBreaksStatus.child && !taxBreaksStatus.bloodDonation && !taxBreaksStatus.youth && !taxBreaksStatus.other)) {
            errorMessage.push("Wybierz ulgi podatkowke które Cie dotyczną.");
            error = true;
        }

        if (taxWithSpous && spouseIncome <= 0 && !taxBreaksStatus.youth) {
            errorMessage.push("Wynagrodzenie małżonka musi być większe od zera.");
            error = true;
        }

        setErrorMessage(errorMessage)
        setError(error);
        return error;
    }

    const submit = () => {
        const taxData = {
            income: Number(income),
            taxBreaksStatus,
            availableTaxBreaks,
            taxWithSpous,
            spouseIncome: Number(spouseIncome),
            internetValue: Number(internetValue),
            rehabilitationValue: Number(rehabilitationValue),
            contract,
            childrenNumber: Number(childrenNumber),
            bloodLiters: Number(bloodLiters),
            otherTaxBreakValue: Number(otherTaxBreakValue)
        }

        let data = {
            taxType: "pracownik",
            taxData: taxData,
            taxParameters: taxParameters
        }

        const error = validateInputs();

        if (!error) {
            navigate("/podatek", { state: data });
        }
    }

    return (
        <section id="tax-scale">
            <div className="container">
                <PathHead title="Osoba nieprowadząca działalności gospodarczej"
                    text="Coraz bliżej! Wypełnij poniższe pola i podaj wymagane informacje, abyśmy mogli obliczyć twój podatek." />
                <div className="tax-scale__box">
                    <div className="tax__contract">
                        <p className="tax-input__label">Wybierz formę zatrudnienia</p>
                        <div>
                            <input type="radio" value="praca" id="praca" name="contract" onChange={e => setContract(e.target.value)} />
                            <label htmlFor="praca">Umowa o pracę</label>
                        </div>
                        <div>
                            <input type="radio" value="zlecenie" id="zlecenie" name="contract" onChange={e => setContract(e.target.value)} />
                            <label htmlFor="zlecenie">Umowa zlecenie</label>
                        </div>
                    </div>
                </div>
                <TaxInput label="Twoje roczne wynagrodzenie brutto" type="number" value={income}
                    handleChange={(e) => handleChange(e, setIncome)}
                />
                <ToggleInput label="Przysługują Ci ulgi podatkowe?"
                    handleChange={(e) => handleCheckbox(e, setAvailableTaxBreaks)}
                />
                <div className={`animated-box ${availableTaxBreaks ? "open" : "closed"}`}>
                    <p className="tax-scale__breaks">Wybierz ulgi podatkowe:</p>
                    <Checkbox text="Ulga na internet" name="internet" handleChange={(e) => handleTaxBreaksStatus(e)} />
                    <div className={`animated-box ${taxBreaksStatus.internet ? "open" : "closed"}`}>
                        <TaxInput label="Koszty poniesione na Internet" type="number" value={internetValue}
                            handleChange={(e) => handleChange(e, setInternetValue)}
                        />
                    </div>
                    <Checkbox text="Ulga rehabilitacyjna" name="rehabilitation" handleChange={(e) => handleTaxBreaksStatus(e)} />
                    <div className={`animated-box ${taxBreaksStatus.rehabilitation ? "open" : "closed"}`}>
                        <TaxInput label="Koszty poniesione na rehabilitacje" type="number" value={rehabilitationValue}
                            handleChange={(e) => handleChange(e, setrehabilitationValue)}
                        />
                    </div>
                    <Checkbox text="Ulga prorodzinna" name="child" handleChange={(e) => handleTaxBreaksStatus(e)} />
                    <div className={`animated-box ${taxBreaksStatus.child ? "open" : "closed"}`}>
                        <TaxInput label="Ilość dzieci" type="number" value={childrenNumber} clear
                            handleChange={(e) => handleChange(e, setChildrenNumber)}
                        />
                    </div>
                    <Checkbox text="Ulga dla krwiodawców" name="bloodDonation" handleChange={(e) => handleTaxBreaksStatus(e)} />
                    <div className={`animated-box ${taxBreaksStatus.bloodDonation ? "open" : "closed"}`}>
                        <TaxInput label="Ilość litrów krwi" type="number" value={bloodLiters} clear
                            handleChange={(e) => handleChange(e, setBloodLiters)}
                        />
                    </div>
                    <Checkbox text="Ulga dla młodych" name="youth" handleChange={(e) => handleTaxBreaksStatus(e)} />
                    <Checkbox text="Inna ulga" name="other" handleChange={(e) => handleTaxBreaksStatus(e)} />
                    <div className={`animated-box ${taxBreaksStatus.other ? "open" : "closed"}`}>
                        <TaxInput label="Kwota innych ulg" type="number" value={otherTaxBreakValue}
                            handleChange={(e) => handleChange(e, setOtherTaxBreakValue)}
                        />
                    </div>
                </div>
                {
                    !taxBreaksStatus.youth &&
                    <>
                        <ToggleInput label="Rozliczasz się wspólnie z małżonkiem?"
                            handleChange={(e) => handleCheckbox(e, setTaxWithSpous)}
                        />
                        <div className={`animated-box ${taxWithSpous ? "open" : "closed"}`}>
                            <TaxInput label="Roczne wynagrodzenie małżonka" type="number" value={spouseIncome}
                                handleChange={(e) => handleChange(e, setSpouseIncome)}
                            />
                        </div>
                    </>
                }
                {
                    error &&
                    <div>
                        {
                            errorMessage.map((message, index) => (
                                <p key={index} className="error__message">{message}</p>
                            ))
                        }
                    </div>
                }
                <button className="cta" onClick={submit}>Oblicz podatek</button>
            </div>
        </section >
    )
}

export default EmployeeTaxScale;