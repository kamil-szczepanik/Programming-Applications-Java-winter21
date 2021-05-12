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
   handlePressedButton(event){
    const axios = require('axios')
    const url='http://localhost:8080/login';
    const params = new URLSearchParams()
    params.append('username', this.state.username)
    params.append('password', this.state.password)

    
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    // we can use .append to add a file
    var bodyData = new FormData();
    bodyData.append('username', this.state.username);
    bodyData.append('password', this.state.password);

    axios({
    method: 'post', // Declare the method
    url: 'http://localhost:8080/login',
    
    data: bodyData,
    config: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      } // declare the kind of data
    })
    // axios.post(url, params, config)
    // .then(response =>{
    //     console.log(response)
    //     alert("Pomyślnie zalogowano!");
    // })
    .catch(error=>{
        alert("Nie udało się zalogować!")
        console.log(error)
    })
   }
   
    render() {
        return(
            <>
                
                <form  method="post" id="login_form" onSubmit={this.handlePressedButton}>
                <div>
                    <label for="username">Email:</label>
                    <input onChange={(e)=>this.setState({username:e.target.value})} type="text" id="username" name="username" required/>
                </div>
                <div>
                    <label for="pass">Password</label>
                    <input onChange={(e)=>this.setState({password:e.target.value})} type="password" id="pass" name="password" required/>
                </div>    
                                    
                    <button type='submit'>Zaloguj się</button>
                    
                </form>
            </>

        )
    }
}

export default LoginForm