import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { defaultValues } from "./defaultTaxValues";
import "./styles/app.css";
import Home from "./pages/Home";
import NoPage from "./components/NoPage";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import TaxScale from "./pages/TaxScale";
import LumpSumTax from "./pages/LumpSumTax";
import FlatTax from "./pages/FlatTax";
import ScrollToTop from "./components/ScrollToTop";
import Tax from "./pages/Tax";
import Settings from "./pages/Settings";
import TaxCompare from "./pages/TaxCompare";
import CompanyPath from "./pages/CompanyPath";
import EmployeeTaxScale from "./pages/EmployeeTaxScale";

const LOCAL_STORAGE_KEY = "taxParams";

function App() {

  const [taxParameters, setTaxParameters] = useState(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : defaultValues; 
  });

  useEffect(() => {
        const handleWheel = (e) => {
      const active = document.activeElement;
      if (active && active.type === 'number') {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [])

  useEffect(() => {
    // console.log("TaxParameters",taxParameters);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taxParameters));
  }, [taxParameters]);

  const reset = () => {
    setTaxParameters(defaultValues);
  }

  return (
    <>
      <BrowserRouter >
        <ScrollToTop />
        <Navigation />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/ustawienia" element={<Settings taxParameters={taxParameters} setTaxParameters={setTaxParameters} reset={reset} localStorageKey={LOCAL_STORAGE_KEY}/>} />
            <Route path="/pracownik" element={<EmployeeTaxScale taxParameters={taxParameters} />} />
            <Route path="/przedsiebiorca" element={<CompanyPath taxParameters={taxParameters} />} /> 
            <Route path="/przedsiebiorca/skala-podatkowa" element={<TaxScale taxParameters={taxParameters}/>} />
            <Route path="/przedsiebiorca/ryczalt-ewidencjonowany" element={<LumpSumTax taxParameters={taxParameters}/>} />
            <Route path="/przedsiebiorca/podatek-liniowy" element={<FlatTax taxParameters={taxParameters}/>} />
            <Route path="/przedsiebiorca/porownanie-opodatkowania" element={<TaxCompare taxParameters={taxParameters}/>} />
            <Route path="/podatek" element={<Tax />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
