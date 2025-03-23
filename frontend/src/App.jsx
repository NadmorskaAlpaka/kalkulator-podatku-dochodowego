import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./styles/app.css";
import Home from "./pages/Home";
import NoPage from "./components/NoPage";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPasssword from "./pages/ForgotPassword";
// import CompanyPath from "./pages/CompanyPath";
import TaxScale from "./pages/TaxScale";
import LumpSumTax from "./pages/LumpSumTax";
import FlatTax from "./pages/FlatTax";
import ScrollToTop from "./components/ScrollToTop";
import Tax from "./pages/Tax";
import Settings from "./pages/Settings";
import TaxCompare from "./pages/TaxCompare";
import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "taxParameters";

function App() {

  const [taxParameters, setTaxParameters] = useState(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : 
    {
      socialContributions: {
        minSocialContributionBasis: 5203.80,
        uEmerytalnePercentage: 19.52,
        uRentowePercentage: 8,
        uChorobowePercentage: 2.45,
        uWypadkowePercentage: 1.67,
        funduszPracyPercentage: 2.45,
      },
      healthCountributions: {
        mimIncome: 4666,
        avgIncomeLastQuaterPrevYear: 8549.18,
        taxScale: {
          healthCountributionsBasisPercentage: 75,
          valuePercentage: 9,
          minHealthCountributions: 314.96
        },
        flatTax: {
          healthCountributionsBasisPercentage: 75,
          valuePercentage: 4.9,
          minHealthCountributions: 314.96
        },
        lumpSumTax: {
          small:{
            maxIncome: 60000,
            healthCountributionsBasisPercentage: 60,
            valuePercentage: 9,
          },
          medium: {
            maxIncome: 300000,
            healthCountributionsBasisPercentage: 100,
            valuePercentage: 9,
          },
          big: {
            minIncome: 300000,
            healthCountributionsBasisPercentage: 180,
            valuePercentage: 9,
          }
        },
      },
      taxBreaks: {
        internet: {
          maxValue: 760
        },
        children: {
          one: {
            value: 1112.04,
            limit: 56000,
            spousLimit: 112000
          },
          two: 2224.08,
          three: 4224.12,
          four: 6924.12,
        },
        bloodDonation: {
          maxIncomPercentage: 6,
          value: 130
        },
        newTechnology: 50
      },
      danina: {
        valuePercentage: 4,
        minIncome: 1000000
      },
      taxFreeAmout: 30000
    }
  });

  useEffect(() => {
    console.log("TaxParameters",taxParameters);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taxParameters));
  }, [taxParameters]);

  return (
    <>
      {/* <BrowserRouter onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}> */}
      <BrowserRouter >
        <ScrollToTop />
        <Navigation />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/ustawienia" element={<Settings taxParameters={taxParameters} />} />
            {/* <Route path="/logowanie" element={<Login />}/>
            <Route path="/rejestracja" element={<Register />} />
            <Route path="/pracownik" element={""} /> */}
            {/* <Route path="/przedsiebiorca" element={<CompanyPath />} />
            <Route path="/przedsiebiorca/skala-podatkowa" element={<TaxScale />} />
            <Route path="/przedsiebiorca/ryczalt-ewidencjonowany" element={<LumpSumTax />} />
            <Route path="/przedsiebiorca/podatek-liniowy" element={<FlatTax />} />
            <Route path="/przedsiebiorca/porownanie-opodatkowania" element={""} /> */}
            <Route path="/skala-podatkowa" element={<TaxScale />} />
            <Route path="/ryczalt-ewidencjonowany" element={<LumpSumTax />} />
            <Route path="/podatek-liniowy" element={<FlatTax />} />
            <Route path="/porownanie-opodatkowania" element={<TaxCompare />} />
            <Route path="/podatek" element={<Tax />} />
            {/* <Route path="/haslo" element={<ForgotPasssword />} /> */}
            <Route path="*" element={<NoPage />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
