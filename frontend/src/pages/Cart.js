import React ,{useEffect,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart(){

    const [cartItems,setCartItems]=useState([]);
    useEffect(() =>{
        loadCartItems();
    }, []);

    const loadCartItems=async() =>{
        const token = localStorage.getItem("token");
        const response=await axios.get("http://localhost:8080/api/cart",{headers:{Authorization: `Bearer ${token}`}});
        setCartItems(response.data);
    };
    
    const removeItem = async (id) => {
    const confirmDelete = window.confirm(
        "Are you sure you want to remove this item from cart?"
    );

    if (confirmDelete) {
        try {
            const token = localStorage.getItem("token");

            await axios.delete( `http://localhost:8080/api/cart/${id}`, {headers: {Authorization: `Bearer ${token}`}});
            alert("Item Removed Successfully");
            loadCartItems();

        } catch (error) {
            console.log(error);
            alert("Failed to remove item");
        }
    }
};
   const placeOrder = async (item) => {
    try {
        const token = localStorage.getItem("token");

        const order = {
            user: { id: 1 },
            totalamount: item.product.price * item.quantity,
            orderitems: [{
                product: { id: item.product.id },
                quantity: item.quantity,
                price: item.product.price
            }]
        };

        await axios.post(
            "http://localhost:8080/api/orders",
            order,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        await axios.delete(
            `http://localhost:8080/api/cart/${item.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Order Placed Successfully");
        loadCartItems();

    } catch (error) {
        console.log(error);
        alert("Failed To Place Order");
    }
};

    const totalamount = cartItems.reduce((total,item) => total+(item.product.price*item.quantity),0);

     const navigate = useNavigate();

return(
    <div className="container mt-4">
        <h2>Cart Item</h2>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((item) =>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.product.productname}</td>
                        <td>{item.product.price}</td>
                        <td>{item.quantity}</td>
                        <td>
                            <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>
                                Remove
                            </button> &nbsp;&nbsp;

                            <button className="btn btn-primary mt-10" onClick={() => placeOrder(item)}>
                               Place Order
                            </button>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
        <h4 className="mt-3">
            Total Amount : ₹ {totalamount}
        </h4>
        <button className="btn btn-success ms-2" onClick={() => navigate("/orders")}>
         My Orders
        </button>

    </div>
)

}
export default Cart;