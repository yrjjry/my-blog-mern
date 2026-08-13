import { useEffect, useState,useContext } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import AuthContext from "../context/AuthContext";
import "../style/shop.css";
import { Link } from "react-router-dom";

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to load products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="shop">
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className="shop">
            <header className="shop-header">
                <p className="shop-eyebrow">SECOND-HAND · OBJECTS · MUSIC</p>
                <h1>Shop</h1>
                <p className="shop-intro">
                    A small collection of things looking for a new home.
                </p>
                 {user?.role === "admin" && (
            <Link
                to="/admin/products/new"
                className="shop-add-product-button"
            >
                + Add Product
            </Link>
        )}
            </header>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Shop;
