import React from 'react';
import props from 'prop-types';
import {Redirect, useHistory} from "react-router-dom";
import { BrowserRouter, Route,NavLink, Switch } from 'react-router-dom';
import PatientService from '../services/PatientService';
import "./myProfile.css"
import getInfoAboutLoggedDoctor from '../services/getInfoAboutLoggedDoctor';
import getInfoAboutLoggedPatient from '../services/getInfoAboutLoggedPatient';
class MyProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            //do wpisania tutaj jak bedzie logowanie
            id:null,
            name:null,
            surname:null,
            dob:null,
            pesel:null,
            age:null,
            specialisation:null,

            
        }
    }

    componentDidMount(){
        if(window.response!==undefined){
            if (window.response.roles[0]==="PATIENT"){
                getInfoAboutLoggedPatient.getInfo().then((response)=>{
                    this.setState({id:response.data.id,
                        name:response.data.firstName,
                        surname:response.data.lastName,
                        dob:response.data.dob,
                        pesel:response.data.pesel,
                        age:response.data.age,
                        })
                });
            }
            if(window.response.roles[0]==="DOCTOR"){
                console.log("wykonano dla doktora")
                getInfoAboutLoggedDoctor.getInfo().then((response)=>{
                    this.setState({id:response.data.id,
                        name:response.data.firstName,
                        surname:response.data.lastName,
                        specialisation:response.data.specialisation,
                        })
                });
            }
            

    }}
    handlePressedButton(){
        window.response=undefined;
        alert("Wylogowano pomyślnie");
    }
    render(){
        if(window.response===undefined){
            return(
                <Redirect to='/'/>
                )
        }
        if(window.response.roles[0]==="PATIENT"){
        return(
            
            <div className="container my-md-5">
                
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
                    <NavLink to='/' onClick={this.handlePressedButton} className="btn btn-outline-light btn-lg">Wyloguj się</NavLink>
                    </div>
                </div>
            </div>
            // </div>
            
            )
        }
        if(window.response.roles[0]==="DOCTOR"){
            return(
            
                <div className="container my-md-5">
                    {/* {window.response===undefined?<Redirect to='/'/>:null} */}
                    <div className="row">
                        <div className="col-md text-md-end m-auto p-2 p-md-5">
                            <i class="fas fa-user"></i>
                        </div>
                        <div className="col-md-7 text-md-start m-auto py-3">
                            <section id="patient_information">
                                <h1>Informacje o koncie</h1>
                                <ul>
                                    <li>Imie i Nazwisko: <span>{this.state.name + " " + this.state.surname}</span></li>
                                    <li>Specjalizacja: <span>{this.state.specialisation}</span></li>
                                  
                                </ul>
                            </section>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                    <div class="row row-cols-2 row-cols-md-5 g-3 g-md-2">
                        <div className="col">
                        <NavLink to='/appointments' exact><button type="button" className="btn btn-outline-light btn-lg">Moje wizyty</button></NavLink>
                        </div>
                        <div className="col ">
                        <NavLink to='/addAppointmentDoctor' exact><button type="button" className="btn btn-outline-light btn-lg">Dodaj wizytę</button></NavLink>
                        </div>
                        <div className="col ">
                        <NavLink to='/deleteAppointmentDoctor' exact><button type="button" className="btn btn-outline-light btn-lg">Usuń wizytę</button></NavLink>
                        </div>
                        <div className="col ">
                        <NavLink to='/changePassword' exact><button type="button" className="btn btn-outline-light btn-lg">Zmień hasło</button></NavLink>
                        </div>
                        <div className="col-md-3 py-2 ">
                        <NavLink to='/' onClick={this.handlePressedButton} className="btn btn-outline-light btn-lg">Wyloguj się</NavLink>
                        </div>
                    </div>
                    </div>
                </div>
                // </div>
                
                )
        }
        if(window.response.roles[0]==="ADMIN"){
            return(
            
                <div className="container my-md-5">
                    {/* {window.response===undefined?<Redirect to='/'/>:null} */}
                    <div className="row">
                        <div className="col-md text-md-end m-auto p-2 p-md-5">
                            <i class="fas fa-user"></i>
                        </div>
                        <div className="col-md-7 text-md-start m-auto py-3">
                            <section id="patient_information">
                                <h1>Informacje o koncie</h1>
                                <p>Admin</p>
                            </section>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-3 py-2">
                        </div>
                        <div className="col-md-3 py-2 ">
                        </div>
                        <div className="col-md-3 py-2 ">
                        <NavLink to='/registerDoctor' exact><button type="button" className="btn btn-outline-light btn-lg">Zarejestruj doktora</button></NavLink>
                        </div>
                        <div className="col-md-3 py-2 ">
                        <NavLink to='/' onClick={this.handlePressedButton} className="btn btn-outline-light btn-lg">Wyloguj się</NavLink>
                        </div>
                    </div>
                </div>
                // </div>
                
                )
        }
    }

        
}


export default MyProfile;