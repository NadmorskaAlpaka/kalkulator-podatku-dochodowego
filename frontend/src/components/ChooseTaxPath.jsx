import React from 'react';
import "../styles/chooseTaxPath.css"
import BussinesManImg from "../assets/bussines_man.png";
import Card from './Card';

const ChooseTaxPath = () => {
    return (
        <section id="choose-tax-path">
            <div className='container'>
                <h3 className='header'>Rozliczasz się jako?</h3>
                <div className='choose-tax-path__box'>
                    <Card imgUrl={BussinesManImg}
                          size="big" 
                          imgAlt="Osoba nieprowadząca działalnośći" 
                          title="Osoba nieprowadząca działalnośći" 
                          path="/pracownik" 
                          buttonText="Wybierz"
                    />
                    <Card imgUrl={BussinesManImg}
                          size="big"
                          imgAlt="Osoba prowadząca działalność" 
                          title="Osoba prowadząca działalność" 
                          path="/przedsiebiorca" 
                          buttonText="Wybierz" 
                    />
                </div>
            </div>
        </section>
    )
}

export default ChooseTaxPath;