import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import NoPage from "./components/NoPage";
import "./styles/app.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
