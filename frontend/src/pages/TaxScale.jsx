import React, { useEffect, useState } from "react";
import "../styles/taxScale.css";
import PathHead from "../components/PathHead";
import TaxInput from "../components/TaxInput";
import ToggleInput from "../components/ToggleInput";
import Checkbox from "../components/Checkbox";
import { useNavigate } from "react-router-dom";

const TaxScale = ({taxParameters}) => {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState([]);
    const [error, setError] = useState(false);

    const [income, setIncome] = useState(0);
    const [costsOfIncome, setCostsOfIncome] = useState(0);
    const [taxBreaks, setTaxBreaks] = useState({
        internet: false,
        rehabilitation: false,
        child: false,
        bloodDonation: false,
        newTech: false,
        youth: false,
        other: false,
      });
    const [availableTaxBreaks, setAvailableTaxBreaks] = useState(false);
    const [taxWithSpous, setTaxWithSpous] = useState(false);
    const [bussinesOwner, setBussinesOwner] = useState(false);
    const [spouseIncome, setSpouseIncome] = useState(0);

    const [internetValue, setInternetValue] = useState(0);
    const [rehabilitationValue, setrehabilitationValue] = useState(0);
    const [childrenNumber, setChildrenNumber] = useState(0);
    const [bloodLiters, setBloodLiters] = useState(0);
    const [newTechnologyValue, setNewTechnologyValue] = useState(0);
    const [otherTaxBreakValue, setOtherTaxBreakValue] = useState(0);

    const handleCheckbox = (e,setter) => {
        setter(e.target.checked);
    }

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    const handleTaxBreaks = (e) => {
        setTaxBreaks((prev) => ({
          ...prev,
          [e.target.name]: e.target.checked,
        }));
    };

    useEffect(() => {
        // console.log("Twoj roczny przychód brutto:", income);
        // console.log("Twoje roczne koszty uzyskania przychodu", costsOfIncome);
        // console.log("Przysługują Ci ulgi podatkowe?", availableTaxBreaks)
        // console.log("Ulgi podatkowe", taxBreaks)
        // console.log("Rozliczasz się wspólnie z małżonkiem?", taxWithSpous)
        // console.log("Roczny dochód małżonka", spouseIncome);
        // console.log(error);
        console.log("licza dzieci wpisywanie",childrenNumber)
    },[taxWithSpous,availableTaxBreaks,income,costsOfIncome,spouseIncome,taxBreaks, error,childrenNumber])

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
        }

        if(availableTaxBreaks && (!taxBreaks.internet && !taxBreaks.rehabilitation && !taxBreaks.child && ! taxBreaks.bloodDonation && !taxBreaks.newTech && !taxBreaks.youth && !taxBreaks.other)){
            errorMessage.push("Wybierz ulgi podatkowke które Cie dotyczną.");
            error = true;
        }

        if(taxWithSpous && spouseIncome <= 0){
            errorMessage.push("Przychód małżonka musi być większy od zera.");
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
            taxBreaks,
            availableTaxBreaks,
            taxWithSpous,
            spouseIncome,
            internetValue,
            rehabilitationValue,
            childrenNumber: Number(childrenNumber),
            bloodLiters,
            newTechnologyValue,
            otherTaxBreakValue,
        }

        let data = {
            taxType: "skala podatkowa",
            taxData: taxData,
            taxParameters: taxParameters
        }

        const error = validateInputs();

        if(!error){
            navigate("/podatek", {state: data});
        }
    }

    return (
        <section id="tax-scale">
            <div className="container">
                <PathHead title="Rozliczam się według skali podatkowej" 
                          text="Coraz bliżej! Wypełnij poniższe pola i podaj wymagane informacje, abyśmy mogli obliczyć twój podatek."/>
                <div className="tax-scale__box">
                    <ToggleInput label="Prowadzisz działalność gospodarczą?" 
                                 handleChange={(e) => handleCheckbox(e,setBussinesOwner)}
                    />
                    <TaxInput label="Twoj roczny przychód brutto" type="number" value={income}
                              handleChange={(e) => handleChange(e,setIncome)} 
                    />
                    <TaxInput label="Twoje roczne koszty uzyskania przychodu" type="number" value={costsOfIncome}
                              handleChange={(e) => handleChange(e,setCostsOfIncome)} 
                    />
                    <ToggleInput label="Przysługują Ci ulgi podatkowe?" 
                                 handleChange={(e) => handleCheckbox(e,setAvailableTaxBreaks)}
                    />
                    <div className={`animated-box ${availableTaxBreaks ? "open" : "closed"}`}>
                        <p className="tax-scale__breaks">Wybierz ulgi podatkowe:</p>
                        <Checkbox text="Ulga na internet" name="internet" handleChange={(e) => handleTaxBreaks(e)}/>
                        <div className={`animated-box ${taxBreaks.internet ? "open" : "closed"}`}>
                            <TaxInput label="Koszty poniesione na Internet" type="number" value={internetValue}
                                    handleChange={(e) => handleChange(e,setInternetValue)} 
                            />
                        </div>
                        <Checkbox text="Ulga rehabilitacyjna" name="rehabilitation" handleChange={(e) => handleTaxBreaks(e)}/>
                        <div className={`animated-box ${taxBreaks.rehabilitation ? "open" : "closed"}`}>
                            <TaxInput label="Koszty poniesione na rehabilitacje" type="number" value={rehabilitationValue}
                                    handleChange={(e) => handleChange(e,setrehabilitationValue)} 
                            />
                        </div>
                        <Checkbox text="Ulga na dziecko" name="child" handleChange={(e) => handleTaxBreaks(e)}/>
                        <div className={`animated-box ${taxBreaks.child ? "open" : "closed"}`}>
                            <TaxInput label="Ilość dzieci" type="number" value={childrenNumber}
                                    handleChange={(e) => handleChange(e,setChildrenNumber)} 
                            />
                        </div>
                        <Checkbox text="Ulga dla krwiodawców" name="bloodDonation" handleChange={(e) => handleTaxBreaks(e)}/>
                        <div className={`animated-box ${taxBreaks.bloodDonation ? "open" : "closed"}`}>
                            <TaxInput label="Ilość litrów krwi" type="number" value={bloodLiters}
                                    handleChange={(e) => handleChange(e,setBloodLiters)} 
                            />
                        </div>
                        <Checkbox text="Ulga na nowe technologie" name="newTech" handleChange={(e) => handleTaxBreaks(e)}/>
                        <div className={`animated-box ${taxBreaks.newTech ? "open" : "closed"}`}>
                            <TaxInput label="Koszty poniesione na nowe technologie" type="number" value={newTechnologyValue}
                                    handleChange={(e) => handleChange(e,setNewTechnologyValue)} 
                            />
                        </div>
                        <Checkbox text="Ulga dla młodych" name="youth" handleChange={(e) => handleTaxBreaks(e)}/>
                        <Checkbox text="Inna ulga" name="other" handleChange={(e) => handleTaxBreaks(e)}/>
                        <div className={`animated-box ${taxBreaks.other ? "open" : "closed"}`}>
                            <TaxInput label="Kwota innych ulg" type="number" value={otherTaxBreakValue}
                                    handleChange={(e) => handleChange(e,setOtherTaxBreakValue)} 
                            />
                        </div>
                    </div>
                    <ToggleInput label="Rozliczasz się wspólnie z małżonkiem?" 
                                 handleChange={(e) => handleCheckbox(e,setTaxWithSpous)}
                    />
                    <div className={`animated-box ${taxWithSpous ? "open" : "closed"}`}>
                        <TaxInput label="Roczny dochód małżonka" type="number" value={spouseIncome}
                                  handleChange={(e) => handleChange(e,setSpouseIncome)} 
                        />
                    </div>
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

export default TaxScale;