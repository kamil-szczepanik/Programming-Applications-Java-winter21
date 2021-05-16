import React from 'react';
import props from 'prop-types';
import {Redirect, useHistory} from "react-router-dom";
import { BrowserRouter, Route,NavLink, Switch } from 'react-router-dom';
import specialisationService from '../services/specialistionService';
import axios from 'axios';
class DoctorRegisterComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           specialisations:[],
           choosenSpecialisation:'',
           firstName:"",
           lastName:"",
           email:"",
        }
    }

    componentDidMount(){
     
        specialisationService.getSpecialisation().then((response)=>{
            this.setState({specialisations: response.data})
        });
    }
    
    handleSubmit=(event)=>{
        event.preventDefault()

        if(this.state.choosenSpecialisation===""){
            return alert('Wybierz specjalizację');
        }
        alert(this.state.firstName)
        alert(this.state.lastName)
        alert(this.state.email)
        alert(this.state.choosenSpecialisation)

        // const USERTOKEN = window.response.accessToken;
        // let config = {
        //     headers:{
        //         'Authorization': `Bearer ${USERTOKEN}`,
        //         'Access-Control-Allow-Origin':'http://localhost:3000/'}}

        //     axios.post('http://localhost:8080/api/registration/registerDoctorAsAdmin', {"firstName":this.state.choosenAppoitmentId,
        // "lastName":})
        //     .then(response =>{
        //         console.log(response)
        //         alert("Pomyślnie dodano wizytę!")
        //         this.props.history.push('/myProfile')
        //     })
        //     .catch(error=>{
        //         alert("Nie udało się dodać wizyty!")
        //         this.props.history.push('/myProfile')

        //         console.log(error)
        //     })
        
    }
    render(){
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                    <br></br>
                    <label htmlFor="fname">Imie</label>
                    <input value={this.state.firstName} onChange={(e)=>this.setState({firstName:e.target.value})} type="text" id="fname" name="fname"/>
                    <br></br>

                    <label htmlFor="lname">Nazwisko</label>
                    <input value={this.state.lastName} onChange={(e)=>this.setState({lastName:e.target.value})} type="text" id="lname" name="lname"/>
                    <br></br>

                    <label htmlFor="fname">Email:</label>
                    <input value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} type="email" id="email" name="email"/>
                    <br></br>

                    <label for="specialisations">Specjalizacja:</label>
                    <select name="specialisations" id="specialisations" onChange={(e)=>this.setState({choosenSpecialisation:e.target.value})}>
                    <option value="">Wybierz specializację</option>

                       {this.state.specialisations.map((specialisation)=>{
                           return(
                               <>
                                  <option value={specialisation}>{specialisation}</option>
                               </>
                           )
                       })}
                    </select>
                    <br></br>

                    <button className="btn btn-success" type="submit">Zarejestruj</button>
                </form>
            </>
        )
        
    }

        
}


export default DoctorRegisterComponent;