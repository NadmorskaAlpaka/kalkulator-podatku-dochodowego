import React, { useEffect, useState } from "react";
import "../styles/settings.css";
import PathHead from "../components/PathHead";
import { defaultValues } from "../defaultTaxValues";

const Settings = ({taxParameters, reset, localStorageKey, setTaxParameters}) => {
    console.log("Settings",taxParameters);

    const initialRates = taxParameters.lumpSumTax;

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
                newTechnologyPercentage: taxBreaksNewTechnologyPercentage
            },
            danina: danina,
            taxFreeAmout: taxFreeAmout
        }
        localStorage.setItem(localStorageKey, JSON.stringify(newValues));
        setTaxParameters(newValues);
        console.log("Save",newValues);
    }

    const setDefaultValues = () => {
        console.log("Reset settings")
        setFlatTax(defaultValues.flatTax);
        setTaxScale(defaultValues.taxScale);
        setRates(defaultValues.lumpSumTax);
        setMinSocialContributionBasis(defaultValues.socialContributions.minSocialContributionBasis);
        setUEmerytalnePercentage(defaultValues.socialContributions.uEmerytalnePercentage);
        setURentowePercentage(defaultValues.socialContributions.uRentowePercentage);
        setUChorobowePercentage(defaultValues.socialContributions.uChorobowePercentage);
        setUWypadkowePercentage(defaultValues.socialContributions.uWypadkowePercentage);
        setFunduszPracyPercentage(defaultValues.socialContributions.funduszPracyPercentage);
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
        setDanina(defaultValues.danina);
        setTaxFreeAmout(defaultValues.taxFreeAmout);
    }

//   useEffect(() => {
//     console.log("minSocialContributionBasis",minSocialContributionBasis);
//     console.log("uEmerytalnePercentage",uEmerytalnePercentage);
//     console.log("uRentowePercentage",uRentowePercentage);
//     console.log("uChorobowePercentage",uChorobowePercentage);
//     console.log("uWypadkowePercentage",uWypadkowePercentage);
//     console.log("funduszPracyPercentage",funduszPracyPercentage);
//     console.log("mimIncome",mimIncome);
//     console.log("avgIncomeLastQuaterPrevYear",avgIncomeLastQuaterPrevYear);
//     console.log("healtFlatTax",healtFlatTax);
//     console.log("healtTaxScale",healtTaxScale);
//     console.log("healtLumpSumTaxSmall",healtLumpSumTaxSmall);
//     console.log("healtLumpSumTaxMedium",healtLumpSumTaxMedium);
//     console.log("healtLumpSumTaxBig",healtLumpSumTaxBig);
//     console.log("taxBreaksInternet",taxBreaksInternet);
//     console.log("taxBreaksChildrenOne",taxBreaksChildrenOne);
//     console.log("taxBreaksChildrenTwo",taxBreaksChildrenTwo);
//     console.log("taxBreaksChildrenThree",taxBreaksChildrenThree);
//     console.log("lumpSumTax", lumpSumTax);
//     console.log("taxBreaksChildrenFour",taxBreaksChildrenFour);
//     console.log("taxBreaksMoreThanFour",taxBreaksMoreThanFour);
//     console.log("taxBreaksBloodDonation",taxBreaksBloodDonation);
//     console.log("taxBreaksNewTechnologyPercentage",taxBreaksNewTechnologyPercentage);
//     console.log("danina",danina);
//     console.log("taxFreeAmout",taxFreeAmout);
//     console.log("taxScale",taxScale);
//     console.log("flatTax",flatTax);
//     console.log("lumpSumTax",lumpSumTax);
//     console.log("rates", rates);
// },[minSocialContributionBasis,
//     uEmerytalnePercentage,
//     uRentowePercentage,
//     uChorobowePercentage,
//     uWypadkowePercentage,
//     funduszPracyPercentage,
//     mimIncome,
//     avgIncomeLastQuaterPrevYear,
//     healtTaxScale,
//     healtFlatTax,
//     healtLumpSumTaxSmall,
//     healtLumpSumTaxMedium,
//     healtLumpSumTaxBig,
//     taxBreaksInternet,
//     taxBreaksChildrenOne,
//     taxBreaksChildrenTwo,
//     taxBreaksChildrenThree,
//     taxBreaksChildrenFour,
//     taxBreaksMoreThanFour,
//     taxBreaksBloodDonation,
//     taxBreaksNewTechnologyPercentage,
//     danina,
//     taxFreeAmout,
//     rates]);
        
    return (
        <section id="settings">
            <div className="container">
                <PathHead title="Ustawienia"
                          text="Dostosuj parametry obliczeń w prosty sposób. Kliknij w liczbę aby ją edytować."   />
                <div className="settings__box">
                    <h2 className="settings__category">Parametry składek ubezpieczenia społecznego</h2>
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
                        <span> % dochodu, minimalna składka wynosi</span>
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
                        <span> % dochodu, minimalna składka wynosi</span>
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
                        /> % z przeciętnego wynagordzenia wynosi <b>{minimalnaPodstawaWymiaruSkladekRyczalt_1}</b>zł. 
                        Wysokość miesięcznej składki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01"
                            value={healtLumpSumTaxSmall.valuePercentage}
                            onChange={(e) => setHealtLumpSumTaxSmall(prev => ({
                                ...prev,
                                valuePercentage: parseFloat(e.target.value) || 0
                           }))}   
                        /> % * <b>{minimalnaPodstawaWymiaruSkladekRyczalt_1}</b>zł wynosi <b>{minLumpSumTaxHealthContribution_1}</b>zł
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
                        /> % przeciętnego wynagordzenia <b>{minimalnaPodstawaWymiaruSkladekRyczalt_2}</b>zł. 
                        Wysokość miesięcznej składki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01"
                            value={healtLumpSumTaxSmall.valuePercentage} 
                            onChange={(e) => setHealtLumpSumTaxMedium(prev => ({
                                ...prev,
                                valuePercentage: parseFloat(e.target.value) || 0
                           }))}                           
                        /> % * <b>{minimalnaPodstawaWymiaruSkladekRyczalt_2}</b>zł wynosi <b>{minLumpSumTaxHealthContribution_2}</b>zł
                    </div>
                    <div>
                        Roczny przychód od 
                        <input className="settings__input" type="number" step="0.01" 
                            value={healtLumpSumTaxBig.minIncome}
                            onChange={(e) => setHealtLumpSumTaxBig(prev => ({
                                ...prev,
                                minIncome: parseFloat(e.target.value) || 0
                            }))} 
                        /> zł. 
                        Podstawa naliczenia stawki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01"
                            value={healtLumpSumTaxBig.basisPercentage}
                            onChange={(e) => setHealtLumpSumTaxBig(prev => ({
                                 ...prev,
                                 basisPercentage: parseFloat(e.target.value) || 0
                            }))}   
                        /> % przeciętnego wynagordzenia <b>{minimalnaPodstawaWymiaruSkladekRyczalt_3}</b>zł. 
                        Wysokość miesięcznej składki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01"
                            value={healtLumpSumTaxBig.valuePercentage} 
                            onChange={(e) => setHealtLumpSumTaxBig(prev => ({
                                ...prev,
                                valuePercentage: parseFloat(e.target.value) || 0
                           }))}  
                        /> % * <b>{minimalnaPodstawaWymiaruSkladekRyczalt_3}</b>zł wynosi <b>{minLumpSumTaxHealthContribution_3}</b>zł
                    </div>
                    <h2 className="settings__category">Skala podatkowa</h2>
                    <div>
                        <span>Pierwszy próg: Dochód do </span>
                        <input className="settings__input" type="number" step="0.01"
                            value={taxScale.firstMaxIncome}
                            onChange={(e) => setTaxScale(prev => ({
                                ...prev,
                                firstMaxIncome: parseFloat(e.target.value) || 0
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
                        <span>Drugi próg: Dochód od </span>
                        <input className="settings__input" type="number" step="0.01"
                            value={taxScale.secondMinIncome}
                            onChange={(e) => setTaxScale(prev => ({
                                ...prev,
                                secondMinIncome: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span>zł, stawka </span>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={taxScale.secondPercentage}
                            onChange={(e) => setTaxScale(prev => ({
                                ...prev,
                                secondPercentage: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span>% od nadwyżki</span>
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
                        <ul>
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