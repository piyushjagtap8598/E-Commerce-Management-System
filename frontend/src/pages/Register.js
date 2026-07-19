import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword,setShowPassword]= useState(false);

    const handleRegister = () => {

        const registerData = {
            name,
            email,
            password
        };

        AuthService.register(registerData)
            .then(() => {
                alert("Registration Successful");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                alert("Registration Failed");
            });

    };

    return (

        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", background: "#f8f9fa" }}
        >

            <div
                className="card shadow-lg p-4"
                style={{ width: "420px", borderRadius: "15px" }}
            >

                <div className="text-center mb-4">

                    <i className="bi bi-person-plus-fill fs-1 text-success"></i>

                    <h2>Create Account</h2>

                    <p className="text-muted">
                        Register to continue
                    </p>

                </div>


                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

               <div className="input-group mb-3">

                 <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 />

                    <button
                       type="button"
                       className="btn btn-outline-secondary"
                       onClick={() => setShowPassword(!showPassword)}
                     >
                       <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
                     </button>

              </div>

                <button
                    className="btn btn-success w-100"
                    onClick={handleRegister}
                >
                    Register
                </button>

                <div className="text-center mt-3">

                    Already have an account?

                    <br />

                    <Link to="/" className="fw-bold text-decoration-none">
                        Login Here
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;