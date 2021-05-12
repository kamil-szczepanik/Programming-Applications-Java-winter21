import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';
class RegistrationForm extends Component {

    constructor(props) {
        super(props)
        if(props.error) {
            this.state = {
              failure: 'wrong username,email or password!',
              errcount: 0
            }
        } else {
            this.state = { errcount: 0 }
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault()
        const data = new FormData(this.form)
        alert(data.get('firstName'))
        axios.post('http://localhost:8080/api/registration/patient', {'firstName':data.get('firstName'),
        'lastName':data.get('lastName'),
        'email':data.get('email'),
        'password':data.get('password')})
        .then(response =>{
            console.log(response)
            alert("Pomyślnie zarejestrowano! Aby korzystać ze wszystkich usług potwierdź maila");
            <Redirect path='/' />;
        })
        .catch(error=>{
            alert("Nie udało się zarejestrować!")
            console.log(error)
        })
    }



    handleError = (field, errmsg) => {
        if(!field) return

        if(errmsg) {
            this.setState((prevState) => ({
                failure: '',
                errcount: prevState.errcount + 1, 
                errmsgs: {...prevState.errmsgs, [field]: errmsg}
            }))
        } else {
            this.setState((prevState) => ({
                failure: '',
                errcount: prevState.errcount===1? 0 : prevState.errcount-1,
                errmsgs: {...prevState.errmsgs, [field]: ''}
            }))
        }
    }

    renderError = () => {
        if(this.state.errcount || this.state.failure) {
            const errmsg = this.state.failure 
              || Object.values(this.state.errmsgs).find(v=>v)
            return <div className="error">{errmsg}</div>
        }
    }

    render() {
        const inputs = this.props.inputs.map(
          ({name, placeholder, type, value, className}, index) => (
            <Input key={index} name={name} placeholder={placeholder} type={type} value={value}
              className={type==='submit'? className : ''} handleError={this.handleError} />
          )
        )
        const errors = this.renderError()
        return (
            <form {...this.props} onSubmit={this.handleSubmit} ref={fm => {this.form=fm}} >
              {inputs}
              {errors}
            </form>
        )
    }
}

RegistrationForm.propTypes = {
  name: PropTypes.string,
  action: PropTypes.string,
  method: PropTypes.string,
  inputs: PropTypes.array,
  error: PropTypes.string
}

export default RegistrationForm