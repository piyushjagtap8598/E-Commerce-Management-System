import React ,{useEffect,useState} from "react";
import ProductService from "../services/ProductService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductList.css";
import OrderService from "../services/OrderService";


function ProductList(){

    const navigate = useNavigate();
    const [products,setProducts]=useState([]);
    const role= localStorage.getItem("role");
    const name= localStorage.getItem("name");
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
        localStorage.removeItem("name");
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
     const handleBuyNow = async (product) => {
         try {

        const order = {
            user: {
                id: 1
            },
            totalamount: product.price,
            orderitems: [
                {
                    product: {
                        id: product.id
                    },
                    quantity: 1
                }
            ]
        };

        await OrderService.buyNow(order);

        alert("Order Placed Successfully");

        loadProducts();

    } catch (error) {

        console.log(error);

        if (error.response) {
            alert(error.response.data);
        } else {
            alert("Failed To Place Order");
        }

    }
};

    return(
        <div className="container mt-4">
           <div className="d-flex justify-content-between align-items-center mb-3">

          <div>
            <h2>Product List</h2>
            <h5 className="text-primary">
                  Welcome, {name}
            </h5>
         </div>

</div>
         <div className="row">

               {products.map((product) => (

             <div className="col-md-3 mb-4" key={product.id}>

               <div className="card h-100 shadow product-card" style={{ cursor: "pointer" }} onClick={() => navigate(`/product/${product.id}`)}>

                <img
                    src={`http://localhost:8080/uploads/${product.imageName}`}
                    className="card-img-top"
                    alt={product.productname}
                    style={{ height: "220px", objectFit: "cover" }}
                 />

                <div className="card-body">

                    <h5>{product.productname}</h5>

                    <h4 className="text-success">
                        ₹ {product.price}
                    </h4>

                    <p>{product.description}</p>

                    <p className="text-warning mb-2">
                       ⭐⭐⭐⭐☆ (4.5)
                    </p>

                    <p>
                        <strong>Stock :</strong> {product.quantity}
                    </p>

                    {role === "USER" && (
                     <>

                        <button
                             className="btn btn-success w-100"
                             onClick={(e) => {
                             e.stopPropagation();
                             addToCart(product);
                             }}
                         >
                               Add To Cart
                         </button> &nbsp;&nbsp;

                        <button
                           className="btn btn-warning w-100 mb-2"
                           disabled={product.quantity === 0}
                           onClick={(e) => {
                           e.stopPropagation();
                           handleBuyNow(product);
                           }}
                         >
                            {product.quantity === 0 ? "Out Of Stock" : "Buy Now"}
                         </button>

                       
                     </>
                    )}

                    {role === "ADMIN" && (

                        <>
                           <button
                              className="btn btn-warning w-100 mb-2"
                              onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/edit-product/${product.id}`);
                              }}
                              >
                                 Edit
                             </button>

                            <button
                               className="btn btn-danger w-100"
                               onClick={(e) => {
                               e.stopPropagation();
                               deleteProduct(product.id);
                               }}
                             >
                                 Delete
                             </button>
                        </>

                    )}

                </div>

            </div>

        </div>

    ))}

</div>
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