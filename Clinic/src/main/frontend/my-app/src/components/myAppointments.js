import React from 'react';
import props from 'prop-types';
import {useHistory} from "react-router-dom";
import AppointmentService from '../services/AppointmentService';

class MyAppointments extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            appointments:[],
            
        }
    }
    

    componentDidMount(){
        AppointmentService.getAppointments().then((response)=>{
            this.setState({appointments: response.data})
        });
    }
    render(){
        return(
            <>
                <h3>Moje wizyty</h3>
                <div>
                    {this.state.appointments.map(appointment=>{
                        if (appointment.patient_id===21)return <p>{appointment.date}</p>;
                    })}
                </div>
            </>
        )
    }
}


export default MyAppointments;