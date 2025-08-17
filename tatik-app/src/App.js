import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import tatikImg from './assests/TESTafbeelding.png';
import tatikImg1 from './assests/Tatik.NL.png';
import LoginPage from './pages/LoginPage';
import RegisterForm from "./pages/RegisterForm";

function HomePage() {
  return (
    <div className="App">
      <img src={tatikImg} alt="Tatik" className="TESTafbeelding" />
      <h1>Barev dzez sireli</h1>
      <p>Բարև ձեզ սիրելի</p>
      <div className="language-buttons">
        <Link to="/nederlands">
          <button className="lang-button">
            <div>Նիդերլանդերեն</div>
            <small>Niderlanderēn</small>
          </button>
        </Link>
        <button className="lang-button">
          <div>Իսպաներեն</div>
          <small>Ispanerēn</small>
        </button>
      </div>
    </div>
  );
}

function DutchPage() {
  return (
    <div className="App">
      <Link to="/">
        <button className="lang-button" style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <div>Վերադառնալ գլխավոր էջ</div>
          <small>Veradarnal glkhavor ej</small>
        </button>
      </Link>

      <img src={tatikImg1} alt="Tatik Nederlands" className="TESTafbeelding" />
      <h1>Welkom! Du patrastvats es holanderen sovorelu?</h1>
      <p>Բարի գալուստ! Դու պատրաստվա՞ծ ես հոլանդերեն սովորելու։</p>

      <Link to="/login">
        <button className="lang-button" style={{ marginTop: '20px' }}>
          <div>Գրանցվել</div>
          <small>Mutk’ gortsel</small>
        </button>
      </Link>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // check of er een token is
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nederlands" element={<DutchPage />} />
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/nederlands" /> : <LoginPage setLoggedIn={setLoggedIn} />}
        />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
