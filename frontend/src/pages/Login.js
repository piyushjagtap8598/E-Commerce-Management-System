import { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin =() =>{
    const loginData={email,password};
    AuthService.login(loginData).then((response)=>{
      console.log(response.data);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("role",response.data.role);
      alert("Login Success");
      navigate("/products");
    })
    .catch((error) =>{
      console.log(error);
      alert("Invalid Email Or Password");
    });
  };
  
  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2>Login</h2>

        <input type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" className="form-control mb-3" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;