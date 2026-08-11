import axios from "axios";

const BASE_URL = "https://e-commerce-backend-929k.onrender.com/api/auth";

class AuthService {

    login(loginData) {
        return axios.post(`${BASE_URL}/login`, loginData);
    }

    register(registerData) {
        return axios.post(`${BASE_URL}/register`, registerData);
    }

}

export default new AuthService();