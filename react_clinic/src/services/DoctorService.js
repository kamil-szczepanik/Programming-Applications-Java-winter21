import axios from 'axios';
import LoginComponent from '../components/ANOTHERLoginComponent';
import context from '../components/context/context';
const DOCTORS_REST_API_URL = 'http://localhost:8080/api/doctor';

class DoctorService{

    getDoctors(){
        var USERTOKEN = window.response.accessToken;

        let config = {
            headers:{
                'Authorization': `Bearer ${USERTOKEN}`}
            };
        axios.defaults.headers.common = {'Authorization': `Bearer ${USERTOKEN}`}
        return axios.get(DOCTORS_REST_API_URL, config);
        
    }
}

export default new DoctorService();