import React ,{useEffect,useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders(){
    const [orders,setOrders] = useState([]);
    useEffect(() =>{
        loadOrders();
    },[]);
    const loadOrders = async () =>{
        try{
            const token= localStorage.getItem("token");
            const response= await axios.get("http://localhost:8080/api/orders",{headers:{Authorization: `Bearer ${token}`}});
            setOrders(response.data);
        }
        catch(error){
            console.log(error);
        }
    };


    return(
        <div className="container mt-4">
            <h2>My Orders</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) =>(
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>₹{order.totalamount}</td>
                            <td>{order.status}</td>

                        <td>
                            <Link to={`/orders/${order.id}`} className="btn btn-info">
                            View
                            </Link>
                        </td>

                        </tr>

                       
                    ))}
                </tbody>

            </table>

        </div>
    )

}
export default Orders;