import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword]= useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {

    const loginData = { email, password };

    AuthService.login(loginData)
      .then((response) => {

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email",response.data.email);
        localStorage.setItem("role", response.data.role);

        alert("Login Success");
        navigate("/dashboard");

      })
      .catch((error) => {

        console.log(error);
        alert("Invalid Email Or Password");

      });

  };

  return (

    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >

      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >

        <div className="text-center mb-4">

          <i className="bi bi-person-circle fs-1 text-primary"></i>

          <h2 className="mt-2">Login</h2>

          <p className="text-muted">
            Welcome Back
          </p>

        </div>


        <div className="input-group mb-3">

          <span className="input-group-text">
            <i className="bi bi-envelope-fill"></i>
          </span>

          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>


        <div className="input-group mb-3">

            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>

            <input
               type={showPassword ? "text" : "password"}
               className="form-control"
               placeholder="Enter Password"
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
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Login
        </button>


        <div className="text-center mt-3">

          <span className="text-muted">
            Don't have an account?
          </span>

          <br />

          <Link
            to="/register"
            className="text-decoration-none fw-bold"
          >
            Register Here
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Login;