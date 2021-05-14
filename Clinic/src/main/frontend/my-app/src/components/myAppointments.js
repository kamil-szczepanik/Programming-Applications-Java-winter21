import React from 'react';
import props from 'prop-types';
import {useHistory, Redirect} from "react-router-dom";
import AppointmentService from '../services/AppointmentService';
import DoctorService from '../services/DoctorService';
import AddAppointment from './AddAppointment';
import { BrowserRouter, Route,NavLink, Switch } from 'react-router-dom';
import ContactComponent from './ContactComponent'
import MyAppointmentsService from '../services/MyAppointmentsService';
class MyAppointments extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            myAppointments:[],
            
        }
    }

    componentDidMount(){
        if(window.response!==undefined){
        MyAppointmentsService.getMyAppointments().then((response)=>{
        this.setState({myAppointments: response.data})})
    }}
       
    render(){

        return(
            <>
                {window.response===undefined?<Redirect to='/'/>:null}
                <button><NavLink to='/addAppointment' exact>Zapisz się na wizytę</NavLink></button>
                <br></br><br></br>
                <h1>Moje wizyty</h1>
                <div>
                    {this.state.myAppointments.map(appointment=>{
                            <> 
                                <br></br>
                                <p>Lekarz:</p>
                                <h3>{this.state.doctors.map(doctor=>{return  doctor.id===appointment.doctor_id?doctor.specialisation + " " + doctor.firstName+" "+doctor.lastName   : null})}
                                </h3>
                                <p>Data wizyty:</p>
                                <h3>{appointment.date.toString().slice(0,10) + " " + appointment.date.toString().slice(11,16)}</h3>
                                
                            </>
                        
                        
                    })}
                </div>
            </>
        )
    }
}


export default MyAppointments;