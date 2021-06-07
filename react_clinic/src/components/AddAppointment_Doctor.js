import React, { useState } from 'react';
import props from 'prop-types';
import DoctorService from '../services/DoctorService';
import AppointmentService from '../services/AppointmentService';
import axios from 'axios';
import PatientService from '../services/PatientService';
import CreatePatient from './CreatePatient';
import getInfoAboutLoggedDoctor from '../services/getInfoAboutLoggedDoctor';


class AddAppointment extends React.Component{
    
    

    constructor(props){
        super(props)
        this.state = {
            doctors:[],
            appointments:[],
            patients:[],
            appDate:null,
            appTime:null,
            appDocID:null,
            patient_pesel:null,

            
        }
    }
    

    componentDidMount(){
        if(window.response!==undefined){
        DoctorService.getDoctors().then((response)=>{
            this.setState({doctors: response.data})
        });
        AppointmentService.getAppointments().then((response)=>{
            this.setState({appointments: response.data})
        });
        PatientService.getPatients().then((response)=>{
            this.setState({patients: response.data})
        });
        getInfoAboutLoggedDoctor.getInfo().then((response)=>{
            this.setState({appDocID: response.data.id})
        })
    }
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
        event.preventDefault()
        var date = []
        const USERTOKEN=window.response.accessToken;
        let config = {
            headers:{
                'Authorization': `Bearer ${USERTOKEN}`}
            };
        axios.defaults.headers.common = {'Authorization': `Bearer ${USERTOKEN}`}
        //DOKONCZYC
        var year = parseInt(this.state.appDate.toString().slice(0,4));
        var month = parseInt(this.state.appDate.toString().slice(5,7));
        var day = parseInt(this.state.appDate.toString().slice(8,10));
        var hour = parseInt(this.state.appTime.toString().slice(0,2));
        var minute = parseInt(this.state.appTime.toString().slice(3,5));

        date.push(year,month,day,hour,minute);
        axios.post('http://localhost:8080/api/appointment/registerNewAppointment', {
    "doctorId": this.state.appDocID.toString(),
    "date": [year, month, day, hour, minute]
    }, config)
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

    }
   timeHandleChange(event){
        event.preventDefault();
        this.setState({appTime:event.target.value})

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
            <div className="container">
            <div className="col-md-8 m-auto mt-3">
            <h1 className="mt-5">Dodawanie wizyt</h1>
                <form  method="post" id="appointment_create_doc" onSubmit={this.handlePressedButton}>
                <div className="row form-group">
                <label className="col-md-4 col-form-label text-md-end" for="start">Data:</label>
                <div className="col-md-6 my-auto">
                <input className="form-control text-center" value={this.state.appDate} onChange={e=>this.setState({appDate:e.target.value})} type="date" id="app_date" name="app_date" />
                </div>
                </div>
                <div className="row form-group">
                <label className="col-md-4 col-form-label text-md-end" for="appt">Godzina:</label>
                <div className="col-md-6 my-auto">
                <input className="form-control text-center" value={this.state.appTime}  onChange={e=>this.setState({appTime:e.target.value})} type="time" id="appt" name="appt"
                    min="09:00" max="18:00" required/>
                </div>
                </div>
                    <button className="btn btn-outline-light btn-lg my-3" type='submit'>Dodaj wizytę</button>
                
                </form>
           </div>
           </div> 
        )
    }
}

export default AddAppointment;