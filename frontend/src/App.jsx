import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import NoPage from "./components/NoPage";
import "./styles/app.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="*" element={<NoPage />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
