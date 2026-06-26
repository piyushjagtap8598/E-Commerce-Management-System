import {useEffect,useState} from "react";
import ProductService from "../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct(){
    const {id}= useParams();
    const navigate = useNavigate();
    const [productname,setProductName]= useState("");
    const [price,setPrice]= useState("");
    const [quantity,setQuantity]=useState("");
    const [description,setDescription]= useState("");

    useEffect(()=>{
        ProductService.getAllProducts().then((res)=>{
            const product = res.data.find(p => p.id == id);
            setProductName(product.productname);
            setPrice(product.price);
            setQuantity(product.quantity);
            setDescription(product.description);
        });
    }, [id]);

    const updateProduct=(e)=>{
        e.preventDefault();
        const product ={productname,price,quantity,description};
        ProductService.updateProduct(id,product).then(() =>{
            alert("Product Updated");
            navigate("/products");
        })
        .catch((error) => console.log(error));
    };


return(
    <div className="container mt-4">
        <h2>Edit Product</h2>
        <input className="form-control mb-2" value={productname} onChange={(e)=> setProductName(e.target.value)} />
        <input className="form-control mb-2" value={price} onChange={(e)=> setPrice(e.target.value)}/>
        <input className="form-control mb-2" value={quantity} onChange={(e)=> setQuantity(e.target.value)}/>
        <input className="form-control mb-2" value={description} onChange={(e)=> setDescription(e.target.value)}/>
        <button className="btn btn-success" onClick={updateProduct}>
            Update Product
        </button>

    </div>
)

}
export default EditProduct;