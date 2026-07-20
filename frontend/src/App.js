
import './App.css';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Dashboard from "./pages/Dashboard";
import Profile from './components/Profile';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';

function ProtectedRoute({children})
{
  const token= localStorage.getItem("token");
  return token ? children :<Navigate to="/"/>
}

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/products" element={ <ProtectedRoute> <ProductList/> </ProtectedRoute> }/>
      <Route path="/add-product" element={ <ProtectedRoute> <AddProduct/> </ProtectedRoute> }/>
      <Route path="/edit-product/:id" element={ <ProtectedRoute>  <EditProduct/> </ProtectedRoute>}/>
      <Route path="/cart" element={ <ProtectedRoute> <Cart/> </ProtectedRoute>}/>
      <Route path="/orders" element={ <ProtectedRoute> <Orders/> </ProtectedRoute>}/>
      <Route path="/orders/:id" element={ <ProtectedRoute> <OrderDetails/> </ProtectedRoute>}/>
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      <Route path="/profile" element={ <ProtectedRoute> <Profile/> </ProtectedRoute>}/>
      <Route path="/edit-profile" element={ <ProtectedRoute> <EditProfile/> </ProtectedRoute>}/>
      <Route path="/change-password" element={ <ProtectedRoute> <ChangePassword/> </ProtectedRoute>}/>
      <Route path="/product/:id" element={ <ProtectedRoute> <ProductDetails/> </ProtectedRoute>}/>
      <Route path="/register" element={  <Register/>}/>
     
    </Routes>
    </BrowserRouter>
  );
}

export default App;
