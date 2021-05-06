import React from 'react';
import props from 'prop-types';
import DoctorComponent from './DoctorComponent';
import LoginComponent from './LoginComponent';
import NavigationComponent from './NavigationComponent';
import { BrowserRouter, Route,NavLink, Switch } from 'react-router-dom';
import StartComponent from './StartComponent';
import ContactComponent from './ContactComponent';

class MainAPP extends React.Component{
    constructor(props){
        super(props);
        this.navElement = React.createRef(true);
    }
    render(){
        return(
        <>
            
            <BrowserRouter>
                <NavigationComponent/>
                <Route path='/' exact component={StartComponent}/>
                <Route path='/doctors' exact component={DoctorComponent}/>
                <Route path='/login' component={LoginComponent}/>
                <Route path='/contact' component={ContactComponent}/>

            </BrowserRouter>
            

        </>
        );
        

     
    }
}

export default MainAPP;