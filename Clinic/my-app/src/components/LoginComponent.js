

import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import LoginForm from '../components/LoginForm';


const inputs = [{
    name: "username",
    placeholder: "username",
    type: "text"
  },{
    name: "password",
    placeholder: "password",
    type: "password"
  },{
    type: "submit",
    value: "Submit",
    className: "btn" 
  }]
  
const props = {
    name: 'loginForm',
    method: 'POST',
    action: '/login',
    inputs: inputs
  }
  
const params = new URLSearchParams(window.location.search)
class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }
    
    loginClicked() {

       AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)

            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }

    // render() {
    //     return (
    //         <div>
    //             <h1>Login</h1>
    //             <div className="container">
    //                 {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
    //                 {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
    //                 {this.state.showSuccessMessage && <div>Login Sucessful</div>}
    //                 {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
    //                 User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
    //                 Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
    //                 <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
    //             </div>
    //         </div>
    //     )
    // }
    render(){
        return(
            <>
                <LoginForm {...props} error={params.get('error')} />
            </>
        )
    }
}

export default LoginComponent