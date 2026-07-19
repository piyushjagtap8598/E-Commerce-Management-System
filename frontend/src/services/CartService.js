import axios from "axios";

const BASE_URL = "http://localhost:8080/api/cart";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => ({
    headers: {
        Authorization: "Bearer " + getToken()
    }
});

class CartService {

    getCartItems() {
        return axios.get(BASE_URL, authHeader());
    }

    addToCart(cartItem) {
        return axios.post(BASE_URL, cartItem, authHeader());
    }

    removeFromCart(id) {
    return axios.delete(BASE_URL + "/" + id, authHeader());
     }

    clearCart() {
        return axios.delete(BASE_URL + "/clear", authHeader());
    }

}

export default new CartService();