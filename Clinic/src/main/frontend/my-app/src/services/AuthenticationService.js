import axios from 'axios'

const INSTRUCTOR = 'in28minutes'
const PASSWORD = 'dummy'
const COURSE_API_URL = 'http://localhost:8080'
const DOCTORS_REST_API_URL = `${COURSE_API_URL}/api/${INSTRUCTOR}`
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'


class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        // return axios.get(`http://localhost:8080/api/auth/signin`,
        //     { headers: { authorization: this.createBasicAuthToken(username, password) } })
        return axios.post('http://localhost:8080/api/auth/signin', {'username':username,'password':password})
        // .then(response =>{
        //     getResponse=response;
        // })
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }
    registerSuccessfulLogin(username, password) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
        //console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}
export default new AuthenticationService()
// import axios from 'axios'

// const API_URL = 'http://localhost:8080'

// export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

// class AuthenticationService {

//     executeBasicAuthenticationService(username, password) {
//         return axios.get(`${API_URL}/basicauth`,
//             { headers: { authorization: this.createBasicAuthToken(username, password) } })
//     }

//     executeJwtAuthenticationService(username, password) {
//         console.log(username);
//         return axios.post(`${API_URL}/authenticate`, {
//             username,
//             password
//         })
//     }

//     createBasicAuthToken(username, password) {
//         return 'Basic ' + window.btoa(username + ":" + password)
//     }

//     registerSuccessfulLogin(username, password) {
//         //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
//         //console.log('registerSuccessfulLogin')
//         sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
//         this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
//     }

//     registerSuccessfulLoginForJwt(username, token) {
//         sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
//         this.setupAxiosInterceptors(this.createJWTToken(token))
//     }

//     createJWTToken(token) {
//         return 'Bearer ' + token
//     }


//     logout() {
//         sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
//     }

//     isUserLoggedIn() {
//         let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
//         if (user === null) return false
//         return true
//     }

//     getLoggedInUserName() {
//         let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
//         if (user === null) return ''
//         return user
//     }

//     setupAxiosInterceptors(token) {
//         axios.interceptors.request.use(
//             (config) => {
//                 if (this.isUserLoggedIn()) {
//                     config.headers.authorization = token
//                 }
//                 return config
//             }
//         )
//     }
// }

// export default new AuthenticationService()