import React, { useEffect, useState } from "react";
import "../styles/settings.css";
import PathHead from "../components/PathHead";

const Settings = ({taxParameters}) => {
    console.log("Settings",taxParameters);

    const [socialContributions, setSocialContributions] = useState(taxParameters.socialContributions);
    const [healthCountributions, setHealthCountributions] = useState(taxParameters.healthCountributions);
    const [taxBreaks, setTaxBreaks] = useState(taxParameters.taxBreaks);
    const [taxFreeAmout, setTaxFreeAmout] = useState(taxParameters.taxFreeAmout);
    const [danina, setDanina] = useState(taxParameters.danina);

    useEffect(() => {
        console.log("socialContributions",socialContributions);
        console.log("healthCountributions",healthCountributions);
        console.log("taxBreaks",taxBreaks);
        console.log("taxFreeAmout",taxFreeAmout);
        console.log("danina",danina);
    },[socialContributions,healthCountributions,taxBreaks,taxFreeAmout,danina]);

    return (
        <section id="settings">
            <div className="container">
                <PathHead title="Ustawienia"
                          text="Dostosuj parametry obliczeń w prosty sposób. Kliknij w liczbę aby ją edytować."   />
                <div className="settings__box">
                    <h2 className="settings__category">Parametry składek ubezpieczenia społecznego</h2>
                    <div>
                        <span>Minimalna podstawa wymiaru składek na ubezpieczenia społeczne:</span>
                        <input className="settings__input" type="number" step="0.01" name="minSocialContributionBasis"
                               value={socialContributions.minSocialContributionBasis} 
                               onChange={(e) => setSocialContributions(prev => ({...prev, minSocialContributionBasis: parseFloat(e.target.value)}))}
                        />
                        <span>zł</span>
                    </div>
                    <div>
                        <span>Składka na ubezpieczenie emerytalne:</span>
                        <input className="settings__input--small" type="number" step="0.01" name="uEmerytalne"
                               value={socialContributions.uEmerytalne}
                               onChange={(e) => setSocialContributions(prev => ({...prev, uEmerytalne: parseFloat(e.target.value)}))}
                        />
                        <span>% podstawy wymiaru</span>
                    </div>
                    <div>
                        <span>Składka na ubezpieczenia rentowe:</span>
                        <input className="settings__input--small" type="number" step="0.01" name="uRentowe"
                               value={socialContributions.uRentowe}
                               onChange={(e) => setSocialContributions(prev => ({...prev, uRentowe: parseFloat(e.target.value)}))}
                        />
                        <span>% podstawy wymiaru</span>
                    </div>
                    <div>
                        <span>Składka na ubezpieczenie wypadkowe:</span>
                        <input className="settings__input--small" type="number" step="0.01" name="uWypadkowe"
                               value={socialContributions.uWypadkowe}
                               onChange={(e) => setSocialContributions(prev => ({...prev, uWypadkowe: parseFloat(e.target.value)}))}
                        />
                        <span>% podstawy wymiaru</span>
                    </div>
                    <div>
                        <span>Składka na Fundusz Pracy:</span>
                        <input className="settings__input--small" type="number" step="0.01" name="funduszPracy"
                               value={socialContributions.funduszPracy}
                               onChange={(e) => setSocialContributions(prev => ({...prev, funduszPracy: parseFloat(e.target.value)}))}
                        />
                        <span>% podstawy wymiaru</span>
                    </div>
                    <h2 className="settings__category">Składka zdrowotna</h2>
                    <h3>w podatku liniowym</h3>
                    <div>
                        <input className="settings__input--small" type="number" step="0.01"/><span> % dochodu, minimalna składka wynosi</span><input className="settings__input" type="number" step="0.01"/><span>zł</span>
                    </div>
                    <h3>w skali podatkowej</h3>
                    <div>
                        <input className="settings__input--small" type="number" step="0.01"/><span> % dochodu, minimalna składka wynosi</span><input className="settings__input" type="number" step="0.01"/><span>zł</span>
                    </div>
                    <h3>w ryczałcie</h3>
                    <h2 className="settings__category">Skala podatkowa</h2>
                    <div>
                        <span>Pierwszy próg: Dochód do </span><input className="settings__input" type="number" step="0.01"/><span>zł, stawka </span><input className="settings__input--small" type="number" step="0.01"/><span>%</span>
                    </div>
                    <div>
                        <span>Drugi próg: Dochód od </span><input className="settings__input" type="number" step="0.01"/><span>zł, stawka </span><input className="settings__input--small" type="number" step="0.01"/><span>% od nadwyżki</span>
                    </div>
                    <h2 className="settings__category">Podatek liniowy</h2>
                    <div>
                        <span>Jednolita stawka podatkowa </span><input className="settings__input--small" type="number" step="0.01"/><span>%</span>
                    </div>
                    <h2 className="settings__category">Ulgi podatkowe</h2>
                    <div>
                        <span>Ulga pierwsza </span><input type="number" step="0.01"/>
                    </div>
                    <div>
                        <span>Ulga druga </span><input type="number" step="0.01"/>
                    </div>
                    <div>
                        <span>Ulga trzecia </span><input type="number" step="0.01"/>
                    </div>
                    <h2 className="settings__category">Inne</h2>
                    <div>
                        <span>Danina solidarnościowa wynosi</span><input className="settings__input--small" type="number" step="0.01"/><span>% jeśli dochód przekracza</span><input className="settings__input" type="number" step="0.01"/><span>zł</span>
                    </div>
                    <div>
                        <span>Kwota wolna od podatku:</span><input className="settings__input" type="number" step="0.01"/><span>zł</span>
                    </div>
                    <div className="settings__buttons--box">
                        <button className="cta">Zapisz</button>
                        <button className="cta">Przywróć wartośći domyślne</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Settings;