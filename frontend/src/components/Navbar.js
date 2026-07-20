import React from "react";
import { Link, useNavigate } from "react-router-dom";
import  { useEffect, useState } from "react";
import axios from "axios";


function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const [profileImage, setProfileImage] = useState(null);

useEffect(() => {
    loadProfile();
}, []);

const loadProfile = async () => {
    try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            "http://localhost:8080/api/profile",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        setProfileImage(response.data.profileImage);

    } catch (error) {
        console.log(error);
    }
};


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("profileImage");

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
                       className="btn btn-info d-flex align-items-center justify-content-center"
                       onClick={() => navigate("/profile")}
                       title="Profile"
                       style={{ width: "45px", height: "45px", borderRadius: "50%", padding: 0 }}
                     >

                      <img
                        src={ profileImage ? "http://localhost:8080/uploads/profile/" +
                              profileImage : `https://ui-avatars.com/api/?name=${localStorage.getItem("name")}&background=ffffff&color=0d6efd&size=150`
                             }
                       alt="Profile"
                       style={{ width: "40px",height: "40px",borderRadius: "50%",objectFit: "cover"}}
                      />

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