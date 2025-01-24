import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./styles/app.css";
import Home from "./pages/Home";
import NoPage from "./components/NoPage";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPasssword from "./pages/ForgotPassword";
import CompanyPath from "./pages/CompanyPath";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/logowanie" element={<Login />}/>
            <Route path="/rejestracja" element={<Register />} />
            <Route path="/pracownik" element={""} />
            <Route path="/przedsiebiorca" element={<CompanyPath />} />
            <Route path="/haslo" element={<ForgotPasssword />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
