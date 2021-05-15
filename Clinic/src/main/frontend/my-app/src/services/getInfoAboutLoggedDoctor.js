import axios from 'axios';
import LoginComponent from '../components/ANOTHERLoginComponent';
import context from '../components/context/context';
const DOCTOR_INFO_URL = 'http://localhost:8080/api/doctor/getInfoAboutLoggedDoctor';

class getInfoAboutLoggedDoctor{

    getInfo(){
        var USERTOKEN = window.response.accessToken;

        let config = {
            headers:{
                'Authorization': `Bearer ${USERTOKEN}`}
            };
        axios.defaults.headers.common = {'Authorization': `Bearer ${USERTOKEN}`}
        return axios.get(DOCTOR_INFO_URL, config);
        
    }
}

export default new getInfoAboutLoggedDoctor();