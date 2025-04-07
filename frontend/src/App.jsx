import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { defaultValues } from "./defaultTaxValues";
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

const LOCAL_STORAGE_KEY = "taxParameters";

function App() {

  const [taxParameters, setTaxParameters] = useState(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : defaultValues; 
  });

  // useEffect(() => {
  //   console.log("TaxParameters",taxParameters);
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taxParameters));
  // }, [taxParameters]);

  const reset = () => {
    console.log("Reset App")
    setTaxParameters(defaultValues);
  }

  return (
    <>
      {/* <BrowserRouter onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}> */}
      <BrowserRouter >
        <ScrollToTop />
        <Navigation />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/ustawienia" element={<Settings taxParameters={taxParameters} setTaxParameters={setTaxParameters} reset={reset} localStorageKey={LOCAL_STORAGE_KEY}/>} />
            {/* <Route path="/logowanie" element={<Login />}/>
            <Route path="/rejestracja" element={<Register />} />
            <Route path="/pracownik" element={""} /> */}
            {/* <Route path="/przedsiebiorca" element={<CompanyPath />} />
            <Route path="/przedsiebiorca/skala-podatkowa" element={<TaxScale />} />
            <Route path="/przedsiebiorca/ryczalt-ewidencjonowany" element={<LumpSumTax />} />
            <Route path="/przedsiebiorca/podatek-liniowy" element={<FlatTax />} />
            <Route path="/przedsiebiorca/porownanie-opodatkowania" element={""} /> */}
            <Route path="/skala-podatkowa" element={<TaxScale taxParameters={taxParameters}/>} />
            <Route path="/ryczalt-ewidencjonowany" element={<LumpSumTax taxParameters={taxParameters}/>} />
            <Route path="/podatek-liniowy" element={<FlatTax taxParameters={taxParameters}/>} />
            <Route path="/porownanie-opodatkowania" element={<TaxCompare taxParameters={taxParameters}/>} />
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
