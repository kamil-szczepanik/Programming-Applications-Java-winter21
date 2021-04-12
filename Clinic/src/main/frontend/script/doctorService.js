import axios from 'axios'

const USER_REST_API_URL = "http://localhost:8080/api/doctor"


class DoctorService{

    getDoctors(){
        axios.get(USER_REST_API_URL);
    }
}
export default new DoctorService();