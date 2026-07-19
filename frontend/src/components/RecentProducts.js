import React from "react";

function RecentProducts({ products }) {

    return (
        <div className="card mt-4 shadow">
            <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Recent Products</h5>
            </div>

            <div className="card-body">

                <table className="table table-hover">

                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>

                    <tbody>

                        {products.map((product) => (

                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.productname}</td>
                                <td>₹ {product.price}</td>
                                <td>{product.quantity}</td>
                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default RecentProducts;