import React from 'react';
import props from 'prop-types';
import {useHistory} from "react-router-dom";

class ContactComponent extends React.Component{


    
    render(){
        return(
            <>
                <h2>Kontakt</h2>
                <p>Wszystkie dane do kontaktu są w stopce na dole strony</p>
            </>
                
        )
    }
}

export default ContactComponent;