import {useState} from "react";
import ProductService from "../services/ProductService";
import { useNavigate } from "react-router-dom";

function AddProduct(){
    const [productname,setProductName]=useState("");
    const [price,setPrice]=useState("");
    const [quantity,setQuantity]=useState("");
    const [description,setDescription]=useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
    const product ={productname,price,quantity,description};
    ProductService.addProducts(product).then(()=>{
        alert("Product Added Succesfully");
        navigate("/products");
    })
    .catch((error)=>{
        console.log(error);
        alert("Error While Adding Product");
    });
    };


return(
    <div className="container mt-4">
        <div className="card p-4">
            <h2>Add Product</h2>
            <input className="form-control mb-2" placeholder="Product Name" value={productname} onChange={(e)=>setProductName(e.target.value)}/>
            <input className="form-control mb-2" placeholder="Price" type="number" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <input className="form-control mb-2" placeholder="Quantity" type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
            <input className="form-control mb-2" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <button className="btn btn-success" onClick={handleSubmit}>
               Add Product
            </button>

        </div>

    </div>
)

}
export default AddProduct;