import axios from 'axios'

const SPECIALISATION_REST_API_URL = 'http://localhost:8080/api/doctor/getDoctorSpecialisation';

class SpecialisationService{

    getSpecialisation(){
        return axios.get(SPECIALISATION_REST_API_URL);
    }
}

export default new SpecialisationService();