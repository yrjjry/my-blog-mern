import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthContext from "../context/AuthContext";
import "../style/AdminProducts.css";
import { getImageUrl } from "../utils/imageUtils";

function AdminProducts() {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (loading) { return; }
        // Not logged in
        if (!user) {
            navigate("/login");
            return;
        }
        // Not admin
        if (user.role !== "admin") {
            navigate("/");
            return;
        }
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products");
                setProducts(response.data);
            } catch (error) {
                console.error(
                    "Failed to load products:",
                    error
                );
            }
        };
        fetchProducts();
    }, [user, navigate, loading]);
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) { return; }
        try {
            await api.delete(`/products/${id}`);
            setProducts((prevProducts) =>
                prevProducts.filter(
                    (product) =>
                        product._id !== id));
        } catch (error) {
            console.error("Failed to delete product:", error);
            alert("Failed to delete product.");
        }
    };

    if (loading) {
        return (
            <div className="admin-products">
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className="admin-products">
            <div className="admin-products-header">
                <div>
                    <p className="admin-eyebrow">
                        ADMINISTRATION</p>
                    <h1>Products</h1>
                </div>
                <Link
                    to="/admin/products/new"
                    className="admin-add-button"
                >+ Add Product</Link>
            </div>
            {products.length === 0 ? (
                <div className="admin-empty">
                    <p>No products yet.</p>
                    <Link to="/admin/products/new">
                        Create your first product
                    </Link>
                </div>
            ) : (
                <div className="admin-product-list">
                    {products.map((product) => (
                        <div
                            className="admin-product-row"
                            key={product._id}>
                            <div className="admin-product-image">
                                {product.images?.[0] ? (
                                    <img
                                        src={getImageUrl(product.images[0])}
                                        alt={product.title}
                                    />
                                ) : (
                                    <span>No Image</span>)}
                            </div>
                            <div className="admin-product-info">
                                <h2>{product.title}</h2>
                                <p>€{product.price}</p>
                            </div>
                            <div className="admin-product-status">
                                {product.available
                                    ? "Available"
                                    : "Sold"}
                            </div>
                            <div className="admin-product-actions">
                                <Link
                                    to={`/admin/products/${product._id}/edit`}
                                    className="admin-edit-button"
                                >Edit</Link>
                                <button
                                    type="button"
                                    className="admin-delete-button"
                                    onClick={() =>
                                        handleDelete(
                                            product._id
                                        )
                                    }>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminProducts;

