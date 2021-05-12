import React from 'react';
import props from 'prop-types';
import {useHistory} from "react-router-dom";
import AppointmentService from '../services/AppointmentService';
import DoctorService from '../services/DoctorService';
import AddAppointment from './AddAppointment';
import { BrowserRouter, Route,NavLink, Switch } from 'react-router-dom';
import ContactComponent from './ContactComponent'
class MyAppointments extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            appointments:[],
            doctors:[],
            
        }
    }
    
    getDoctorById(id){

    }
    
    componentDidMount(){
        AppointmentService.getAppointments().then((response)=>{
            this.setState({appointments: response.data})
        });
        DoctorService.getDoctors().then((response)=>{
        this.setState({doctors: response.data})
        });

        
        
    }

    render(){

        return(
            <>
                <button><NavLink to='/addAppointment' exact>Zapisz się na wizytę</NavLink></button>
                <br></br><br></br>
                <h1>Moje wizyty</h1>
                <div>
                    {this.state.appointments.map(appointment=>{
                        if (appointment.patient_id===21)return(
                            <> 
                                <br></br>
                                <p>Lekarz:</p>
                                <h3>{this.state.doctors.map(doctor=>{return  doctor.id===appointment.doctor_id?doctor.specialisation + " " + doctor.firstName+" "+doctor.lastName   : null})}
                                </h3>
                                <p>Data wizyty:</p>
                                <h3>{appointment.date.toString().slice(0,10) + " " + appointment.date.toString().slice(11,16)}</h3>
                                
                            </>
                        )
                        
                    })}
                </div>
            </>
        )
    }
}


export default MyAppointments;