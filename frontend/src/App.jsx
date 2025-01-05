import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./styles/app.css";
import Home from "./pages/Home";
import NoPage from "./components/NoPage";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/logowanie" element={<Login />}/>
            <Route path="*" element={<NoPage />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
