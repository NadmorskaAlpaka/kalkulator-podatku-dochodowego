import React, {useState, useEffect } from "react";
import "../styles/flatTax.css";
import PathHead from "../components/PathHead";
import TaxInput from "../components/TaxInput";
import ZUSSelector from "../components/ZusSelector";
import { useNavigate } from "react-router-dom";

const FlatTax = ({taxParameters}) => {

    const navigate = useNavigate();

    const [income, setIncome] = useState(0);
    const [costsOfIncome, setCostsOfIncome] = useState(0);

    const [zus, setZus] = useState(null);

    const [errorMessage, setErrorMessage] = useState([]);
    const [error, setError] = useState(false);
    
    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    const validateInputs = () => {
        let error = false;
        let errorMessage = [];

        if(income <= 0){
            errorMessage.push("Przychód musi być większy od zera.");
            error = true;
        }

        if(costsOfIncome < 0){
            errorMessage.push("Koszty uzyskania przychodu nie mogą być mniejsze od zera.");
            error = true;
        } else if(!/^[0-9.,]+$/.test(costsOfIncome)){
            errorMessage.push("Koszt uzyskania przychodu zawiera niedozwolone znaki");
            error = true;
        }

        setErrorMessage(errorMessage)
        setError(error);
        return error;
    }

    const submit = () => {
        const taxData = {
            income,
            costsOfIncome,
            zus
        }

        let data = {
            taxType: "podatek liniowy",
            taxData: taxData,
            taxParameters: taxParameters
        }

        const error = validateInputs();

        if(!error){
            navigate("/podatek", {state: data});
        }
    }

    return (
        <section id="flat-tax">
            <div className="container">
                <PathHead title="Rozliczam się podatkiem liniowym"
                    text="Coraz bliżej! Wypełnij poniższe pola i podaj wymagane informacje, abyśmy mogli obliczyć twój podatek." />
                <div className="flat-tax__box">
                    <TaxInput label="Przychód roczny przychód" type="number" value={income}
                        handleChange={(e) => handleChange(e, setIncome)}
                    />
                    <TaxInput label="Twoje roczne koszty uzyskania przychodu" type="number" value={costsOfIncome}
                        handleChange={(e) => handleChange(e, setCostsOfIncome)}
                    />
                    <ZUSSelector selected={zus} setSelected={setZus} />
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
            </div>
        </section>
    )
}

export default FlatTax;