import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import axios from 'axios'
import { Redirect } from 'react-router';
import { useHistory, withRouter} from "react-router-dom";
import AuthenticationService from '../services/AuthenticationService';

class LoginForm extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            username:'',
            password:'',            
        }
    }
    handleSubmit = (event) =>{
        const data = new FormData(this.form)

        AuthenticationService.executeBasicAuthenticationService(data.get('username'), data.get('password')).then(()=>{
            this.props.history.push('/')
        
        }).catch(()=>{
        console.log('blad');
        })
        // event.preventDefault()
        // const data = new FormData(this.form)
        
        // this.props.history.push('/homepage');

        // alert(data.get('username'))
        // axios.post('http://localhost:8080/api/auth/signin', {'username':data.get('username'),
        // 'password':data.get('password')})
        // .then(response =>{
        //     this.props.history.push('/');
        //   console.log("1")
        //     alert("Pomyślnie zalogowano!");
            
        // })
        // .catch(error=>{
        //     this.props.history.push('/');


        //     console.log("2")

        //     alert("Nie udało się zalogować!");
        //     console.log(error);

        // });
        // <Redirect push to="http://localhost:3000/" />

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
export default withRouter(LoginForm)