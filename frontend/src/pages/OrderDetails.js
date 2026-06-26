import {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function OrderDetails(){
    const navigate = useNavigate();
    
 const {id} = useParams();
 const [order,setOrder] = useState(null);
 useEffect(() =>{
    const token = localStorage.getItem("token");
    axios.get(`http://localhost:8080/api/orders/${id}`,{headers:{Authorization: `Bearer ${token}`}}).then(res => setOrder(res.data)).catch(err => console.log(err));
 },[id]);
 if(!order)
 {
    return <h3>Loading....</h3>
 }
 

    return(
        <div className="container mt-4">
            <h2>Order Details</h2>
            <p><strong>Order Id :</strong>{order.id}</p>
            <p><strong>Total Amount :</strong>₹{order.totalamount}</p>
            <p><strong>Status :</strong>{order.status}</p>

            <h3>Order Items</h3>
            <table className="table table-borderd">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
                    {order.orderitems?.map((item) => (
                        <tr key={item.id}>
                            <td>{item.product?.productname}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.price}</td>

                        </tr>
                    ))}
                </tbody>

            </table>
            <h4 className="mt-3" > Total Amount:₹{order.totalamount}</h4>
            <button className="btn btn-secondary mt-3" onClick={() => navigate("/orders")}>
                Back To Home
            </button>

        </div>
    );
}
export default OrderDetails;