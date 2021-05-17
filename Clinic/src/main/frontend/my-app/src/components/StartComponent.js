import React from 'react';
import props from 'prop-types';
import {NavLink, useHistory} from "react-router-dom";

class StartComponent extends React.Component{
    
    render(){
        return(
            <div className="container-fluid" id="front">
                <div className="container py-5">
                    <div className="bg-dark col-md-7 col-lg-6 m-auto rounded-3 pb-5 px-5 pt-2" id="jumbo">
                <i className="fa fa-lock p-3" aria-hidden="true"></i>
            <p>Żeby mieć dostęp do strony musisz być zalogowany</p>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <NavLink to='/register' exact><button className="btn btn-outline-light btn-sm-lg m-2">Rejestracja</button></NavLink>
                    </div>
                    <div class="col">
                        <NavLink to='/login' exact><button className="btn btn-outline-light btn-sm-lg m-2">Logowanie</button></NavLink>
                        
                    </div>
                    
                </div>
                
            </div>
            </div>
            </div>
            </div>
             
        )
    }
}

export default StartComponent;