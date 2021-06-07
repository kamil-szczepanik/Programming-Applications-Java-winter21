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


        const USERTOKEN = window.response.accessToken;
        let config = {
            headers:{
                'Authorization': `Bearer ${USERTOKEN}`,
                'Access-Control-Allow-Origin':'http://localhost:3000/'}
            }

            axios.post('http://localhost:8080/api/registration/registerDoctorAsAdmin', {"firstName":this.state.firstName,
        "lastName":this.state.lastName,
        "email":this.state.email,
        "doctorSpecialisation":this.state.choosenSpecialisation})
            .then(response =>{
                console.log(response)
                alert("Pomyślnie dodano doktora!")
                this.props.history.push('/myProfile')
            })
            .catch(error=>{
                alert("Nie udało się dodać doktora!")
                this.props.history.push('/myProfile')

                console.log(error)
            })
        
    }
    render(){
        return(
            <div className="container">
                <h1 className = "mt-5">Rejestracja doktora</h1>
                <div className="col-md-8 m-auto mt-3">
                <form onSubmit={this.handleSubmit}>
                    <div className="row form-group">
                    <label htmlFor="fname" className="col-md-4 col-form-label text-md-end">Imie</label>
                    <div className="col-md-6 my-auto">
                    <input className="form-control" value={this.state.firstName} onChange={(e)=>this.setState({firstName:e.target.value})} type="text" id="fname" name="fname"/>
                    </div>
                    </div>
                    <div className="row form-group">
                    <label htmlFor="lname" className="col-md-4 col-form-label text-md-end">Nazwisko</label>
                    <div className="col-md-6 my-auto">
                    <input className="form-control" value={this.state.lastName} onChange={(e)=>this.setState({lastName:e.target.value})} type="text" id="lname" name="lname"/>
                    </div>
                    </div>
                    <div className="row form-group">

                    <label htmlFor="fname" className="col-md-4 col-form-label text-md-end">Email:</label>
                    <div className="col-md-6 my-auto">
                    <input className="form-control" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} type="email" id="email" name="email"/>
                    </div>
                    </div>
                    <div className="row form-group">
                    <label className="col-md-4 col-form-label text-md-end" for="specialisations">Specjalizacja:</label>
                    <div className="col-md-6 my-auto">
                    <select className="form-select" name="specialisations" id="specialisations" onChange={(e)=>this.setState({choosenSpecialisation:e.target.value})}>
                    <option value="">Wybierz specializację</option>

                       {this.state.specialisations.map((specialisation)=>{
                           return(
                               <>
                                  <option value={specialisation}>{specialisation}</option>
                               </>
                           )
                       })}
                    </select>
                    </div>
                    </div>

                    <button className="btn btn-outline-light btn-lg mt-3" type="submit">Zarejestruj</button>
                </form>
                </div>
            </div>
        )
        
    }

        
}


export default DoctorRegisterComponent;