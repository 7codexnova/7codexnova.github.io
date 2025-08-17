import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TatikNL from '../assests/Tatik.NL.png';
import '../App.css'; 

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Voorkomt dat de pagina herlaadt

    try {
      const response = await fetch('http://localhost:5000/login', { // je backend url
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // onthoud dat ze ingelogd zijn
        navigate('/'); // of naar een andere pagina
        console.log('Inloggen succesvol!');
      } else {
        console.error('Inloggen mislukt:', data.message);
      }
    } catch (error) {
      console.error('Er is een fout opgetreden:', error);
    }
  };

  return (
    <div className="App min-h-screen flex flex-col items-center justify-center p-4">
      <Link to="/">
        <button className="lang-button" style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <div>Վերադառնալ գլխավոր էջ</div>
          <small>Veradarnal glkhavor ej</small>
        </button>
      </Link>

      <div className="flex flex-col items-center justify-center">
        <img src={TatikNL} alt="Tatik" style={{ width: '200px', height: 'auto' }} className="mb-8" />
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Inloggen</h2>
          <form className="space-y-4 w-full" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700">Gebruikersnaam</label>
              <input
                type="text"
                placeholder="Voer je gebruikersnaam in"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Wachtwoord</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-xl hover:bg-orange-700 transition"
            >
              Aanmelden
            </button>
          </form>

          {/* Hier komt de knop naar registratie */}
          <Link to="/register" className="mt-4">
            <button className="w-full bg-gray-200 py-2 rounded-xl hover:bg-gray-300 transition">
              Nieuw account maken
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
