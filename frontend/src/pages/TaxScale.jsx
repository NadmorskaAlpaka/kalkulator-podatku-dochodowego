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
    const [taxBreaksStatus, setTaxBreaksStatus] = useState({
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
    const [contract, setContract] = useState("");

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

    const handleTaxBreaksStatus = (e) => {
        setTaxBreaksStatus((prev) => ({
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
        console.log(contract);
        console.log("licza dzieci wpisywanie",childrenNumber)
    },[taxWithSpous,availableTaxBreaks,income,costsOfIncome,spouseIncome,taxBreaksStatus, error,childrenNumber,contract])

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

        if(availableTaxBreaks && (!taxBreaksStatus.internet && !taxBreaksStatus.rehabilitation && !taxBreaksStatus.child && ! taxBreaksStatus.bloodDonation && !taxBreaksStatus.newTech && !taxBreaksStatus.youth && !taxBreaksStatus.other)){
            errorMessage.push("Wybierz ulgi podatkowke które Cie dotyczną.");
            error = true;
        }

        if(taxWithSpous && spouseIncome <= 0){
            errorMessage.push("Przychód małżonka musi być większy od zera.");
            error = true;
        }

        if(!bussinesOwner && contract === ""){
            errorMessage.push("Wybierz formę zatrudnienia");
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
            bussinesOwner,
            taxBreaksStatus,
            availableTaxBreaks,
            taxWithSpous,
            spouseIncome,
            internetValue,
            rehabilitationValue,
            contract,
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
                    <div className={`animated-box ${!bussinesOwner ? "open" : "closed"}`}>
                        <div className="tax__contract">
                            <p className="tax-input__label">Wybierz formę zatrudnienia</p>
                            <div>
                                <input type="radio" value="praca" id="praca" name="contract" onChange={e => setContract(e.target.value)}/>
                                <label htmlFor="praca">Umowa o pracę</label>
                            </div>
                            <div>
                                <input type="radio" value="zlecenie" id="zlecenie" name="contract" onChange={e => setContract(e.target.value)}/>
                                <label htmlFor="zlecenie">Umowa zlecenie</label>
                            </div>
                        </div>
                    </div>
                    <TaxInput label={bussinesOwner? "Twoj roczny przychód" : `Twoje roczne wynagrodzenie brutto`} type="number" value={income}
                              handleChange={(e) => handleChange(e,setIncome)} 
                    />
                    <div className={`animated-box ${bussinesOwner ? "open" : "closed"}`}>
                        <TaxInput label="Twoje roczne koszty uzyskania przychodu" type="number" value={costsOfIncome}
                              handleChange={(e) => handleChange(e,setCostsOfIncome)} />
                    </div>
                    <ToggleInput label="Przysługują Ci ulgi podatkowe?" 
                                 handleChange={(e) => handleCheckbox(e,setAvailableTaxBreaks)}
                    />
                    <div className={`animated-box ${availableTaxBreaks ? "open" : "closed"}`}>
                        <p className="tax-scale__breaks">Wybierz ulgi podatkowe:</p>
                        <Checkbox text="Ulga na internet" name="internet" handleChange={(e) => handleTaxBreaksStatus(e)}/>
                        <div className={`animated-box ${taxBreaksStatus.internet ? "open" : "closed"}`}>
                            <TaxInput label="Koszty poniesione na Internet" type="number" value={internetValue}
                                    handleChange={(e) => handleChange(e,setInternetValue)} 
                            />
                        </div>
                        <Checkbox text="Ulga rehabilitacyjna" name="rehabilitation" handleChange={(e) => handleTaxBreaksStatus(e)}/>
                        <div className={`animated-box ${taxBreaksStatus.rehabilitation ? "open" : "closed"}`}>
                            <TaxInput label="Koszty poniesione na rehabilitacje" type="number" value={rehabilitationValue}
                                    handleChange={(e) => handleChange(e,setrehabilitationValue)} 
                            />
                        </div>
                        <Checkbox text="Ulga na dziecko" name="child" handleChange={(e) => handleTaxBreaksStatus(e)}/>
                        <div className={`animated-box ${taxBreaksStatus.child ? "open" : "closed"}`}>
                            <TaxInput label="Ilość dzieci" type="number" value={childrenNumber}
                                    handleChange={(e) => handleChange(e,setChildrenNumber)} 
                            />
                        </div>
                        <Checkbox text="Ulga dla krwiodawców" name="bloodDonation" handleChange={(e) => handleTaxBreaksStatus(e)}/>
                        <div className={`animated-box ${taxBreaksStatus.bloodDonation ? "open" : "closed"}`}>
                            <TaxInput label="Ilość litrów krwi" type="number" value={bloodLiters}
                                    handleChange={(e) => handleChange(e,setBloodLiters)} 
                            />
                        </div>
                        <Checkbox text="Ulga na nowe technologie" name="newTech" handleChange={(e) => handleTaxBreaksStatus(e)}/>
                        <div className={`animated-box ${taxBreaksStatus.newTech ? "open" : "closed"}`}>
                            <TaxInput label="Koszty poniesione na nowe technologie" type="number" value={newTechnologyValue}
                                    handleChange={(e) => handleChange(e,setNewTechnologyValue)} 
                            />
                        </div>
                        <Checkbox text="Ulga dla młodych" name="youth" handleChange={(e) => handleTaxBreaksStatus(e)} disabled={bussinesOwner}/>
                        <Checkbox text="Inna ulga" name="other" handleChange={(e) => handleTaxBreaksStatus(e)}/>
                        <div className={`animated-box ${taxBreaksStatus.other ? "open" : "closed"}`}>
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