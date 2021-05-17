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

                <div className="container mt-3">
                    <h1 className="m-4">Nasza załoga</h1>
                        <div class="row row-cols-1 row-cols-md-3 g-2 g-md-3">
                {window.response===undefined?<Redirect to='/'/>:null}

                {
                this.state.doctors.map(
                doctor=>{
                    
                    return <>
                            <div className="col">
                                <div class="card p-3 h-100 bg-light">

                                    <p className= "text-dark" key={doctor.id}> Imie:{doctor.firstName}<br></br> Nazwisko: {doctor.lastName} <br></br>Specjalizacja: {doctor.specialisation}</p>
                                </div>

                            </div>
                            </>
                }
                )
            }
               </div>
               </div>

                
        )
    }
}

export default DoctorComponent;