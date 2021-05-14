import React, { useState } from 'react';
import props from 'prop-types';
import DoctorService from '../services/DoctorService';
import AppointmentService from '../services/AppointmentService';
import axios from 'axios';
import PatientService from '../services/PatientService';
import CreatePatient from './CreatePatient';


class AddAppointment extends React.Component{
    
    

    constructor(props){
        super(props)
        this.state = {
            doctors:[],
            appointments:[],
            patients:[],
            appDate:null,
            appTime:null,
            appDocID:1,
            patient_pesel:null,

            
        }
    }
    

    componentDidMount(){
        DoctorService.getDoctors().then((response)=>{
            this.setState({doctors: response.data})
        });
        AppointmentService.getAppointments().then((response)=>{
            this.setState({appointments: response.data})
        });
        PatientService.getPatients().then((response)=>{
            this.setState({patients: response.data})
        });
    }
    dateToString(given_date, delay=0){
        var date = new Date();
        date.setDate(given_date.getDate()+delay);
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();

        return yyyy + '-' + mm + '-' + dd;

    }
    createPatient(){
        
    }
    createPatientIfNeeded(){
        var isPatientCreated = false
        this.patients.map(patient=>{
            if (patient.pesel===this.state.patient_pesel){
                isPatientCreated=true;
            }
        })

        if (isPatientCreated!==true){
            this.createPatient()
        } 

    }
    handlePressedButton = (event) =>{
        this.createPatientIfNeeded()
        event.preventDefault()
        var date_String = ""
        date_String+=this.state.appDate + "T" + this.state.appTime + ':00'
        axios.post('http://localhost:8080/api/appointment', { "patient_id":this.state.appPacID, "doctor_id":this.state.appDocID,"date":date_String,})
        .then(response =>{
            console.log(response)
            alert("Pomyślnie dodano wizytę!")
        })
        .catch(error=>{
            alert("Nie udało się dodać wizyty!")
            console.log(error)
        })
    }

    dateHandleChange(event){
        event.preventDefault();

        this.setState({appDate:event.target.value})
        console.log(this.state.appDate);

    }
   timeHandleChange(event){
        event.preventDefault();
        this.setState({appTime:event.target.value})
        console.log(this.state.appTime);

    }
    
    onChangeValue(event){
        this.setState({appDocID:event.target.value});
    }
    render(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        return(
            <>  
                {/* <p>Jeżeli pacjent nie ma jeszcze konta:</p>
                <CreatePatient/>



                <br></br>
                <br></br>

                <form  method="post" id="appointment_form_doc" onSubmit={this.handlePressedButton}>
                    <label htmlFor="pesel">Pesel pacjenta</label>
                    <input value={this.state.patient_pesel} onChange={e=>this.setState({petient_pesel:e.target.value})} type="text" id="pesel" name="pesel"/>
                    <br></br>
                    <select value={this.state.appDate} name="appointments" id="appointments" onChange={(e)=>this.setState({appTime:e.target.value})}>
                    <label htmlFor="appointments">Wybierz termin:</label>
                    <optgroup label="appointment:">
                        {this.state.appointments.map(appointment=>{

                            if (this.state.appDocID===appointment.doctor_id && appointment.patient_id==="")return(
                                <>
                                    
                                        <option value={appointment.date}>{appointment.date}</option>
                                       
                                </>
                            
                            
                                
                            )
                        })}
                        </optgroup>
                    </select>
                  

                    <p>{this.state.appTime}</p>
                    <button type='submit'>Dodaj wizytę</button>
                    
                </form>
                 */}
                 <form  method="post" id="appointment_create_doc" onSubmit={this.createAppointmentWithoutPatient}>
                    <label htmlFor="pesel">Pesel pacjenta</label>
                    <input value={this.state.patient_pesel} onChange={e=>this.setState({petient_pesel:e.target.value})} type="text" id="pesel" name="pesel"/>
                    <br></br>
                    <select value={this.state.appDate} name="appointments" id="appointments" onChange={(e)=>this.setState({appTime:e.target.value})}>
                    <label htmlFor="appointments">Wybierz termin:</label>
                    <optgroup label="appointment:">
                        {this.state.appointments.map(appointment=>{

                            if (this.state.appDocID===appointment.doctor_id && appointment.patient_id==="")return(
                                <>
                                    
                                        <option value={appointment.date}>{appointment.date}</option>
                                       
                                </>
                            
                            
                                
                            )
                        })}
                        </optgroup>
                    </select>
                  

                    <p>{this.state.appTime}</p>
                    <button type='submit'>Dodaj wizytę</button>
                    
                </form>
           </> 
        )
    }
}

export default AddAppointment;