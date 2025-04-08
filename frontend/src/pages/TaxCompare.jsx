import React, {useState, useEffect} from "react";
import PathHead from "../components/PathHead";
import TaxInput from "../components/TaxInput";
import ToggleInput from "../components/ToggleInput";
import Checkbox from "../components/Checkbox";
import { useNavigate } from "react-router-dom";

const TaxCompare = ({taxParameters}) => {

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

    },[])

    const validateInputs = () => {
        let error = false;
        let errorMessage = [];

        // if(income <= 0){
        //     errorMessage.push("Przychód musi być większy od zera.");
        //     error = true;
        // }

        setErrorMessage(errorMessage)
        setError(error);
        return error;
    }

    const submit = () => {
        const taxData = {

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
                    <button className="cta" onClick={submit}>Wyświetl porównanie</button>
                </div>
            </div>
        </section>
    )
}

export default TaxCompare;