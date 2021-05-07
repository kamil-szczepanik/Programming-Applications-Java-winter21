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
    dateToString(given_date, delay=0){
        var date = new Date();
        date.setDate(given_date.getDate()+delay);
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();

        return yyyy + '-' + mm + '-' + dd;

    }
    

    render(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

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
                <div className="dateInAppointmentCreating">
                        <form>
                            <label htmlFor="1">Data wizyty:</label>
                            <input type="date" id="1234" name="1234" min={this.dateToString(today,2)} max={this.dateToString(today,16)} required/>
                            <input type="time" id="12345"name="12345" min='10:00' max='19:00'  step="0:30"required/>

                        </form>
                    </div>
           </> 
        )
    }
}

export default AddAppointment;