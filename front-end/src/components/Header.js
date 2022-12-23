import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default function Header() {
  const [token] = useState(localStorage.getItem('token'));
  const history = useNavigate();

//   if(token === '' || token === null){
//     history('/');
//   }

  function handleLogout() {
    localStorage.clear();
    window.location.reload(false);
    history('/');
  }

  function handleLogin() {
    history('login');
  }

  function handlePainel() {
    history('painel');
  }

  return (
    <div className="header">
      <AppBar className="menu" position="static">
        <Toolbar>
            <Link to="/" className="menuTitle">
                <h1>Lista de Carros</h1>
            </Link>

            {token ? (  
              <div>
                <button className="menuButton" onClick={handlePainel} type="button">
                  Painel
                </button>
                <button className="menuButton" onClick={handleLogout} type="button">
                    <FiPower size={18} color="#fff" />
                </button>
              </div>
            ) : (
                <button className="menuButton" onClick={handleLogin} type="button">
                    Login
                </button>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
}