import React from 'react';
import props from 'prop-types';
import {useHistory} from "react-router-dom";
import { BrowserRouter, Route,NavLink, Switch } from 'react-router-dom';
import PatientService from '../services/PatientService';

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

    render(){
        return(
            <>
            <nav>
       
                    <ul className="">

                        <li ><NavLink to='/appointments' exact>Moje wizyty</NavLink></li>
                        <li ><NavLink to='/addAppointmentDoctor' exact>Dodaj wizytę</NavLink></li>
                    </ul>
            </nav>
            <section id="patient_information">
            <h1>Informacje o koncie</h1>
            <ul>
                <li>Imie i Nazwisko:{this.state.name + " " + this.state.surname}</li>
                <li>Pesel: {this.state.pesel}</li>
                <li>Data urodzenia:{this.state.dob}</li>
                <li>Wiek:{this.state.age + "lat"}</li>

            </ul>
            <NavLink to="/addAppointmentDoctor">Dodaj wizytę pacjentowi</NavLink>
            </section>

            </>
        )
        }

}


export default MyProfile;