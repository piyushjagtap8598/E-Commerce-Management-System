
import './App.css';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';

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
    </Routes>
    </BrowserRouter>
  );
}

export default App;
