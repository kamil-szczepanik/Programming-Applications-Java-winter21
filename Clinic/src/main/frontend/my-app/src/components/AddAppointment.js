import React, { useState } from 'react';
import props from 'prop-types';
import DoctorService from '../services/DoctorService';
import AppointmentService from '../services/AppointmentService';
import axios from 'axios';
import {useHistory, Redirect} from "react-router-dom";


class AddAppointment extends React.Component{
    
    

    constructor(props){
        super(props)
        this.state = {
            doctors:[],
            appointments:[],
            appDocID:null,
            choosenAppoitmentId:null,



            
        }
    }
    

    componentDidMount(){
        if(window.response!==undefined){
        DoctorService.getDoctors().then((response)=>{
            this.setState({doctors: response.data})
        });
        AppointmentService.getAppointments().then((response)=>{
            this.setState({appointments: response.data})
        });}
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
        const USERTOKEN = window.response.accessToken;
        let config = {
            headers:{
                'Authorization': `Bearer ${USERTOKEN}`,
                'Access-Control-Allow-Origin':'http://localhost:3000/'}
            };
        if (this.state.choosenAppoitmentId!==null){
            axios.post('http://localhost:8080/api/appointment/addPatientToAppointment', {"id":parseInt(this.state.choosenAppoitmentId)})
            .then(response =>{
                console.log(response)
                alert("Pomyślnie dodano wizytę!")
                this.props.history.push('/myProfile')
            })
            .catch(error=>{
                alert("Nie udało się dodać wizyty!")
                this.props.history.push('/myProfile')

                console.log(error)
            })
        }
        
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
        if(window.response===undefined){
            return(
                <Redirect to='/'/>
                )
        }
        if(window.response.roles[0]==="DOCTOR"){
            return(
                <Redirect to='/addAppointmentDoctor'/>
                )
        }
        if(window.response.roles[0]==="ADMIN"){
            return(
                <Redirect to='/myProfile'/>
                )
        }
        if(window.response.roles[0]==="PATIENT"){
        return(
            <>
                {window.response.roles[0]==="DOCTOR"?<Redirect to='/addAppointmentDoctor'/>:null}

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
                                
                                    <input key={doctor.id} type="radio" id={doctor.id}
                                    name="doctors" value={doctor.id} onChange={(e)=>this.doctorIdHandleChange} required/>
                                    <label htmlFor={doctor.firstName + doctor.lastName}>{doctor.firstName + doctor.lastName}</label>
                                
                            </>
                        
                        
                            
                        )
                    })}
                    </div>
                
                    {/* <div className="dateInAppointmentCreating" >
                        
                            <label htmlFor="1">Data wizyty:</label>
                            <input value={this.state.appDate} onChange={(e)=>this.setState({appDate:e.target.value})} type="date" id="1234" min={this.dateToString(today,2)} max={this.dateToString(today,16)} required/>
                    </div> */}
                    <select value={this.state.appDate} name="appointments" id="appointments" onChange={(e)=>this.setState({choosenAppoitmentId:e.target.value})}>
                    <option value={null}>-----Wybierz Termin-----</option>
                        {this.state.appointments.map(appointment=>{
                            
                            if ( appointment.patientId===null&&parseInt(this.state.appDocID)===appointment.doctorId){
                               

                                
                                return(
                                <>
                                    
                                        <option key={appointment.id} value={appointment.id}>{appointment.date}</option>
                                       
                                </>
                            
                            
                                
                            )}
                        })}
                    </select>
                  


                    <p>{this.state.appTime}</p>
                    <button className="btn btn-success" type='submit'>Dodaj wizytę</button>
                    
                </form>
                
           </> 
        )
    }
}
}

export default AddAppointment;