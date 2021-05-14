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
            doctors:[],
            
        }
    }

    componentDidMount(){
        if(window.response!==undefined){
            AppointmentService.getAppointments().then((response)=>{
                this.setState({myAppointments: response.data})
            });
            DoctorService.getDoctors().then((response)=>{
                this.setState({doctors: response.data})
            });
    }}
       
    render(){
        var docId=null;
        var docName=null;
        var docSurname=null;
        return(

            <div>
                <h2>Moje wizyty</h2> 
                <br></br> 
                {window.response===undefined?<Redirect to='/'/>:null}

                {
                
                this.state.myAppointments.map(
                appointment=>{
                    this.state.doctors.forEach(
                        doctor=>{
                        if(doctor.id===appointment.doctorId){
                            docId=doctor.id;
                            docName=doctor.firstName;
                            docSurname=doctor.lastName;    
                        }

                    })

                    return (
                    <>
                        <p className = "appointment" key={"doctor"+appointment.id}> Doktor: {docName+" "+docSurname}</p>
                        <p className = "appointment" key={appointment.id+1000}> {appointment.date.toString().slice(0,10)+" "+appointment.date.toString().slice(11,16)}</p>
                        <br></br>
                    </>)

                }
                )
            }
               
            </div>
                
        )
    }
}


export default MyAppointments;