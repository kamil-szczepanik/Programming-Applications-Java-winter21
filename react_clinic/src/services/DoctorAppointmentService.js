import axios from 'axios'

const APPOINTMENTS_REST_API_URL = 'api/doctor/getAppointmentsOfLoggedDoctor';

class DoctorAppointmentService{

    
    getAppointments(){
        var USERTOKEN = window.response.accessToken;

        let config = {
            headers:{
                'Authorization': `Bearer ${USERTOKEN}`}
            };
        axios.defaults.headers.common = {'Authorization': `Bearer ${USERTOKEN}`}
        return axios.get(APPOINTMENTS_REST_API_URL, config);
        
    }
}

export default new DoctorAppointmentService();