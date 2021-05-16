import React from 'react';
import props from 'prop-types';
import DoctorComponent from './DoctorComponent';
import LoginComponent from './LoginComponent';
import NavigationComponent from './NavigationComponent';
import { BrowserRouter, Route,NavLink, Switch, Redirect } from 'react-router-dom';
import StartComponent from './StartComponent';
import ContactComponent from './ContactComponent';
import MyAppointments from './myAppointments';
import AddAppointment from './AddAppointment';
import AddAppointment_Doctor from './AddAppointment_Doctor';
import AuthenticationService from '../services/AuthenticationService';
import MyProfile from './myProfile';
import RegistrationComponent from './PatientRegisterComponent';
import RegistrationComponentDoctor from './DoctorRegisterComponent';
import ANOTHERLoginComponent from './ANOTHERLoginComponent';
import AuthenticatedRoute from './AuthenticatedRoute';
import Navi from './Navbar';
import doctorProfile from '../components/doctorProfile';
import DeleteAppointmentPatient from './DeleteAppointmentPatient';
import DeleteAppointmentDoctor from './DeleteAppointmentDoctor';
import ChangePasswordComponent from './ChangePasswordComponent';

class MainAPP extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLogged:false,
        }
    }
    setIsLogged(){
        alert("dziala");
        this.setState({
            isLogged:true
        })
    }
    render(){
        return(
        <>
            
            <BrowserRouter>
            
              <NavigationComponent/>
                
                <Switch>
                    <Route path='/register' component={RegistrationComponent}/>
                    <Route path='/registerDoctor' component={RegistrationComponentDoctor}/>

                    <Route path='/login' component={ANOTHERLoginComponent} action={this.isLogged}/>
                    <Route path='/deleteAppointment' component={DeleteAppointmentPatient} />
                    <Route path='/deleteAppointmentDoctor' component={DeleteAppointmentDoctor} />
                    <Route path='/changePassword' exact component={ChangePasswordComponent}/>

                    <Route path='/' exact component={StartComponent}/>
                    <Route path='/doctors' exact component={DoctorComponent}/>
                    
                    <Route path='/contact' component={ContactComponent}/>
                    <Route path='/appointments' component={MyAppointments}/>
                    <Route path='/addAppointment' component={AddAppointment}/>
                    <Route path='/addAppointmentDoctor' component={AddAppointment_Doctor}/>
                    <AuthenticatedRoute path="/" exact component={StartComponent} />
                    <Route path='/myProfile' component={MyProfile}/>
                    <Route path='/myProfileDoctor' component={doctorProfile}/>


                    <Route component={StartComponent}/>
                </Switch>

            </BrowserRouter>
            

        </>
        );
        

     
    }
}

export default MainAPP;