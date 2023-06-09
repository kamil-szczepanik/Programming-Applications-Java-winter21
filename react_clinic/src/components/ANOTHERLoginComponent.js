import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import context from '../components/context/context';
class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            accountID:null,
            email:null,
            roles:null,
            accessToken:null,
            tokenType:null,

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
    getToken(){
        return this.state.getToken;
    }
    loginClicked() {

        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                this.setState({accountID:response.data.id,
                    email:response.data.email,
                    roles:response.data.roles,
                    accessToken:response.data.accessToken,
                    tokenType:response.data.tokenType})
                window.response=response.data;
                alert("Zalogowano pomyślnie")
                
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                window.response.roles[0]==="PATIENT"?this.props.history.push(`/myProfile`):this.props.history.push(`/myProfile`);
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Niepoprawne dane</div>}
                    {this.state.showSuccessMessage && <div>Logowanie się powiodło</div>}
                    {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                    Email: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Hasło: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent