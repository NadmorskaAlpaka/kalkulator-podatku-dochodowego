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

function App() {
  return (
    <>
      {/* <BrowserRouter onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}> */}
      <BrowserRouter >
        <ScrollToTop />
        <Navigation />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/ustawienia" element={""} />
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
            <Route path="/porownanie-opodatkowania" element={""} />
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
