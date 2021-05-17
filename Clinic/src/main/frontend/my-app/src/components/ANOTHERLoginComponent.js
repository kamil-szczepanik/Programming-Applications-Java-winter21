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
            <div className="container">
                <div className="col-md-8 m-auto mt-3">
                    <form>
                        <h1>Logowanie</h1>
                        {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                        {this.state.hasLoginFailed && <div className="alert alert-warning">Niepoprawne dane</div>}
                        {this.state.showSuccessMessage && <div>Zalogowano pomyślnie</div>}
                        {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
        
                        <div className="row form-group">
                            <label for="username" className="col-md-4 col-form-label text-md-end">Nazwa Użytkownika:</label>
                            <div className="col-md-6 my-auto">
                                <input className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                            </div>
                        </div>
                            
                        <div className="row form-group mb-3">
                        
                            <label for="password" className="col-md-4 col-form-label text-md-end">Hasło:</label>
                        
                            <div className="col-md-6 my-auto">
                                <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                            </div>
                        </div>
                            
                    </form>
                </div>
                    <button className="btn btn-outline-light btn-lg" onClick={this.loginClicked}>Login</button>
                    
                
            </div>
                
        )
    }
}

export default LoginComponent