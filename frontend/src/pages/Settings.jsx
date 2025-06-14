import React, { useEffect, useState } from "react";
import "../styles/settings.css";
import PathHead from "../components/PathHead";
import { defaultValues } from "../defaultTaxValues";

const Settings = ({taxParameters, reset, localStorageKey, setTaxParameters}) => {

    const initialRates = taxParameters.lumpSumTax;

    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [bad, setBad] = useState(false);

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
    const [minSmallZUSSocialContributionBasis,setMinSmallZUSSocialContributionBasis] = useState(taxParameters.socialContributions.minSmallZUSSocialContributionBasis);
    const [ZUSForStartReliefPeriod,setZUSForStartReliefPeriod] = useState(taxParameters.socialContributions.ZUSForStartReliefPeriod);

    const [employeeEmerytalnePercentage,setEmployeeEmerytalnePercentage] = useState(taxParameters.employeeSocialContributions.uEmerytalnePercentage);
    const [employeeRentowePercentage,setEmployeeRentowePercentage] = useState(taxParameters.employeeSocialContributions.uRentowePercentage);
    const [employeeChorobowePercentage,setEmployeeChorobowePercentage] = useState(taxParameters.employeeSocialContributions.uChorobowePercentage);

    const [minIncome,setMinIncome] = useState(taxParameters.healthContributions.minIncome);
    const [avgIncomeLastQuaterPrevYear,setAvgIncomeLastQuaterPrevYear] = useState(taxParameters.healthContributions.avgIncomeLastQuaterPrevYear);
    const [healtFlatTax,setHealtFlatTax] = useState(taxParameters.healthContributions.flatTax);
    const [healtTaxScale,setHealtTaxScale] = useState(taxParameters.healthContributions.taxScale);
    const [healtLumpSumTaxSmall,setHealtLumpSumTaxSmall] = useState(taxParameters.healthContributions.lumpSumTax.small);
    const [healtLumpSumTaxMedium,setHealtLumpSumTaxMedium] = useState(taxParameters.healthContributions.lumpSumTax.medium);
    const [healtLumpSumTaxBig,setHealtLumpSumTaxBig] = useState(taxParameters.healthContributions.lumpSumTax.big);
    const [lumpSumTaxHealthDeductionLimitPercentage,setLumpSumTaxHealthDeductionLimitPercentage] = useState(taxParameters.healthContributions.lumpSumTax.healthDeductionLimitPercentage)
    
    const [taxBreaksInternet,setTaxBreaksInternet] = useState(taxParameters.taxBreaks.internetMaxValue);
    const [taxBreaksChildrenOne,setTaxBreaksChildrenOne] = useState(taxParameters.taxBreaks.children.one);
    const [taxBreaksChildrenTwo,setTaxBreaksChildrenTwo] = useState(taxParameters.taxBreaks.children.two);
    const [taxBreaksChildrenThree,setTaxBreaksChildrenThree] = useState(taxParameters.taxBreaks.children.three);
    const [taxBreaksChildrenFour,setTaxBreaksChildrenFour] = useState(taxParameters.taxBreaks.children.four);
    const [taxBreaksMoreThanFour,setTaxBreaksMoreThanFour] = useState(taxParameters.taxBreaks.children.moreThanFour);
    const [taxBreaksBloodDonation,setTaxBreaksBloodDonation] = useState(taxParameters.taxBreaks.bloodDonation);
    const [taxBreaksYouth,setTaxBreaksYouth] = useState(taxParameters.taxBreaks.youth);

    const [danina,setDanina] = useState(taxParameters.danina);

    const [taxFreeAmount, setTaxFreeAmount] = useState(taxParameters.taxFreeAmount);

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
        if(ZUSForStartReliefPeriod == 0 || ZUSForStartReliefPeriod > 12){
            setMessage("ZUS na start nie może być mniejszy niż 1 ani większy niż 12");
            setShowMessage(true);
            setBad(true);
            return
        }
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
                minSmallZUSSocialContributionBasis: minSmallZUSSocialContributionBasis,
                ZUSForStartReliefPeriod: ZUSForStartReliefPeriod
            },
            employeeSocialContributions: {
                uEmerytalnePercentage: employeeEmerytalnePercentage,
                uRentowePercentage: employeeRentowePercentage,
                uChorobowePercentage: employeeChorobowePercentage
            },
            healthContributions: {
                minIncome: minIncome,
                avgIncomeLastQuaterPrevYear: avgIncomeLastQuaterPrevYear,
                flatTax: healtFlatTax,
                taxScale: healtTaxScale,
                lumpSumTax: {
                    small: healtLumpSumTaxSmall,
                    medium: healtLumpSumTaxMedium,
                    big: healtLumpSumTaxBig,
                    healthDeductionLimitPercentage: lumpSumTaxHealthDeductionLimitPercentage
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
                youth: taxBreaksYouth
            },
            danina: danina,
            taxFreeAmount: taxFreeAmount
        }
        localStorage.setItem(localStorageKey, JSON.stringify(newValues));
        setTaxParameters(newValues);
        setMessage("Ustawienia zostały zapisane!");
        setShowMessage(true);
        setBad(false)
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
        setMinSmallZUSSocialContributionBasis(defaultValues.socialContributions.minSmallZUSSocialContributionBasis)
        setZUSForStartReliefPeriod(defaultValues.socialContributions.ZUSForStartReliefPeriod)
        setEmployeeEmerytalnePercentage(defaultValues.employeeSocialContributions.uEmerytalnePercentage);
        setEmployeeRentowePercentage(defaultValues.employeeSocialContributions.uRentowePercentage);
        setEmployeeChorobowePercentage(defaultValues.employeeSocialContributions.uChorobowePercentage);
        setMinIncome(defaultValues.healthContributions.minIncome);
        setHealtFlatTax(defaultValues.healthContributions.flatTax);
        setHealtTaxScale(defaultValues.healthContributions.taxScale);
        setAvgIncomeLastQuaterPrevYear(defaultValues.healthContributions.avgIncomeLastQuaterPrevYear);
        setHealtLumpSumTaxSmall(defaultValues.healthContributions.lumpSumTax.small);
        setHealtLumpSumTaxMedium(defaultValues.healthContributions.lumpSumTax.medium);
        setHealtLumpSumTaxBig(defaultValues.healthContributions.lumpSumTax.big);
        setLumpSumTaxHealthDeductionLimitPercentage(defaultValues.healthContributions.lumpSumTax.healthDeductionLimitPercentage)
        setTaxBreaksInternet(defaultValues.taxBreaks.internetMaxValue);
        setTaxBreaksChildrenOne(defaultValues.taxBreaks.children.one);
        setTaxBreaksChildrenTwo(defaultValues.taxBreaks.children.two);
        setTaxBreaksChildrenThree(defaultValues.taxBreaks.children.three);
        setTaxBreaksChildrenFour(defaultValues.taxBreaks.children.four);
        setTaxBreaksMoreThanFour(defaultValues.taxBreaks.children.moreThanFour);
        setTaxBreaksBloodDonation(defaultValues.taxBreaks.bloodDonation);
        setTaxBreaksYouth(defaultValues.taxBreaks.youth);
        setDanina(defaultValues.danina);
        setTaxFreeAmount(defaultValues.taxFreeAmount);
        setMessage("Przywrócono ustawienia domyślne!");
        setShowMessage(true);
        setBad(false)
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
            <div className={`message__box ${showMessage ? 'visible' : ''} ${bad ? "wrong" : "good"}`}>
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
                    <h2 className="settings__category">ZUS na start</h2>
                    <div>
                        <span>Zwolnienie ze składek społecznych przez </span>
                        <input className="settings__input--small" type="number" step="1" min="1" max="12"
                               value={ZUSForStartReliefPeriod}
                               onChange={(e) => setZUSForStartReliefPeriod(parseFloat(e.target.value) || 0)}
                        />
                        <span> miesięcy</span>
                    </div>
                    <h2 className="settings__category">Mały ZUS</h2>
                    <div>
                        <span>Minimalna podstawa wymiaru składek w Małym ZUS-ie: </span>
                        <input className="settings__input--small" type="number" step="0.01"
                               value={minSmallZUSSocialContributionBasis}
                               onChange={(e) => setMinSmallZUSSocialContributionBasis(parseFloat(e.target.value) || 0)}
                        />
                        <span> zł</span>
                    </div>
                    <h2 className="settings__category">Składka zdrowotna</h2>
                    <div>
                        <span>Minimalne wynagordzenie:</span>
                        <input className="settings__input--small" type="number" step="0.01" 
                               value={minIncome} 
                               onChange={(e) => setMinIncome(parseFloat(e.target.value) || 0)}
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
                            value={healtFlatTax.minHealthContribution}
                            onChange={(e) => setHealtFlatTax(prev => ({
                                ...prev,
                                minHealthContribution: parseFloat(e.target.value) || 0
                            }))}                          
                        />
                        <span>zł</span>
                    </div>
                    <div>
                        Maksymalne odliczenie składki zdrowotnej <input className="settings__input--small" type="number" step="0.01"
                            value={healtFlatTax.healthDeductionLimit}
                            onChange={(e) => setHealtFlatTax(prev => ({
                                ...prev,
                                healthDeductionLimit: parseFloat(e.target.value) || 0
                            }))}   
                        /> zł
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
                            value={healtTaxScale.minHealthContribution}
                            onChange={(e) => setHealtTaxScale(prev => ({
                                ...prev,
                                minHealthContribution: parseFloat(e.target.value) || 0
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
                        /> % z przeciętnego wynagordzenia wynosi {minimalnaPodstawaWymiaruSkladekRyczalt_1}zł. 
                        Wysokość miesięcznej składki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01"
                            value={healtLumpSumTaxSmall.valuePercentage}
                            onChange={(e) => setHealtLumpSumTaxSmall(prev => ({
                                ...prev,
                                valuePercentage: parseFloat(e.target.value) || 0
                           }))}   
                        /> % * {minimalnaPodstawaWymiaruSkladekRyczalt_1} zł wynosi {minLumpSumTaxHealthContribution_1}zł
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
                        /> % przeciętnego wynagordzenia wynosi {minimalnaPodstawaWymiaruSkladekRyczalt_2}zł. 
                        Wysokość miesięcznej składki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01"
                            value={healtLumpSumTaxSmall.valuePercentage} 
                            onChange={(e) => setHealtLumpSumTaxMedium(prev => ({
                                ...prev,
                                valuePercentage: parseFloat(e.target.value) || 0
                           }))}                           
                        /> % * {minimalnaPodstawaWymiaruSkladekRyczalt_2}zł wynosi {minLumpSumTaxHealthContribution_2}zł
                    </div>
                    <div>
                        Roczny przychód od {healtLumpSumTaxMedium.maxIncome}
                        zł Podstawa naliczenia stawki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01"
                            value={healtLumpSumTaxBig.basisPercentage}
                            onChange={(e) => setHealtLumpSumTaxBig(prev => ({
                                 ...prev,
                                 basisPercentage: parseFloat(e.target.value) || 0
                            }))}   
                        /> % przeciętnego wynagordzenia wynosi {minimalnaPodstawaWymiaruSkladekRyczalt_3}zł. 
                        Wysokość miesięcznej składki zdrowotnej 
                        <input className="settings__input--small" type="number" step="0.01"
                            value={healtLumpSumTaxBig.valuePercentage} 
                            onChange={(e) => setHealtLumpSumTaxBig(prev => ({
                                ...prev,
                                valuePercentage: parseFloat(e.target.value) || 0
                           }))}  
                        /> % * {minimalnaPodstawaWymiaruSkladekRyczalt_3}zł wynosi {minLumpSumTaxHealthContribution_3}zł
                    </div>
                    <div>
                        Maksymalne odliczenie składki zdrowotnej <input className="settings__input--small" type="number" step="0.01"
                            value={lumpSumTaxHealthDeductionLimitPercentage}
                            onChange={(e) => setLumpSumTaxHealthDeductionLimitPercentage(parseFloat(e.target.value) || 0)}
                        /> %
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
                            value={taxScale.lowerRatePercentage}
                            onChange={(e) => setTaxScale(prev => ({
                                ...prev,
                                lowerRatePercentage: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span>%</span>
                    </div>
                    <div>
                        <span>Drugi próg: Dochód od {taxScale.incomeThreshold}</span>
                        <span> zł, stawka </span>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={taxScale.higherRatePercentage}
                            onChange={(e) => setTaxScale(prev => ({
                                ...prev,
                                higherRatePercentage: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span>% od nadwyżki</span>
                    </div>
                    <div>
                        <span>Miesięczne koszty uzyskania przychodu pracownika:</span>
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
                        <span>Miesięczna kwota zmniejszająca podatek:</span>
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
                                value: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span>zł za 1 litr krwi. Nie więcej niż </span>
                        <input className="settings__input--small" type="number" step="0.01"
                            value={taxBreaksBloodDonation.maxIncomePercentage}
                            onChange={(e) => setTaxBreaksBloodDonation(prev => ({
                                ...prev,
                                maxIncomePercentage: parseFloat(e.target.value) || 0
                            }))}
                        />
                        <span>% dochodu</span>
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
                            value={taxFreeAmount}
                            onChange={(e) => setTaxFreeAmount(parseFloat(e.target.value) || 0)}
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