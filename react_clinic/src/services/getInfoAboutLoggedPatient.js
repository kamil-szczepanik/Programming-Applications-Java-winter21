import axios from 'axios';
import LoginComponent from '../components/ANOTHERLoginComponent';
import context from '../components/context/context';
const PATIENT_INFO_URL = 'http://localhost:8080/api/patient/getInfoAboutLoggedPatient';

class getInfoAboutLoggedPatient{

    getInfo(){
        var USERTOKEN = window.response.accessToken;

        let config = {
            headers:{
                'Authorization': `Bearer ${USERTOKEN}`}
            };
        axios.defaults.headers.common = {'Authorization': `Bearer ${USERTOKEN}`}
        return axios.get(PATIENT_INFO_URL, config);
        
    }
}

export default new getInfoAboutLoggedPatient();