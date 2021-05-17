import React, { Component } from 'react'
import props from 'prop-types';
import { BrowserRouter, Route,NavLink, Switch } from 'react-router-dom';


class NavigationComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            clicked:"doctors",
        }
        this.handleDoctorClick.bind(this);
        this.handleLoginClick.bind(this);
    }
    
    handleDoctorClick(){
        console.log("doctors");
        this.setState((state,props)=>({
            clicked:"doctors"
            
        }));
    }
    handleLoginClick(){
        this.setState((state,props)=>({
            clicked:"login"
        }));
    }
    render(){
        return(
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-0">
            <div class="container-fluid">
                <NavLink to="/" className="navbar-brand" id="brand">Clinic</NavLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ms-auto">
                    <NavLink to="/login" className="nav-link">Zaloguj się</NavLink>

                    <NavLink to="/doctors" className="nav-link">Doktorzy</NavLink>
                    
                    <NavLink to="/myProfile" className="nav-link">Mój profil</NavLink>

                    <NavLink to="/addAppointment" className="nav-link">Dodaj wizytę</NavLink>

                    <NavLink to="/appointments" className="nav-link">Moje wizyty</NavLink>

                </div>
                </div>
            </div>
            </nav>
        )
        }

        

}
export default NavigationComponent;