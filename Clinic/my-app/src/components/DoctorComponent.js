import React from 'react';
import DoctorService from '../services/DoctorService';
import props from 'prop-types';
import {useHistory, Redirect} from "react-router-dom";

class DoctorComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            doctors:[],
            
        }
    }
    

    componentDidMount(){
        if(window.response!==undefined){
        DoctorService.getDoctors().then((response)=>{
            this.setState({doctors: response.data})
        });
    }
    }
    render(){
        return(

            <div>  
                {window.response===undefined?<Redirect to='/'/>:null}

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