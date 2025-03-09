import React, { useEffect, useState } from "react";
import "../styles/taxScale.css";
import PathHead from "../components/PathHead";
import TaxInput from "../components/TaxInput";
import ToggleInput from "../components/ToggleInput";
import Checkbox from "../components/Checkbox";
import { useNavigate } from "react-router-dom";

const TaxScale = () => {

    const navigate = useNavigate();

    const [income, setIncome] = useState(0);
    const [costsOfIncome, setCostsOfIncome] = useState(0);
    const [taxBreaks, setTaxBreaks] = useState({
        internet: false,
        rehabilitation: false,
        child: false,
        bloodDonation: false,
        newTech: false,
        youth: false,
      });
    const [availableTaxBreaks, setAvailableTaxBreaks] = useState(false);
    const [taxWithSpous, setTaxWithSpous] = useState(false);
    const [spouseIncome, setSpouseIncome] = useState(0);

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
        console.log("Twoj roczny przychód brutto:", income);
        console.log("Twoje roczne koszty uzyskania przychodu", costsOfIncome);
        console.log("Przysługują Ci ulgi podatkowe?", availableTaxBreaks)
        console.log("Ulgi podatkowe", taxBreaks)
        console.log("Rozliczasz się wspólnie z małżonkiem?", taxWithSpous)
        console.log("Roczny dochód małżonka", spouseIncome);
    },[taxWithSpous,availableTaxBreaks,income,costsOfIncome,spouseIncome,taxBreaks])

    const validateInputs = () => {
        const data = {
            taxType: "skala podatkowa",
            income,
            costsOfIncome,
            taxBreaks,
            availableTaxBreaks,
            taxWithSpous,
            spouseIncome
        }

        if(income > 0){
            console.log("Sprawdzam dane i przechodzę dalej")
            navigate("/podatek", {state: data});
        }
    }

    return (
        <section id="tax-scale">
            <div className="container">
                <PathHead title="Rozliczam się według skali podatkowej" 
                          text="Coraz bliżej! Wypełnij poniższe pola i podaj wymagane informacje, abyśmy mogli obliczyć twój podatek."/>
                <div className="tax-scale__box">
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
                        <Checkbox text="Ulga rehabilitacyjna" name="rehabilitation" handleChange={(e) => handleTaxBreaks(e)}/>
                        <Checkbox text="Ulga na dziecko" name="child" handleChange={(e) => handleTaxBreaks(e)}/>
                        <Checkbox text="Ulga dla krwiodawców" name="bloodDonation" handleChange={(e) => handleTaxBreaks(e)}/>
                        <Checkbox text="Ulga na nowe technologie" name="newTech" handleChange={(e) => handleTaxBreaks(e)}/>
                        <Checkbox text="Ulga dla młodych" name="youth" handleChange={(e) => handleTaxBreaks(e)}/>
                    </div>
                    <ToggleInput label="Rozliczasz się wspólnie z małżonkiem?" 
                                 handleChange={(e) => handleCheckbox(e,setTaxWithSpous)}
                    />
                    <div className={`animated-box ${taxWithSpous ? "open" : "closed"}`}>
                        <TaxInput label="Roczny dochód małżonka" type="number" value={spouseIncome}
                                  handleChange={(e) => handleChange(e,setSpouseIncome)} 
                        />
                    </div>
                    <button className="cta" onClick={validateInputs}>Oblicz podatek</button>
                </div>
            </div>
        </section>
    )
}

export default TaxScale;