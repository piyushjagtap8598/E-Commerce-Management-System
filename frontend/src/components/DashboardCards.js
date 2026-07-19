import React from "react";

function DashboardCards({ totalProducts, cartItems, totalOrders }) {

    const role = localStorage.getItem("role");

    return (
        <div className="row mt-4">

            <div className="col-md-4 mb-3">
                <div className="card text-white bg-primary shadow">
                    <div className="card-body">
                        <h5 className="card-title">📦 Total Products</h5>
                        <h2>{totalProducts}</h2>
                    </div>
                </div>
            </div>

            {role === "USER" && (
                <>
                    <div className="col-md-4 mb-3">
                        <div className="card text-white bg-success shadow">
                            <div className="card-body">
                                <h5 className="card-title">🛒 My Cart</h5>
                                <h2>{cartItems}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card text-dark bg-warning shadow">
                            <div className="card-body">
                                <h5 className="card-title">📋 My Orders</h5>
                                <h2>{totalOrders}</h2>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}

export default DashboardCards;