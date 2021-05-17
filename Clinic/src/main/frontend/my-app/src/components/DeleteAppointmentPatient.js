

import React, { Component } from 'react';
import MyAppointmentsService from '../services/MyAppointmentsService';
import DoctorService from '../services/DoctorService';
import axios from 'axios';
import { Redirect } from 'react-router';
import AppointmentService from '../services/AppointmentService';
class DeleteAppointmentPatient extends Component {

    constructor(props) {
        super(props)

        this.state = {
            myAppointments:[],
            doctors:[],
            appointments:[],
            choosenAppoitmentId:0,
        }

    }
    submitButtonClicked = (event)=>{
        var USERTOKEN = window.response.accessToken;
        URL = "http://localhost:8080/api/appointment/delete/"+this.state.choosenAppoitmentId;
        let config = {
            headers:{
                'Authorization': `Bearer ${USERTOKEN}`}
            };

        axios.defaults.headers.common = {'Authorization': `Bearer ${USERTOKEN}`}

        var appointmentDate=null;
        var docId=0;
        this.state.appointments.map((appointment)=>{
            if (appointment.id.toString()===this.state.choosenAppoitmentId.toString()){
                appointmentDate=appointment.date;
                docId=appointment.doctorId.toString();
            }
        })
        axios.delete(URL,config).then((response)=>{

            alert("Usunięto wizytę");
            var date = appointmentDate.toString();
        var year = parseInt(date.slice(0,4))
        var month = parseInt(date.slice(5,7))
        var day = parseInt(date.slice(8,10))
        var hour = parseInt(date.slice(11,13))
        var minute = parseInt(date.slice(14,16))

        axios.post('http://localhost:8080/api/appointment/registerNewAppointment', {
        "doctorId": docId.toString(),
        "date": [year, month, day, hour, minute]
    }, config)
        .then(response =>{
            console.log(response)
            this.props.history.push(`/myProfile`);

        })
        .catch(error=>{
            console.log(error)
            this.props.history.push(`/myProfile`);

        })
    
        this.props.history.push(`/myProfile`);
            
        }).catch(error=>{

                    alert("Nie udało się usunąć wizyty!")
                    console.log(error)
         
                });
        this.props.history.push(`/myProfile`)

        

    }
    componentDidMount(){

        MyAppointmentsService.getMyAppointments().then((response)=>{
            this.setState({myAppointments: response.data})
        });
        DoctorService.getDoctors().then((response)=>{
            this.setState({doctors: response.data})
        });
        AppointmentService.getAppointments().then((response)=>{
            this.setState({appointments: response.data})
        });
        }


    

    render(){
        return(
            <div className="container">
                <h1 className="my-4">Usuń wizytę</h1>
            <form method="post" id="deleteAppointment" onSubmit={this.submitButtonClicked}>
            <div className="row justify-content-center my-4 mx-1">
                <div className="col-10 col-md-5">
                    
                <select className="form-select text-center" value={this.state.choosenAppoitmentData} name="appointments" id="appointments" onChange={(e)=>this.setState({choosenAppoitmentId:e.target.value})}>
                    <option value={null}>-----Wybierz Termin-----</option>
                        {this.state.myAppointments.map(appointment=>{
          
                               

                                
                                return(
                                <>
                                    
                                        <option className="text-center" key={appointment.id} value={appointment.id}>{appointment.date}</option>
                                       
                                </>
                            
                            
                                
                            )}
                    )}
                    </select>
                    </div>
                    <div className="col-2 text-start">
                    
                    <button type="submit" className="btn btn-outline-danger"><i class="fa fa-trash btn-outline-danger" aria-hidden="true"></i></button>
                    </div>
            </div>
            </form>
            </div>
        )
    }
}

export default DeleteAppointmentPatient