import axios from "axios";

const BASE_URL = "http://localhost:8080/api/products";
class ProductService{
    getAuthHeader(){
        const token=localStorage.getItem("token");
        console.log("TOKEN =",token);
        return{
            headers:{Authorization: `Bearer ${token}`}
    };
    }
    getAllProducts() {
         return axios.get(BASE_URL,this.getAuthHeader());
        }

    getProductById(id) {
         return axios.get(`${BASE_URL}/${id}`, this.getAuthHeader());
        }     

    addProducts(formData) {
    return axios.post(BASE_URL, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
        }
    });
}
   updateProduct(id, formData) {
    return axios.put(`${BASE_URL}/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
        }
    });
}

    deleteProduct(id){
        return axios.delete(`${BASE_URL}/${id}`,this.getAuthHeader());}
}
export default new ProductService();