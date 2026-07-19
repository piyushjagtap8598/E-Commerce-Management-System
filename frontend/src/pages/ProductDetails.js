import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../services/ProductService";
import CartService from "../services/CartService";
import OrderService from "../services/OrderService";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({});

    useEffect(() => {
        ProductService.getProductById(id)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const addToCart = () => {

        const cartItem = {
            user: { id: 1 },
            product: { id: product.id },
            quantity: 1
        };

        CartService.addToCart(cartItem)
            .then(() => alert("Product Added To Cart"))
            .catch(() => alert("Failed"));
    };

    const buyNow = () => {

        const order = {
            user: { id: 1 },
            totalamount: product.price,
            orderitems: [
                {
                    product: { id: product.id },
                    quantity: 1
                }
            ]
        };

        OrderService.buyNow(order)
            .then(() => {
                alert("Order Placed Successfully");
                navigate("/products");
            })
            .catch((err) => {
                console.log(err);
                alert("Failed");
            });
    };

    return (

        <div className="container mt-5">

            <div className="card shadow-lg p-4">

                <div className="text-center">

                    <img
                        src={`http://localhost:8080/uploads/${product.imageName}`}
                        alt={product.productname}
                        style={{
                            width: "450px",
                            height: "350px",
                            objectFit: "contain"
                        }}
                    />

                </div>

                <div className="text-center mt-4">

                    <h1>{product.productname}</h1>

                    <h2 className="text-success">
                        ₹ {product.price}
                    </h2>

                    <p className="text-muted">
                        {product.description}
                    </p>

                </div>

                <hr />

                <table className="table">

                    <tbody>

                        <tr>
                            <td><b>📦 Stock</b></td>
                            <td className="text-success">
                                {product.quantity} Available
                            </td>
                        </tr>

                        <tr>
                            <td><b>🏷 Category</b></td>
                            <td>
                                {product.category?.categoryname}
                            </td>
                        </tr>

                        <tr>
                            <td><b>💰 Price</b></td>
                            <td>
                                ₹ {product.price}
                            </td>
                        </tr>

                        <tr>
                            <td><b>📝 Description</b></td>
                            <td>
                                {product.description}
                            </td>
                        </tr>

                    </tbody>

                </table>

                <div className="row mt-4">

                    <div className="col-md-6">

                        <button
                            className="btn btn-success w-100"
                            onClick={addToCart}
                        >
                            🛒 Add To Cart
                        </button>

                    </div>

                    <div className="col-md-6">

                        <button
                            className="btn btn-warning w-100"
                            onClick={buyNow}
                        >
                            ⚡ Buy Now
                        </button>

                    </div>

                </div>

                <button
                    className="btn btn-outline-dark w-100 mt-3"
                    onClick={() => navigate("/products")}
                >
                    ← Back
                </button>

            </div>

        </div>

    );

}

export default ProductDetails;