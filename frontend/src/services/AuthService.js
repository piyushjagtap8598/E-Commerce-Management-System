import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

class AuthService {

    login(loginData) {
        return axios.post(`${BASE_URL}/login`, loginData);
    }

    register(registerData) {
        return axios.post(`${BASE_URL}/register`, registerData);
    }

}

export default new AuthService();