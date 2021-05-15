import axios from 'axios'

const SPECIALISATION_REST_API_URL = 'http://localhost:8080/api/doctor/getDoctorSpecialisation';

class SpecialisationService{

    getSpecialisation(){
        alert(axios.get(SPECIALISATION_REST_API_URL));
        return axios.get(SPECIALISATION_REST_API_URL);
        alert('udalo to sie')
    }
}

export default new SpecialisationService();