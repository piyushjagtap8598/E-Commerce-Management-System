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
    getAllProducts(){ return axios.get(BASE_URL,this.getAuthHeader());}
    addProducts(product){return axios.post(BASE_URL,product,this.getAuthHeader());}
    updateProduct(id,product){return axios.put(`${BASE_URL}/${id}`,product,this.getAuthHeader());}
    deleteProduct(id){return axios.delete(`${BASE_URL}/${id}`,this.getAuthHeader());}
}
export default new ProductService();