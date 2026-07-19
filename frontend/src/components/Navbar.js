import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");

        navigate("/");
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container-fluid">


                <Link className="navbar-brand" to="/dashboard">
                    E-Commerce
                </Link>


                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>



                <div className="collapse navbar-collapse" id="navbarNav">


                    <ul className="navbar-nav me-auto">


                        {/* Common Dashboard */}

                        <li className="nav-item">
                            <Link 
                            className="nav-link" 
                            to="/dashboard">

                                Dashboard

                            </Link>
                        </li>



                        {/* ADMIN MENU */}

                        {
                            role === "ADMIN" &&

                            <li className="nav-item">

                                <Link 
                                className="nav-link" 
                                to="/products">

                                    Products

                                </Link>

                            </li>
                        }




                        {/* USER MENU */}

                        {
                            role === "USER" &&

                            <>

                            <li className="nav-item">

                                <Link 
                                className="nav-link" 
                                to="/products">

                                    Products

                                </Link>

                            </li>


                            <li className="nav-item">

                                <Link 
                                className="nav-link" 
                                to="/cart">

                                    Cart

                                </Link>

                            </li>



                            <li className="nav-item">

                                <Link 
                                className="nav-link" 
                                to="/orders">

                                    Orders

                                </Link>

                            </li>

                            </>

                        }


                    </ul>


                     <button
                         className="btn btn-info"
                         onClick={() => navigate("/profile")}
                         title="Profile">
                         <i className="bi bi-person-circle fs-5"></i>

                    </button>


                    &nbsp;&nbsp;&nbsp;



                    <button
                       className="btn btn-danger"
                       onClick={logout}
                       title="Logout">

                       <i className="bi bi-box-arrow-right fs-5"></i>

                    </button>


                </div>


            </div>


        </nav>
    );
}

export default Navbar;