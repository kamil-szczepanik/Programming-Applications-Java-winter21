

import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import RegistrationForm from '../components/RegistrationForm';


const inputs = [{
    name: "firstName",
    placeholder: "firstName",
    type: "text"
  },{
    name: "lastName",
    placeholder: "lastName",
    type: "text"
  },{
    name: "email",
    placeholder: "email",
    type: "email"
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
    action: '/perform_login',
    inputs: inputs
  }
  
const params = new URLSearchParams(window.location.search)
class RegistrationComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName:'',
            email:'',
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
            .executeBasicAuthenticationService(this.state.firstName,this.state.lastName,this.state.email, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.lastName,this.state.email,this.state.password)

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
                <RegistrationForm {...props} error={params.get('error')} />
            </>
        )
    }
}

export default RegistrationComponent