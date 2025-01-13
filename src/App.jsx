import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Login } from './Login';
import { SzallasList } from './SzallasList';
import { Logout } from './Logout';


export const App = () => {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand">SzallasJWT</div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Bejelentkezés
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/SzallasList"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Szallas Lista
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/Logout"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Kijelentkezés
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SzallasList" element={<SzallasList />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
