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
    const [categoryId,setCategoryId]=useState("");
    const [image,setImage]= useState(null);

    useEffect(()=>{
        ProductService.getAllProducts().then((res)=>{
            const product = res.data.find(p => p.id == id);
            setProductName(product.productname);
            setPrice(product.price);
            setQuantity(product.quantity);
            setDescription(product.description);
            setCategoryId(product.category?.id || "");
        });
    }, [id]);

    const updateProduct=(e)=>{
        e.preventDefault();
       const formData = new FormData();

         formData.append("productname", productname);
         formData.append("price", price);
         formData.append("quantity", quantity);
         formData.append("description", description);
         formData.append("categoryId", categoryId);

           if (image) {
           formData.append("image", image);
           }

            ProductService.updateProduct(id, formData).then(() =>{
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
        <input className="form-control mb-2" type="number"  placeholder="Category Id" value={categoryId}onChange={(e) => setCategoryId(e.target.value)}/>
        <input className="form-control mb-3" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
        <button className="btn btn-success" onClick={updateProduct}>
            Update Product
        </button>

    </div>
)

}
export default EditProduct;