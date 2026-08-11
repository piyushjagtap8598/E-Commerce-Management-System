import axios from "axios";

const BASE_URL = "https://e-commerce-backend-929k.onrender.com/api/orders";

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
const orderService = new OrderService();
export default  orderService;