import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import axios from 'axios'
class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',            
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault()
        const data = new FormData(this.form)

        alert(data.get('username'))
        axios.post('http://localhost:8080/api/auth/signin', {'username':data.get('username'),
        'password':data.get('password')})
        .then(response =>{
            console.log("1")
            response.
            alert("Pomyślnie zalogowano!");
        })
        .catch(error=>{
            console.log("2")

            alert("Nie udało się zalogować!")
            console.log(error)
        })
    }
   
    render() {
        return(
            <>
                
                <form  method="post" id="login_form" onSubmit={this.handlePressedButton}>
                <div>
                    <label htmlFor="username">Email:</label>
                    <input onChange={(e)=>this.setState({username:e.target.value})} type="text" id="username" name="username" required/>
                </div>
                <div>
                    <label htmlFor="pass">Password</label>
                    <input onChange={(e)=>this.setState({password:e.target.value})} type="password" id="pass" name="password" required/>
                </div>    
                                    
                    <button type='submit'>Zaloguj się</button>
                    
                </form>
            </>

        )
    }
}

export default LoginForm