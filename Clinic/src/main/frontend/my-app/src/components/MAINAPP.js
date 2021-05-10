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
import MyProfile from './myProfile';

class MainAPP extends React.Component{
    
    render(){
        return(
        <>
            
            <BrowserRouter>
                <NavigationComponent/>
                <Switch>
                    <Route path='/' exact component={StartComponent}/>
                    <Route path='/doctors' exact component={DoctorComponent}/>
                    <Route path='/login' component={LoginComponent}/>
                    <Route path='/contact' component={ContactComponent}/>
                    <Route path='/appointments' component={MyAppointments}/>
                    <Route path='/addAppointment' component={AddAppointment}/>
                    <Route path='/myProfile' component={MyProfile}/>
                    <Route component={StartComponent}/>
                </Switch>
            </BrowserRouter>
            

        </>
        );
        

     
    }
}

export default MainAPP;