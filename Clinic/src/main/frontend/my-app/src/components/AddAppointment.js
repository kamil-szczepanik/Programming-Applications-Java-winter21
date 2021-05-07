import React from 'react';
import props from 'prop-types';
import DoctorService from '../services/DoctorService';
import AppointmentService from '../services/AppointmentService';

class AddAppointment extends React.Component{
    
    

    constructor(props){
        super(props)
        this.state = {
            doctors:[],
            appointments:[],
            
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

    render(){
        return(
            <>
                {this.state.doctors.map(doctor=>{
                    return(
                        <>
                            <div className="doctorsInAppointmentCreating">
                                <input type="radio" id={doctor.id}
                                name={doctor.firstName + doctor.lastName} value={doctor.firstName + doctor.lastName}/>
                                <label htmlFor={doctor.firstName + doctor.lastName}>{doctor.firstName + doctor.lastName}</label>
                            </div>
                    
                    
                        </>
                    )
                })}
                {this.state.doctors.map(doctor=>{
                    return(
                    <div className="dateInAppointmentCreating">
                        <form>
                            <label htmlFor={doctor.firstName + doctor.lastName}>Data wizyty:</label>
                            <input type="datetime-local" id={doctor.id} name={doctor.firstName + doctor.lastName}/>
                        </form>
                    </div>
            )
        })}
           </> 
        )
    }
}

export default AddAppointment;