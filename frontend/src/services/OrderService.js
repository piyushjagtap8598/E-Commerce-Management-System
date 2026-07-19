import axios from "axios";

const BASE_URL = "http://localhost:8080/api/orders";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => ({
    headers: {
        Authorization: "Bearer " + getToken()
    }
});

class OrderService {

    getOrders() {
        return axios.get(BASE_URL, authHeader());
    }
    
    buyNow(order) {
    return axios.post(
        BASE_URL + "/buy-now",
        order,
        authHeader()
    );
}

}

export default new OrderService();