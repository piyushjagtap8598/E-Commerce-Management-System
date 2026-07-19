import {useState} from "react";
import ProductService from "../services/ProductService";
import { useNavigate } from "react-router-dom";

function AddProduct(){
    const [productname,setProductName]=useState("");
    const [price,setPrice]=useState("");
    const [quantity,setQuantity]=useState("");
    const [description,setDescription]=useState("");
    const [categoryId,setCategoryId]=useState("");
    const [image,setImage]=useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
    const formData = new FormData();

      formData.append("productname", productname);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      formData.append("image", image);
     
        ProductService.addProducts(formData).then(()=>{
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
            <input className="form-control mb-2" placeholder="Category Id" type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}/>
            <input className="form-control mb-3" type="file"accept="image/*"onChange={(e) => setImage(e.target.files[0])}/>
            <button className="btn btn-success" onClick={handleSubmit}>
               Add Product
            </button>

        </div>

    </div>
)

}
export default AddProduct;