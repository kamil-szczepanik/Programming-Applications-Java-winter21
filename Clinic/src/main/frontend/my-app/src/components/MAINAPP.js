import React from 'react';
import props from 'prop-types';
import DoctorComponent from './DoctorComponent';
import LoginComponent from './LoginComponent';
import NavigationComponent from './NavigationComponent';
import { BrowserRouter, Route,NavLink, Switch } from 'react-router-dom';
import StartComponent from './StartComponent';
import ContactComponent from './ContactComponent';
import MyAppointments from './myAppointments';
import AddAppointment from './AddAppointment';
import AddAppointment_Doctor from './AddAppointment_Doctor';
import AuthenticationService from '../services/AuthenticationService';
import MyProfile from './myProfile';
import RegistrationComponent from './PatientRegisterComponent';
import ANOTHERLoginComponent from './ANOTHERLoginComponent';
import AuthenticatedRoute from './AuthenticatedRoute';
class MainAPP extends React.Component{
    
    render(){
        return(
        <>
            
            <BrowserRouter>
                <NavigationComponent/>
                <Switch>
                    
                    <Route path='/' exact component={StartComponent}/>
                    <Route path='/doctors' exact component={DoctorComponent}/>
                    <Route path='/register' component={RegistrationComponent}/>
                    <Route path='/login' component={ANOTHERLoginComponent}/>
                    <Route path='/contact' component={ContactComponent}/>
                    <Route path='/appointments' component={MyAppointments}/>
                    <Route path='/addAppointment' component={AddAppointment}/>
                    <Route path='/addAppointmentDoctor' component={AddAppointment_Doctor}/>
                    <AuthenticatedRoute path="/" exact component={StartComponent} />
                    <Route path='/myProfile' component={MyProfile}/>
                    <Route component={StartComponent}/>
                </Switch>
            </BrowserRouter>
            

        </>
        );
        

     
    }
}

export default MainAPP;