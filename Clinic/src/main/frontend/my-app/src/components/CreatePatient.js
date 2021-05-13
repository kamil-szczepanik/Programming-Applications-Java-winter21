import React from 'react';
import DoctorService from '../services/DoctorService';
import props from 'prop-types';
import {useHistory} from "react-router-dom";
import axios from 'axios';
class CreatePatient extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            doctors:[],
            patient_dob:null,
            patient_firstName:null,
            patient_lastName:null,
            patient_pesel:null,
            patient_age:null,
            
        }
    }
    

    componentDidMount(){
        DoctorService.getDoctors().then((response)=>{
            this.setState({doctors: response.data})
        });
        
    }
    handlePressedButton = (event) =>{
        alert(this.state.patient_dob)
        event.preventDefault()

        axios.post('http://localhost:8080/api/patient/registerNewPatient', {"firstName":this.state.patient_firstName, "lastName":this.state.patient_lastName, "dob":this.state.patient_dob, "pesel":this.state.patient_pesel, "appUserId":"null"})
        .then(response =>{
            console.log(response)
            alert("Pomyślnie dodano pacjenta!")
        })
        .catch(error=>{
            alert("Nie udało się dodać pacjenta!")
            console.log(error)
        })
    }
    render(){
        return(

            <div>
                <form  method="post" id="appointment_form" onSubmit={this.handlePressedButton}>
                    
                    <label htmlFor="firstName">Imie pacjenta</label>
                    <input value={this.state.patient_firstName} onChange={e=>this.setState({patient_firstName:e.target.value})} type="text" id="firstName" name="firstName"/>
                    <br></br>
                    <label htmlFor="lastName">Nazwisko pacjenta</label>
                    <input value={this.state.patient_lastName} onChange={e=>this.setState({patient_lastName:e.target.value})} type="text" id="lastName" name="lastName"/>
                    <br></br>

                    <label htmlFor="pesel">Pesel pacjenta</label>
                    <input value={this.state.patient_pesel} onChange={e=>this.setState({patient_pesel:e.target.value})} type="text" id="pesel" name="pesel"/>
                    <br></br>


                    <label htmlFor="birthday">Data urodzenia:</label>
                    <input type="date" id="birthday" name="birthday" value={this.state.patient_dob} onChange={e=>this.setState({patient_dob:e.target.value})}/>
                    <br></br>



                    <button type='submit'>Dodaj pacjenta</button>
                    
                </form>
               
            </div>
                
        )
    }
}

export default CreatePatient;