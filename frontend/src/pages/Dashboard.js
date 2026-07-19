import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import RecentProducts from "../components/RecentProducts";
import ProductService from "../services/ProductService";
import CartService from "../services/CartService";
import OrderService from "../services/OrderService";

function Dashboard() {
    
    const name= localStorage.getItem("name");
    const role= localStorage.getItem("role");
    const [products, setProducts] = useState([]);
    const [cartItems, setcartItems] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        ProductService.getAllProducts()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        CartService.getCartItems()
        .then((response) => {
            setcartItems(response.data);
        })    
        .catch((error) => {
            console.log(error);
        });

        OrderService.getOrders()
        .then((response) => {
            setOrders(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    }, []);

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                   <div>
                     <h2>Welcome, {name} 👋</h2>
                     <p className="text-muted mb-0">
                             Role : {role}
                     </p>
                </div>

</div>

                <DashboardCards
                    totalProducts={products.length}
                    cartItems={cartItems.length}
                    totalOrders={orders.length}
                />

                <div className="card mt-4">

                     <div className="card-header">
                         <h5 className="mb-0">
                           Quick Actions
                         </h5>
                     </div>


                <div className="card-body">


           {/* ADMIN QUICK ACTIONS */}

                {role === "ADMIN" &&
            <>
               <Link
                to="/add-product"
                className="btn btn-primary me-2"
               >
                Add Product
               </Link>

                <Link
                     to="/products"
                     className="btn btn-primary me-2"
                    >
                     View Products
                   </Link>
            </>
               }



        {/* USER QUICK ACTIONS */}

                  { role === "USER" &&

                <>

                    <Link
                     to="/products"
                     className="btn btn-primary me-2"
                    >
                     View Products
                   </Link>


                    <Link
                     to="/cart"
                     className="btn btn-success me-2"
                    >
                     My Cart
                    </Link>


                    <Link
                     to="/orders"
                     className="btn btn-warning"
                    >
                       My Orders
                    </Link>

            </>

        }


    </div>

</div>

                <RecentProducts products={products} />

            </div>
        </>
    );
}

export default Dashboard;