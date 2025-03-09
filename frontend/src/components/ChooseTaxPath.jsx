import React from 'react';
import "../styles/chooseTaxPath.css"
// import BussinesManImg from "../assets/bussines_man.png";
// import Card from './Card';
import PathBody from "../components/PathBody";
import image from "../assets/bussines_man.png";

const taxPaths = [
    {
        title: "Rozliczam się według skali podatkowej",
        imgUrl: image,
        imgAlt: "Skala podatkowa",
        path: "skala-podatkowa",
    },
    {
        title: "Rozliczam się podatkiem liniowym",
        imgUrl: image,
        imgAlt: "Podatek liniowy",
        path: "podatek-liniowy"
    },
    {
        title: "Rozliczam się ryczałtem ewidencjonowanym",
        imgUrl: image,
        imgAlt: "Ryczałt ewidencjonowany",
        path: "ryczalt-ewidencjonowany"
    },
    {
        title: "Porównanie sposobów opodatkowania",
        imgUrl: image,
        imgAlt: "Porównanie opodatkowania",
        path: "porownanie-opodatkowania"
    }
];

const ChooseTaxPath = () => {
    return (
        <section id="choose-tax-path">
            <div className='container'>
                <div className='choose-tax-path__box'>
                    <PathBody cards={taxPaths} header="Wybierz sposób opodatkowania"/>
                </div>
                {/* <h3 className='header'>Rozliczasz się jako?</h3>
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
                </div> */}
            </div>
        </section>
    )
}

export default ChooseTaxPath;