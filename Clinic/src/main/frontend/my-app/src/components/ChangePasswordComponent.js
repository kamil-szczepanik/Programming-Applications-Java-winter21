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
                <form onSubmit={this.handlePressedButton}>
                    <br></br>
                    <label htmlFor="password">Aktualne hasło</label>
                    <input value={this.state.currentPassword} onChange={(e)=>this.setState({currentPassword:e.target.value})} type="password" id="password" name="password"/>
                    <br></br>

                    <label htmlFor="newPassword">Nowe hasło</label>
                    <input value={this.state.newPassword} onChange={(e)=>this.setState({newPassword:e.target.value})} type="password" id="newPassword" name="newPassword"/>
                    <br></br>


                    <button className="btn btn-success" type="submit">Zmień hasło</button>
                </form>
                </>
                
        )
    }
}

export default ChangePasswordComponent;