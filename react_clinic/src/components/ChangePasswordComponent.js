import React from 'react';
import props from 'prop-types';
import {useHistory} from "react-router-dom";
import axios from 'axios';
class ChangePasswordComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentPassword:'',
            newPassword:'',
            
        }
    }
    


    handlePressedButton = (event) =>{
        event.preventDefault()

        axios.post('http://localhost:8080/api/auth/changePassword', {"password":this.state.currentPassword, "newPassword":this.state.newPassword})
        .then(response =>{
            console.log(response)
            alert("Pomyślnie zmieniono hasło!")
        })
        .catch(error=>{
            alert("Nie udało się zmienić hasła!")
            console.log(error)
        })
    }
    render(){
        return(

                <>
                <div className="container">
                <div className="col-md-8 m-auto mt-3">
                    <form onSubmit={this.handlePressedButton}>
                        <h1>Zmiana hasła</h1>                 
        
                        <div className="row form-group">
                            <label for="password" className="col-md-4 col-form-label text-md-end">Aktualne hasło:</label>
                            <div className="col-md-6 my-auto">
                                <input className="form-control" value={this.state.currentPassword} onChange={(e)=>this.setState({currentPassword:e.target.value})} type="password" id="password" name="password" />
                            </div>
                        </div>
                            
                        <div className="row form-group mb-3">
                        
                            <label for="newPassword" className="col-md-4 col-form-label text-md-end">Nowe hasło:</label>
                        
                            <div className="col-md-6 my-auto">
                                <input className="form-control" value={this.state.newPassword} onChange={(e)=>this.setState({newPassword:e.target.value})} type="password" id="newPassword" name="newPassword" />
                            </div>
                        </div>
                            
                        <button className="btn btn-outline-light btn-lg" type="submit" >Zmień hasło</button>
                    </form>
                </div>
                    
                
            </div>
                </>
                
        )
    }
}

export default ChangePasswordComponent;