import axios from 'axios'

const DOCTORS_REST_API_URL = 'http://localhost:8080/api/doctor';

class DoctorService{

    getDoctors(){
        console.log("Pierwszy etap");
        return axios.get(DOCTORS_REST_API_URL);
    }
}

export default new DoctorService();