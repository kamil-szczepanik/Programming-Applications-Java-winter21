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
        <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
            <div className="container">
                <div className="navbar-brand js-scroll-trigger"><NavLink to="/">Przychodnia XYZ</NavLink></div>
                <button className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mx-0 mx-lg-1 nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"><NavLink to='/doctors' exact>Doktorzy</NavLink></li>
                        <li className="nav-item mx-0 mx-lg-1 nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"><NavLink to='/login' exact>Logowanie</NavLink></li>
                        <li className="nav-item mx-0 mx-lg-1 nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"><NavLink to='/contact' exact>Kontakt</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
        )
        }

        

}
export default NavigationComponent;