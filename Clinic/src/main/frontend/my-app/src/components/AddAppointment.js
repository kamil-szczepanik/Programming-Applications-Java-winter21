import React, { useState } from 'react';
import props from 'prop-types';
import DoctorService from '../services/DoctorService';
import AppointmentService from '../services/AppointmentService';
import axios from 'axios';


class AddAppointment extends React.Component{
    
    

    constructor(props){
        super(props)
        this.state = {
            doctors:[],
            appointments:[],
            appDate:null,
            appDocID:null,
            appPacID:21,

            
        }
    }
    

    componentDidMount(){
        DoctorService.getDoctors().then((response)=>{
            this.setState({doctors: response.data})
        });
        AppointmentService.getAppointments().then((response)=>{
            this.setState({appointments: response.data})
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
    handlePressedButton = (event) =>{
        event.preventDefault()
        var date_String = ""
        date_String+=this.state.appDate + "T" + this.state.appTime + ':00'
        //dodać inne tworzenie z ID wizyty
        axios.post('http://localhost:8080/api/addPatientToAppointment', {"date":date_String, "patient_id":this.state.appPacID, "doctor_id":this.state.appDocID})
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
                <form  method="post" id="appointment_form" onSubmit={this.handlePressedButton}>
                    <div className="doctorsInAppointmentCreating" onChange={this.onChangeValue.bind(this)}>
                    {this.state.doctors.map(doctor=>{
                        return(
                            
                        // <div className="doctorsInAppointmentCreating">
                        //     <input type="radio" id={doctor.id}
                        //     name={doctor.firstName + doctor.lastName} value={doctor.firstName + doctor.lastName}/>
                        //     <label htmlFor={doctor.firstName + doctor.lastName}>{doctor.firstName + doctor.lastName}</label>
                        // </div>
                            <>
                                
                                    <input type="radio" id={doctor.id}
                                    name="doctors" value={doctor.id} on={(e)=>this.doctorIdHandleChange} required/>
                                    <label htmlFor={doctor.firstName + doctor.lastName}>{doctor.firstName + doctor.lastName}</label>
                                
                            </>
                        
                        
                            
                        )
                    })}
                    </div>
                
                    {/* <div className="dateInAppointmentCreating" >
                        
                            <label htmlFor="1">Data wizyty:</label>
                            <input value={this.state.appDate} onChange={(e)=>this.setState({appDate:e.target.value})} type="date" id="1234" min={this.dateToString(today,2)} max={this.dateToString(today,16)} required/>
                    </div> */}
                    <select value={this.state.appDate} name="appointments" id="appointments" onChange={(e)=>this.setState({appTime:e.target.value})}>
                    <label for="appointments">Wybierz termin:</label>
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