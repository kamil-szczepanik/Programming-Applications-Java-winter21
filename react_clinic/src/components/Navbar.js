import React from 'react';
import { Link, NavLink} from 'react-router-dom';
import './Navbar.css'

function Navi() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-0">
        <div class="container-fluid">
            <NavLink to="/" className="navbar-brand" id="brand">Clinic</NavLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ms-auto">
                <NavLink to="/about" className="nav-link">About</NavLink>
                <NavLink to="/singup" className="nav-link">Sing Up</NavLink>
            </div>
            </div>
        </div>
        </nav>
    )
}

export default Navi;