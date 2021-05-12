import React from 'react';
import props from 'prop-types';
import {NavLink, useHistory} from "react-router-dom";

class StartComponent extends React.Component{
    
    render(){
        return(
            <>
            <h3>Najnowsze informacje</h3>
            <NavLink to='/login' exact>Przejdź do logowania</NavLink>
            <NavLink to='/register' exact>Przejdź do rejestracji</NavLink>

            <p>LoremIpsum</p>
            <p>LoremIpsum</p>

            <p>LoremIpsum</p>

            <p>LoremIpsum</p>

            <p>LoremIpsum</p>
            <p>LoremIpsum</p>
            <p>LoremIpsum</p>
            <p>LoremIpsum</p>
            <p>LoremIpsum</p>
            <p>LoremIpsum</p>
            <p>LoremIpsum</p>
            <p>LoremIpsum</p>

            </>  
        )
    }
}

export default StartComponent;