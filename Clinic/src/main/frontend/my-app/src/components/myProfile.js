import React from 'react';
import props from 'prop-types';
import {Redirect, useHistory} from "react-router-dom";
import { BrowserRouter, Route,NavLink, Switch } from 'react-router-dom';
import PatientService from '../services/PatientService';
import "./myProfile.css"

class MyProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            //do wpisania tutaj jak bedzie logowanie
            id:21,
            name:"Marek",
            surname:"Sowa",
            dob:"2000-02-02",
            pesel:"11223344569",
            age:15,

            
        }
    }
    handlePressedButton(){
        window.response=undefined;
        alert("Wylogowano pomyślnie");
    }
    render(){
        return(
            
            <div className="container my-md-5">
                {window.response===undefined?<Redirect to='/'/>:null}
                <div className="row">
                    <div className="col-md text-md-end m-auto p-2 p-md-5">
                        <i class="fas fa-user"></i>
                    </div>
                    <div className="col-md-7 text-md-start m-auto py-3">
                        <section id="patient_information">
                            <h1>Informacje o koncie</h1>
                            <ul>
                                <li>Imie i Nazwisko: <span>{this.state.name + " " + this.state.surname}</span></li>
                                <li>Pesel: <span>{this.state.pesel}</span></li>
                                <li>Data urodzenia: <span>{this.state.dob}</span></li>
                                <li>Wiek: <span>{this.state.age + "lat"}</span></li>
                            </ul>
                        </section>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-3 py-2">
                    <NavLink to='/appointments' exact><button type="button" className="btn btn-outline-light btn-lg">Moje wizyty</button></NavLink>
                    </div>
                    <div className="col-md-3 py-2 ">
                    <NavLink to='/addAppointment' exact><button type="button" className="btn btn-outline-light btn-lg">Dodaj wizytę</button></NavLink>
                    </div>
                    <div className="col-md-3 py-2 ">
                    <button type="button" onClick={this.handlePressedButton} className="btn btn-outline-light btn-lg">Wyloguj się</button>
                    </div>
                </div>
            </div>
            // </div>
            
            )
        }
        
}


export default MyProfile;