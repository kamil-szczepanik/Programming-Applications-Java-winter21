import axios from 'axios'

const APPOINTMENTS_REST_API_URL = 'http://localhost:8080/api/appointment';

class AppointmentService{

    getAppointments(){
        return axios.get(APPOINTMENTS_REST_API_URL);
    }
}

export default new AppointmentService();