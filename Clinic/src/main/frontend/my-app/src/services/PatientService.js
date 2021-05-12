import axios from 'axios'

const PATIENTS_REST_API_URL = 'http://localhost:8080/api/patient';

class PatientService{

    getPatients(){
        return axios.get(PATIENTS_REST_API_URL);
    }
}

export default new PatientService();