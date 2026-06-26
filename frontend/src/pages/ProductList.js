import React ,{useEffect,useState} from "react";
import ProductService from "../services/ProductService";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function ProductList(){

    const navigate = useNavigate();
    const [products,setProducts]=useState([]);
    const role= localStorage.getItem("role");
    useEffect(() =>{
        loadProducts();
    },[]);

    const loadProducts = () =>{
        console.log("Loading Products...");
        ProductService.getAllProducts().then((response)=>{
            console.log("API Response:",response.data);
            setProducts(response.data);
        })
        .catch((error) =>{
            console.log("ERROR =",error);
            console.log("ERROR RESPONSE =",error.response);
        });
    };
    const deleteProduct =(id) =>{
        const confirmDelete = window.confirm("Are You sure you want to delete this product?");
        if(confirmDelete){
            ProductService.deleteProduct(id).then(() =>{
                alert("Product Deleted Succesfully");
                loadProducts(); 
            })
            .catch((error) =>{
                console.log(error);
            })
        }
    };
    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };
    const addToCart = async(product) =>{
        try{
            const token= localStorage.getItem("token");
            const cartItem ={
                user:{id:1},
                product:{id:product.id},
                quantity:1
            };
            await axios.post("http://localhost:8080/api/cart",cartItem, {headers:{Authorization: `Bearer ${token}`}});
            alert("Product Added To Cart");
        }
        catch(error){
            console.log(error);
            alert("Failed To Add Product");
        }
    };

    return(
        <div className="container mt-4">
            <h2>Product List</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
               <tbody>
     {products.map((product) => (
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.productname}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.description}</td>
           <td>
            {role === "USER" && (
             <button
                 className="btn btn-success btn-sm"
                  onClick={() => addToCart(product)} >
                Add To Cart
             </button> )} &nbsp;&nbsp;&nbsp;

             {role === "ADMIN" && (
            <button
                 className="btn btn-warning btn-sm ms-2"
                 onClick={() => navigate(`/edit-product/${product.id}`)}>
                Edit
             </button> )} &nbsp;&nbsp;&nbsp;

             {role === "ADMIN" && (
             <button
                 className="btn btn-danger btn-sm ms-2"
                 onClick={() => deleteProduct(product.id)}>
                Delete
             </button> )} 
            </td>
        </tr>
    ))}
</tbody>

            </table>
            <div className="d-flex justify-content-between mt-3">
                {role === "ADMIN" && (
                <button className="btn btn-primary" onClick={()=> navigate("/add-product")}>
                    Add Product
                </button> )}
                   
                 {role === "USER" && (   
                <button className="btn btn-success me-2" onClick={()=> navigate("/cart")}>
                    Cart
                </button> )}

                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </div>

    )
}
export default  ProductList;