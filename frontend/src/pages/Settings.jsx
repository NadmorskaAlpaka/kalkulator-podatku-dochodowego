import React, { useEffect, useState } from "react";
import "../styles/settings.css";
import PathHead from "../components/PathHead";
import { defaultValues } from "../defaultTaxValues";

const Settings = ({taxParameters, reset, localStorageKey, setTaxParameters}) => {

    const initialRates = taxParameters.lumpSumTax;

    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const [flatTax, setFlatTax] = useState(taxParameters.flatTax);
    const [taxScale, setTaxScale] = useState(taxParameters.taxScale);
    const [rates, setRates] = useState(initialRates);
    const [newRate, setNewRate] = useState('');
    const [error, setError] = useState('');

    const [minSocialContributionBasis,setMinSocialContributionBasis] = useState(taxParameters.socialContributions.minSocialContributionBasis);
    const [uEmerytalnePercentage,setUEmerytalnePercentage] = useState(taxParameters.socialContributions.uEmerytalnePercentage);
    const [uRentowePercentage,setURentowePercentage] = useState(taxParameters.socialContributions.uRentowePercentage);
    const [uChorobowePercentage,setUChorobowePercentage] = useState(taxParameters.socialContributions.uChorobowePercentage);
    const [uWypadkowePercentage,setUWypadkowePercentage] = useState(taxParameters.socialContributions.uWypadkowePercentage);
    const [funduszPracyPercentage,setFunduszPracyPercentage] = useState(taxParameters.socialContributions.funduszPracyPercentage);

    const [employeeEmerytalnePercentage,setEmployeeEmerytalnePercentage] = useState(taxParameters.employeeSocialContributions.uEmerytalnePercentage);
    const [employeeRentowePercentage,setEmployeeRentowePercentage] = useState(taxParameters.employeeSocialContributions.uRentowePercentage);
    const [employeeChorobowePercentage,setEmployeeChorobowePercentage] = useState(taxParameters.employeeSocialContributions.uChorobowePercentage);

    const [mimIncome,setMimIncome] = useState(taxParameters.healthCountributions.mimIncome);
    const [avgIncomeLastQuaterPrevYear,setAvgIncomeLastQuaterPrevYear] = useState(taxParameters.healthCountributions.avgIncomeLastQuaterPrevYear);
    const [healtFlatTax,setHealtFlatTax] = useState(taxParameters.healthCountributions.flatTax);
    const [healtTaxScale,setHealtTaxScale] = useState(taxParameters.healthCountributions.taxScale);
    const [healtLumpSumTaxSmall,setHealtLumpSumTaxSmall] = useState(taxParameters.healthCountributions.lumpSumTax.small);
    const [healtLumpSumTaxMedium,setHealtLumpSumTaxMedium] = useState(taxParameters.healthCountributions.lumpSumTax.medium);
    const [healtLumpSumTaxBig,setHealtLumpSumTaxBig] = useState(taxParameters.healthCountributions.lumpSumTax.big);
    
    const [taxBreaksInternet,setTaxBreaksInternet] = useState(taxParameters.taxBreaks.internetMaxValue);
    const [taxBreaksChildrenOne,setTaxBreaksChildrenOne] = useState(taxParameters.taxBreaks.children.one);
    const [taxBreaksChildrenTwo,setTaxBreaksChildrenTwo] = useState(taxParameters.taxBreaks.children.two);
    const [taxBreaksChildrenThree,setTaxBreaksChildrenThree] = useState(taxParameters.taxBreaks.children.three);
    const [taxBreaksChildrenFour,setTaxBreaksChildrenFour] = useState(taxParameters.taxBreaks.children.four);
    const [taxBreaksMoreThanFour,setTaxBreaksMoreThanFour] = useState(taxParameters.taxBreaks.children.moreThanFour);
    const [taxBreaksBloodDonation,setTaxBreaksBloodDonation] = useState(taxParameters.taxBreaks.bloodDonation);
    const [taxBreaksNewTechnologyPercentage,setTaxBreaksNewTechnologyPercentage] = useState(taxParameters.taxBreaks.newTechnologyPercentage);
    const [taxBreaksYouth,setTaxBreaksYouth] = useState(taxParameters.taxBreaks.youth);

    const [danina,setDanina] = useState(taxParameters.danina);

    const [taxFreeAmout, setTaxFreeAmout] = useState(taxParameters.taxFreeAmout);

    let minimalnaPodstawaWymiaruSkladekRyczalt_1 = ((avgIncomeLastQuaterPrevYear * healtLumpSumTaxSmall.basisPercentage) / 100).toFixed(2);
    let minLumpSumTaxHealthContribution_1 = (healtLumpSumTaxSmall.valuePercentage * minimalnaPodstawaWymiaruSkladekRyczalt_1  / 100).toFixed(2);

    let minimalnaPodstawaWymiaruSkladekRyczalt_2 = ((avgIncomeLastQuaterPrevYear * healtLumpSumTaxMedium.basisPercentage) / 100).toFixed(2);
    let minLumpSumTaxHealthContribution_2 = (healtLumpSumTaxMedium.valuePercentage * minimalnaPodstawaWymiaruSkladekRyczalt_2  / 100).toFixed(2);

    let minimalnaPodstawaWymiaruSkladekRyczalt_3 = ((avgIncomeLastQuaterPrevYear * healtLumpSumTaxBig.basisPercentage) / 100).toFixed(2);
    let minLumpSumTaxHealthContribution_3 = (healtLumpSumTaxBig.valuePercentage * minimalnaPodstawaWymiaruSkladekRyczalt_3  / 100).toFixed(2);

    const addRate = () => {
        if (!newRate) {
            setError('Proszę podać stawkę');
            return;
        }
        
        const rateValue = parseFloat(newRate);
        if (isNaN(rateValue)) {
            setError('Stawka musi być liczbą');
            return;
        }
        
        if (rates.includes(rateValue)) {
            setError('Ta stawka już istnieje');
            return;
        }

        if(rateValue < 0){
            setError('Stawka nie może być mniejsza od zera');
            return;
        }
        
        setRates([...rates, rateValue].sort((a, b) => a - b));
        setNewRate('');
        setError('');
    };

    const removeRate = (rateToRemove) => {
        setRates(rates.filter(rate => rate !== rateToRemove));
    };

    const resetRates = () => {
        setRates(initialRates);
    };

    const saveChanges = () => {
        let newValues = {
            flatTax: flatTax,
            taxScale: taxScale,
            lumpSumTax: rates,
            socialContributions: {
                minSocialContributionBasis: minSocialContributionBasis,
                uEmerytalnePercentage: uEmerytalnePercentage,
                uRentowePercentage: uRentowePercentage,
                uChorobowePercentage: uChorobowePercentage,
                uWypadkowePercentage: uWypadkowePercentage,
                funduszPracyPercentage: funduszPracyPercentage,
            },
            employeeSocialContributions: {
                uEmerytalnePercentage: employeeEmerytalnePercentage,
                uRentowePercentage: employeeRentowePercentage,
                uChorobowePercentage: employeeChorobowePercentage
            },
            healthCountributions: {
                mimIncome: mimIncome,
                avgIncomeLastQuaterPrevYear: avgIncomeLastQuaterPrevYear,
                flatTax: healtFlatTax,
                taxScale: healtTaxScale,
                lumpSumTax: {
                    small: healtLumpSumTaxSmall,
                    medium: healtLumpSumTaxMedium,
                    big: healtLumpSumTaxBig
                },
            },
            taxBreaks: {
                internetMaxValue: taxBreaksInternet,
                children: {
                    one: taxBreaksChildrenOne,
                    two: taxBreaksChildrenTwo,
                    three: taxBreaksChildrenThree,
                    four: taxBreaksChildrenFour,
                    moreThanFour: taxBreaksMoreThanFour,
                },
                bloodDonation: taxBreaksBloodDonation,
                newTechnologyPercentage: taxBreaksNewTechnologyPercentage,
                youth: taxBreaksYouth
            },
            danina: danina,
            taxFreeAmout: taxFreeAmout
        }
        localStorage.setItem(localStorageKey, JSON.stringify(newValues));
        setTaxParameters(newValues);
        setMessage("Ustawienia zostały zapisane!");
        setShowMessage(true);
    }

    const setDefaultValues = () => {
        setFlatTax(defaultValues.flatTax);
        setTaxScale(defaultValues.taxScale);
        setRates(defaultValues.lumpSumTax);
        setMinSocialContributionBasis(defaultValues.socialContributions.minSocialContributionBasis);
        setUEmerytalnePercentage(defaultValues.socialContributions.uEmerytalnePercentage);
        setURentowePercentage(defaultValues.socialContributions.uRentowePercentage);
        setUChorobowePercentage(defaultValues.socialContributions.uChorobowePercentage);
        setUWypadkowePercentage(defaultValues.socialContributions.uWypadkowePercentage);
        setFunduszPracyPercentage(defaultValues.socialContributions.funduszPracyPercentage);
        setEmployeeEmerytalnePercentage(defaultValues.employeeSocialContributions.uEmerytalnePercentage);
        setEmployeeRentowePercentage(defaultValues.employeeSocialContributions.uRentowePercentage);
        setEmployeeChorobowePercentage(defaultValues.employeeSocialContributions.uChorobowePercentage);
        setMimIncome(defaultValues.healthCountributions.mimIncome);
        setHealtFlatTax(defaultValues.healthCountributions.flatTax);
        setHealtTaxScale(defaultValues.healthCountributions.taxScale);
        setAvgIncomeLastQuaterPrevYear(defaultValues.healthCountributions.avgIncomeLastQuaterPrevYear);
        setHealtLumpSumTaxSmall(defaultValues.healthCountributions.lumpSumTax.small);
        setHealtLumpSumTaxMedium(defaultValues.healthCountributions.lumpSumTax.medium);
        setHealtLumpSumTaxBig(defaultValues.healthCountributions.lumpSumTax.big);
        setTaxBreaksInternet(defaultValues.taxBreaks.internetMaxValue);
        setTaxBreaksChildrenOne(defaultValues.taxBreaks.children.one);
        setTaxBreaksChildrenTwo(defaultValues.taxBreaks.children.two);
        setTaxBreaksChildrenThree(defaultValues.taxBreaks.children.three);
        setTaxBreaksChildrenFour(defaultValues.taxBreaks.children.four);
        setTaxBreaksMoreThanFour(defaultValues.taxBreaks.children.moreThanFour);
        setTaxBreaksBloodDonation(defaultValues.taxBreaks.bloodDonation);
        setTaxBreaksNewTechnologyPercentage(defaultValues.taxBreaks.newTechnologyPercentage);
        setTaxBreaksYouth(defaultValues.taxBreaks.youth);
        setDanina(defaultValues.danina);
        setTaxFreeAmout(defaultValues.taxFreeAmout);
        setMessage("Przywrócono ustawienia domyślne!");
        setShowMessage(true);
    }

    useEffect(() => {
    if (showMessage) {
        const timer = setTimeout(() => {
        setShowMessage(false);
        }, 3000);
        return () => clearTimeout(timer);
    }
    }, [showMessage]);
        
    return (
        <section id="settings">
            <div className={`message__box ${showMessage ? 'visible' : ''}`}>
                <p className="message">{message}</p>
            </div>
            <div className="container">
                <PathHead title="Ustawienia"
                          text="Dostosuj parametry obliczeń w prosty sposób. Kliknij w liczbę aby ją edytować."   />
                <div className="settings__box">
                    <h2 className="settings__category">Parametry składek ubezpieczenia społecznego</h2>
                    <h3>W przypadku działalności gospodarczej</h3>
                    <div>
                        <span>Minimalna podstawa wymiaru składek na ubezpieczenia społeczne:</span>
                        <input className="settings__input" type="number" step="0.01"
                               value={minSocialContributionBasis} 
                               onChange={(e) => setMinSocialContributionBasis(parseFloat(e.target.value) || 0)}
                        />
                        <span>zł</span>
                    </div>
                    <div>
                        <span>Składka na ubezpieczenie emerytalne:</span>
                        <input className="settings__input--small" type="number" step="0.01"
                               value={uEmerytalnePercentage}
                               onChange={(e) => setUEmerytalnePercentage(parseFloat(e.target.value) || 0)}
                        />
                        <span>% podstawy wymiaru</span>
                    </div>
                    <div>
                        <span>Składka na ubezpieczenia rentowe:</span>
                        <input className="settings__input--small" type="number" step="0.01"
                               value={uRentowePercentage}
                               onChange={(e) => setURentowePercentage(parseFloat(e.target.value) || 0)}
                        />
                        <span>% podstawy wymiaru</span>
                    </div>
                    <div>
                        <span>Składka na ubezpieczenie wypadkowe:</span>
                        <input className="settings__input--small" type="number" step="0.01"
                               value={uWypadkowePercentage}
                               onChange={(e) => setUWypadkowePercentage(parseFloat(e.target.value) || 0)}
                        />
                        <span>% podstawy wymiaru</span>
                    </div>
                    <div>
                        <span>Składka na ubezpieczenie chorobowe:</span>
                        <input className="settings__input--small" type="number" step="0.01"
                               value={uChorobowePercentage}
                               onChange={(e) => setUChorobowePercentage(parseFloat(e.target.value) || 0)}
                        />
                        <span>% podstawy wymiaru</span>
                    </div>
                    <div>
                        <span>Składka na Fundusz Pracy:</span>
                        <input className="settings__input--small" type="number" step="0.01"
                               value={funduszPracyPercentage}
                               onChange={(e) => setFunduszPracyPercentage(parseFloat(e.target.value) || 0)}
                        />
                        <span>% podstawy wymiaru</span>
                    </div>
                    <h3>W przypadku pracownika</h3>
                    <div>
                        <span>Składka na ubezpieczenie emerytalne:</span>
                        <input className="settings__input--small" type="number" step="0.01"
                               value={employeeEmerytalnePercentage}
                               onChange={(e) => setEmployeeEmerytalnePercentage(parseFloat(e.target.value) || 0)}
                        />
                        <span>% wynagrodzenia brutto</span>
                    </div>
                    <div>
                        <span>Składka na ubezpieczenia rentowe:</span>
                        <input className="settings__input--small" type="number" step="0.01"
                               value={employeeRentowePercentage}
                               onChange={(e) => setEmployeeRentowePercentage(parseFloat(e.target.value) || 0)}
                        />
                        <span>% wynagrodzenia brutto</span>
                    </div>
                    <div>
                        <span>Składka na ubezpieczenie chorobowe:</span>
                        <input className="settings__input--small" type="number" step="0.01"
                               value={employeeChorobowePercentage}
                               onChange={(e) => setEmployeeChorobowePercentage(parseFloat(e.target.value) || 0)}
                        />
                        <span>% wynagrodzenia brutto</span>
                    </div>
                    <h2 className="settings__category">Składka zdrowotna</h2>
                    <div>
                        <span>Minimalne wynagordzenie:</span>
                        <input className="settings__input--small" type="number" step="0.01" 
                               value={mimIncome} 
                               onChange={(e) => setMimIncome(parseFloat(e.target.value) || 0)}
                        />
                        <span>zł</span>
                    </div>
                    <h3>w podatku liniowym</h3>
                    <div>
                        <input className="settings__input--small" type="number" step="0.01" 
                            value={healtFlatTax.valuePercentage}
                            onChange={(e) => setHealtFlatTax(prev => ({
                                ...prev,
                                valuePercentage: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span> % dochodu, minimalna miesięczna składka wynosi</span>
                        <input className="settings__input" type="number" step="0.01" 
                            value={healtFlatTax.minHealthCountributions}
                            onChange={(e) => setHealtFlatTax(prev => ({
                                ...prev,
                                minHealthCountributions: parseFloat(e.target.value) || 0
                            }))}                          
                        />
                        <span>zł</span>
                    </div>
                    <h3>w skali podatkowej</h3>
                    <div>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={healtTaxScale.valuePercentage}
                            onChange={(e) => setHealtTaxScale(prev => ({
                                ...prev,
                                valuePercentage: parseFloat(e.target.value) || 0
                            }))}                              
                        />
                        <span> % dochodu, minimalna miesięczna składka wynosi</span>
                        <input className="settings__input" type="number" step="0.01"
                            value={healtTaxScale.minHealthCountributions}
                            onChange={(e) => setHealtTaxScale(prev => ({
                                ...prev,
                                minHealthCountributions: parseFloat(e.target.value) || 0
                            }))}                             
                        />
                        <span>zł</span>
                    </div>
                    <h3>w ryczałcie</h3>
                    <div>
                        <span>Przeciętne miesięczne wynagrodzenie w sektorze przedsiębiorstw z ostatniego kwartału poprzeniego roku:</span>
                        <input className="settings__input--small" type="number" step="0.01" 
                            value={avgIncomeLastQuaterPrevYear}
                            onChange={(e) => setAvgIncomeLastQuaterPrevYear(parseFloat(e.target.value) || 0)}                                
                        />
                        <span>zł</span>
                    </div>
                    <div>
                        Roczny przychód do 
                        <input className="settings__input" type="number" step="0.01" 
                           value={healtLumpSumTaxSmall.maxIncome}
                           onChange={(e) => setHealtLumpSumTaxSmall(prev => ({
                                ...prev,
                                maxIncome: parseFloat(e.target.value) || 0
                            }))}   
                        /> zł. 
                        Podstawa naliczenia stawki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01" 
                           value={healtLumpSumTaxSmall.basisPercentage}
                           onChange={(e) => setHealtLumpSumTaxSmall(prev => ({
                                ...prev,
                                basisPercentage: parseFloat(e.target.value) || 0
                           }))}  
                        /> % z przeciętnego wynagordzenia wynosi <span className="static-value">{minimalnaPodstawaWymiaruSkladekRyczalt_1}</span>zł. 
                        Wysokość miesięcznej składki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01"
                            value={healtLumpSumTaxSmall.valuePercentage}
                            onChange={(e) => setHealtLumpSumTaxSmall(prev => ({
                                ...prev,
                                valuePercentage: parseFloat(e.target.value) || 0
                           }))}   
                        /> % * <span className="static-value">{minimalnaPodstawaWymiaruSkladekRyczalt_1}</span> zł wynosi <span className="static-value">{minLumpSumTaxHealthContribution_1}</span>zł
                    </div>
                    <div>
                        Roczny przychód do 
                        <input className="settings__input" type="number" step="0.01" 
                            value={healtLumpSumTaxMedium.maxIncome}
                            onChange={(e) => setHealtLumpSumTaxMedium(prev => ({
                                ...prev,
                                maxIncome: parseFloat(e.target.value) || 0
                            }))}  
                        /> zł. 
                        Podstawa naliczenia stawki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01" 
                            value={healtLumpSumTaxMedium.basisPercentage}
                            onChange={(e) => setHealtLumpSumTaxMedium(prev => ({
                                 ...prev,
                                 basisPercentage: parseFloat(e.target.value) || 0
                            }))}  
                        /> % przeciętnego wynagordzenia <span className="static-value">{minimalnaPodstawaWymiaruSkladekRyczalt_2}</span>zł. 
                        Wysokość miesięcznej składki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01"
                            value={healtLumpSumTaxSmall.valuePercentage} 
                            onChange={(e) => setHealtLumpSumTaxMedium(prev => ({
                                ...prev,
                                valuePercentage: parseFloat(e.target.value) || 0
                           }))}                           
                        /> % * <span className="static-value">{minimalnaPodstawaWymiaruSkladekRyczalt_2}</span>zł wynosi <span className="static-value">{minLumpSumTaxHealthContribution_2}</span>zł
                    </div>
                    <div>
                        Roczny przychód od <b className="static-value">{healtLumpSumTaxMedium.maxIncome}</b>
                        zł Podstawa naliczenia stawki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01"
                            value={healtLumpSumTaxBig.basisPercentage}
                            onChange={(e) => setHealtLumpSumTaxBig(prev => ({
                                 ...prev,
                                 basisPercentage: parseFloat(e.target.value) || 0
                            }))}   
                        /> % przeciętnego wynagordzenia <span className="static-value">{minimalnaPodstawaWymiaruSkladekRyczalt_3}</span>zł. 
                        Wysokość miesięcznej składki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01"
                            value={healtLumpSumTaxBig.valuePercentage} 
                            onChange={(e) => setHealtLumpSumTaxBig(prev => ({
                                ...prev,
                                valuePercentage: parseFloat(e.target.value) || 0
                           }))}  
                        /> % * <span className="static-value">{minimalnaPodstawaWymiaruSkladekRyczalt_3}</span>zł wynosi <span className="static-value">{minLumpSumTaxHealthContribution_3}</span>zł
                    </div>
                    <h2 className="settings__category">Skala podatkowa</h2>
                    <div>
                        <span>Pierwszy próg: Dochód do </span>
                        <input className="settings__input" type="number" step="0.01"
                            value={taxScale.incomeThreshold}
                            onChange={(e) => setTaxScale(prev => ({
                                ...prev,
                                incomeThreshold: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span>zł, stawka </span>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={taxScale.firstPercentage}
                            onChange={(e) => setTaxScale(prev => ({
                                ...prev,
                                firstPercentage: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span>%</span>
                    </div>
                    <div>
                        <span>Drugi próg: Dochód od <b className="static-value">{taxScale.incomeThreshold}</b></span>
                        <span> zł, stawka </span>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={taxScale.secondPercentage}
                            onChange={(e) => setTaxScale(prev => ({
                                ...prev,
                                secondPercentage: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span>% od nadwyżki</span>
                    </div>
                    <div>
                        <span>Miesieczne koszty uzyskania przychodu pracownika:</span>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={taxScale.employeeMonthlyCostsOfIncome}
                            onChange={(e) => setTaxScale(prev => ({
                                ...prev,
                                employeeMonthlyCostsOfIncome: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span>zł</span>
                    </div>
                    <div>
                        <span>Miesieczna kwota zmniejszająca podatek:</span>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={taxScale.monthlyTaxReductionAmount}
                            onChange={(e) => setTaxScale(prev => ({
                                ...prev,
                                monthlyTaxReductionAmount: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span>zł</span>
                    </div>
                    <h2 className="settings__category">Podatek liniowy</h2>
                    <div>
                        <span>Jednolita stawka podatkowa </span>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={flatTax}
                            onChange={(e) => setFlatTax(parseFloat(e.target.value) || 0)}
                        />
                        <span>%</span>
                    </div>
                    <h2 className="settings__category">Ryczałt</h2>
                    <div className="ryczalt-configurator">
                    <div className="rates-list">
                        {rates.map((rate, index) => (
                        <div key={index} className="rate-item">
                            <span>{rate}%</span>
                            <button 
                            onClick={() => removeRate(rate)}
                            className="remove-btn"
                            aria-label={`Usuń stawkę ${rate}%`}
                            >
                            ×
                            </button>
                        </div>
                        ))}
                    </div>
                    <div className="rate-controls">
                        <div className="add-rate">
                        <input
                            type="text"
                            value={newRate}
                            onChange={(e) => setNewRate(e.target.value)}
                            placeholder="Nowa stawka (%)"
                        />
                        <button onClick={addRate}>Dodaj stawkę</button>
                        </div>
                        {error && <p className="error">{error}</p>}
                        
                        <button 
                        onClick={resetRates}
                        className="reset-btn"
                        >
                        Przywróć domyślne stawki
                        </button>
                    </div>
                    </div>
                    <h2 className="settings__category">Ulgi podatkowe</h2>
                    <div>
                        <span>Ulga na internet </span>
                        <input type="number" className="settings__input" step="0.01"
                            value={taxBreaksInternet}
                            onChange={(e) => setTaxBreaksInternet(parseFloat(e.target.value) || 0)}
                        />
                        <span>zł (maksymalnie)</span>
                    </div>
                    <div>
                        <p><b>Ulga prorodzinna:</b></p>
                        <ul className="tax-breaks__list">
                            <li>
                                <span>jedno dziecko</span>
                                <input type="number" className="settings__input" step="0.01"
                                    value={taxBreaksChildrenOne.value}
                                    onChange={(e) => setTaxBreaksChildrenOne(prev => ({
                                        ...prev,
                                        value: parseFloat(e.target.value) || 0
                                    }))}
                                />
                                <span>zł rocznie</span>
                            </li>
                            <li>
                                <span>dwójka dzieci</span>
                                <input type="number" className="settings__input" step="0.01"
                                    value={taxBreaksChildrenTwo}
                                    onChange={(e) => setTaxBreaksChildrenTwo(parseFloat(e.target.value) || 0)}
                                />
                                <span>zł rocznie</span>
                            </li>
                            <li>
                                <span>trójka dzieci</span><input type="number" className="settings__input" step="0.01"
                                    value={taxBreaksChildrenThree}
                                    onChange={(e) => setTaxBreaksChildrenThree(parseFloat(e.target.value) || 0)}
                                />
                                <span>zł rocznie</span>
                            </li>
                            <li>
                                <span>czwórka dzieci</span>
                                <input type="number" className="settings__input" step="0.01"
                                    value={taxBreaksChildrenFour}
                                    onChange={(e) => setTaxBreaksChildrenFour(parseFloat(e.target.value) || 0)}
                                />
                                <span>zł rocznie</span>
                            </li>
                            <li>
                                <span>każde kolejne dziecko</span>
                                <input type="number" className="settings__input" step="0.01"
                                    value={taxBreaksMoreThanFour}
                                    onChange={(e) => setTaxBreaksMoreThanFour(parseFloat(e.target.value) || 0)}
                                />
                                <span>zł rocznie</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <span>Ulga dla krwiodawców: </span>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={taxBreaksBloodDonation.value}
                            onChange={(e) => setTaxBreaksBloodDonation(prev => ({
                                ...prev,
                                maxIncomPercentage: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span>zł za 1 litr krwi. Nie więcej niż </span>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={taxBreaksBloodDonation.maxIncomPercentage}
                            onChange={(e) => setTaxBreaksBloodDonation(prev => ({
                                ...prev,
                                maxIncomPercentage: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span>% dochodu</span>
                    </div>
                    <div>
                        <span>Ulga na nowe technologie: </span>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={taxBreaksNewTechnologyPercentage}
                            onChange={(e) => setTaxBreaksNewTechnologyPercentage(parseFloat(e.target.value) || 0)}
                        />
                        <span>% poniesionych wydatków</span>
                    </div>
                    <div>
                        <span>Ulga dla młodych do</span>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={taxBreaksYouth}
                            onChange={(e) => setTaxBreaksYouth(parseFloat(e.target.value) || 0)}
                        />
                        <span>zł przychodu</span>
                    </div>
                    <h2 className="settings__category">Inne</h2>
                    <div>
                        <span>Danina solidarnościowa wynosi</span>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={danina.valuePercentage}
                            onChange={(e) => setDanina(prev => ({
                                ...prev,
                                valuePercentage: parseFloat(e.target.value) || 0
                            }))}
                        /><span>% jeśli dochód przekracza</span>
                        <input className="settings__input" type="number" step="0.01"
                            value={danina.minIncome} 
                            onChange={(e) => setDanina(prev => ({
                                ...prev,
                                minIncome: parseFloat(e.target.value) || 0
                            }))}
                        /><span>zł</span>
                    </div>
                    <div>
                        <span>Kwota wolna od podatku:</span>
                        <input className="settings__input" type="number" step="0.01"
                            value={taxFreeAmout}
                            onChange={(e) => setTaxFreeAmout(parseFloat(e.target.value) || 0)}
                        />
                        <span>zł</span>
                    </div>
                    <div className="settings__buttons--box">
                        <button className="cta" onClick={() => saveChanges()}>Zapisz</button>
                        <button className="cta" onClick={() => {setDefaultValues(),reset()}}>Przywróć wartośći domyślne</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Settings;