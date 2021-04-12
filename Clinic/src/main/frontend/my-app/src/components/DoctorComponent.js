import React from 'react';
import DoctorService from '../services/DoctorService';
import props from 'prop-types';


class DoctorComponent extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            doctors:[]
        }
    }


    componentDidMount(){
        DoctorService.getDoctors().then((response)=>{
            this.setState({doctors: response.data})
        });
    }
    render(){
        return(
            
            <div>
                {
                this.state.doctors.map(
                doctor=>{

                    return <p className = "doctor" key={doctor.id}> Imie:{doctor.firstName}<br></br> Nazwisko: {doctor.lastName} <br></br>Specjalizacja: {doctor.specialisation}</p>
                    
                }
                )
            }
               
            </div>
                
        )
    }
}

export default DoctorComponent;