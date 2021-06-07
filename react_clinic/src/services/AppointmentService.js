import axios from 'axios'

const APPOINTMENTS_REST_API_URL = 'http://localhost:8080/api/appointment';

class AppointmentService{

    
    getAppointments(){
        console.log("Pierwszy etap");
        var USERTOKEN = window.response.accessToken;

        let config = {
            headers:{
                'Authorization': `Bearer ${USERTOKEN}`}
            };
        axios.defaults.headers.common = {'Authorization': `Bearer ${USERTOKEN}`}
        return axios.get(APPOINTMENTS_REST_API_URL, config);
        
    }
}

export default new AppointmentService();