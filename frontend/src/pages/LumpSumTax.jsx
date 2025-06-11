import React, { useState, useEffect } from "react";
import "../styles/lumpSumTax.css"
import PathHead from "../components/PathHead";
import TaxInput from "../components/TaxInput";
import TaxInputSelect from "../components/TaxInputSelect";
import ZUSSelector from "../components/ZusSelector";
import { useNavigate } from "react-router-dom";

const LumpSumTax = ({taxParameters}) => {

    const navigate = useNavigate();

    const {lumpSumTax} = taxParameters;

    const [income, setIncome] = useState(0);
    const [selectedLumpSumValue, setSelectedLumpSumValue] = useState(0);

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

        if(selectedLumpSumValue <= 0){
            errorMessage.push("Wybierz stawkę opodatkowania.");
            error = true;
        }

        setErrorMessage(errorMessage)
        setError(error);
        return error;
    }

    const submit = () => {
        const taxData = {
            income,
            selectedLumpSumValue,
            zus
        }

        let data = {
            taxType: "ryczałt",
            taxData: taxData,
            taxParameters: taxParameters
        }

        const error = validateInputs();

        if(!error){
            navigate("/podatek", {state: data});
        }
    }

    return (
        <section id="lump-sum">
            <div className="container">
                <PathHead title="Rozliczam się ryczałtem ewidencjonowanym"
                    text="Coraz bliżej! Wypełnij poniższe pola i podaj wymagane informacje, abyśmy mogli obliczyć twój podatek." />
                <div className="lump-sum__box">
                    <TaxInput label="Twoj roczny przychód" type="number" value={income}
                        handleChange={(e) => handleChange(e,setIncome)}
                    />
                    <TaxInputSelect label="Stawka opodatkowania" 
                                    value={selectedLumpSumValue} 
                                    handleChange={(e) => handleChange(e,setSelectedLumpSumValue)} 
                                    options={lumpSumTax} 
                                    defaultText="Wybierz stawkę opodatkowania"
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

export default LumpSumTax;