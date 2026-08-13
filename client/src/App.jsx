import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import './App.css'
import PostDetail from "./pages/PostDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import EditPost from "./pages/EditPost";
import Shop from "./pages/Shop";
import Board from "./pages/Board";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";
import ProductDetail from "./pages/ProductDetail";
import AdminProducts from "./pages/AdminProducts";
import AdminCreateProduct from "./pages/AdminCreateProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/create"  element={<AdminRoute><CreatePost /></AdminRoute>}/>
        <Route path="/board" element={<Board />}/>
        <Route path="/posts/:id/edit"  element={<AdminRoute><EditPost /></AdminRoute>
    }/>
        <Route path="/posts/:id" element={<PostDetail />}/>
        <Route path="/shop" element={<Shop />}/>
        <Route path="/shop/:id" element={<ProductDetail />}/>
        <Route path="/admin/products" element={<AdminProducts />}/>
        <Route path="/admin/products/:id/edit" element={<EditProduct />}
/>
        <Route path="/admin/products/new" element={<AdminCreateProduct />}
/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;