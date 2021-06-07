import axios from 'axios';
import LoginComponent from '../components/ANOTHERLoginComponent';
import context from '../components/context/context';
const MY_APPOINTMENTS_URL = 'http://localhost:8080/api/patient/getAppointmentsOfLoggedPatient';

class MyAppointmentsService{

    getMyAppointments(){
        var USERTOKEN = window.response.accessToken;

        let config = {
            headers:{
                'Authorization': `Bearer ${USERTOKEN}`}
            };
        axios.defaults.headers.common = {'Authorization': `Bearer ${USERTOKEN}`}
        return axios.get(MY_APPOINTMENTS_URL, config);
        
    }
}

export default new MyAppointmentsService();