import React from 'react';
import props from 'prop-types';
import {NavLink, useHistory} from "react-router-dom";

class StartComponent extends React.Component{
    
    render(){
        return(
            <>
            <h3>Żeby mieć dostęp do strony musisz być zalogowany</h3>
            <NavLink to='/register' exact>Przejdź do rejestracji</NavLink>
            <br></br>
            <NavLink to='/login' exact>Przejdź do logowania</NavLink>

            

            </>  
        )
    }
}

export default StartComponent;