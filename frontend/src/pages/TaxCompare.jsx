import React, { useState } from "react";
import PathHead from "../components/PathHead";
import TaxInput from "../components/TaxInput";
import TaxInputSelect from "../components/TaxInputSelect";
import { useNavigate } from "react-router-dom";

const TaxCompare = ({taxParameters}) => {

    const navigate = useNavigate();

    const {lumpSumTax} = taxParameters;

    const [errorMessage, setErrorMessage] = useState([]);
    const [error, setError] = useState(false);
    
    const [income, setIncome] = useState(0);
    const [costsOfIncome, setCostsOfIncome] = useState(0);
    const [selectedLumpSumValue, setSelectedLumpSumValue] = useState(0);

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

        if(selectedLumpSumValue <= 0){
            errorMessage.push("Wybierz stawkę opodatkowania ryczałtem");
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
            selectedLumpSumValue
        }

        let data = {
            taxType: "porównanie opodatkowania",
            taxData: taxData,
            taxParameters: taxParameters
        }

        const error = validateInputs();

        if(!error){
            navigate("/podatek", {state: data});
        }
    }
    
    return (
        <section id="tax-compare">
            <div className="container">
                <PathHead title="Porównanie sposobów opodatkowania"
                          text="Coraz bliżej! Wypełnij poniższe pola i podaj wymagane informacje, abyśmy mogli porównać sposoby opodatkowania." />
                <div className="tax-compare__box">
                    <TaxInput label="Twoj roczny przychód" type="number" value={income}
                              handleChange={(e) => handleChange(e,setIncome)} 
                    />
                    <TaxInput label="Twoje roczne koszty uzyskania przychodu" type="number" value={costsOfIncome}
                              handleChange={(e) => handleChange(e,setCostsOfIncome)} 
                    />
                    <TaxInputSelect label="Stawka opodatkowania ryczałtem" 
                                    value={selectedLumpSumValue} 
                                    handleChange={(e) => handleChange(e,setSelectedLumpSumValue)} 
                                    options={lumpSumTax} 
                                    defaultText="Wybierz stawkę opodatkowania"
                    />
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
                    <button className="cta" onClick={submit}>Wyświetl porównanie</button>
                </div>
            </div>
        </section>
    )
}

export default TaxCompare;