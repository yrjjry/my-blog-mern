import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthContext from "../context/AuthContext";
import "../style/AdminCreateProduct.css";

function AdminCreateProduct() {
    const { user, loading: authLoading } =useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "", price: "", condition: "",
        category: "", description: "", location: "",
        shipping: "", available: true
    });

    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (authLoading) {return;}
        if (!user) {
            navigate("/login");
            return;}
        if (user.role !== "admin") {
            navigate("/");}
                    }, [user, authLoading, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {return;}
        try {
            setUploading(true);
            const uploadedImages = [];
            for (const file of files) {
                const data = new FormData();
                data.append("image", file);
                const response = await api.post("/upload/image",
                                data,
                                    {
                                        headers: {
                                            "Content-Type":
                                            "multipart/form-data"
                                        }
                                    }
                );
                uploadedImages.push(
                    response.data.imageUrl
                );
            }
            setImages((prevImages) => [
                ...prevImages,
                ...uploadedImages
            ]);

        } catch (error) {
            console.error("Failed to upload image:",error);
            alert("Failed to upload image.");

        } finally {
            setUploading(false);
            // Allow selecting the same file again
            e.target.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            alert("Please enter a product title.");
            return;
        }
        if (!formData.price) {
            alert("Please enter a price.");
            return;
        }
        if (!formData.description.trim()) {
            alert("Please enter a description.");
            return;
        }

        try {
            setLoading(true);
            await api.post(
                "/products",
                {
                    ...formData,
                    price: Number(formData.price),
                    images: images
                }
            );
            navigate("/admin/products");

        } catch (error) {
            console.error(
                "Failed to create product:",
                error
            );
            alert(
                error.response?.data?.message ||
                "Failed to create product."
            );
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="admin-create-product">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="admin-create-product">
            <Link
                to="/admin/products"
                className="admin-back-link"
            >← Back to Products</Link>
            <header className="admin-create-header">
                <p className="admin-eyebrow">ADMINISTRATION</p>
                <h1>Add Product</h1>
                <p>Add a new object to your shop.</p>
            </header>
            <form className="product-form" onSubmit={handleSubmit}>
            {/* Title */}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Martin 000-15M"/>
                </div>
                {/* Price */}
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="1200"/>
                </div>
                {/* Condition */}
                <div className="form-group">
                    <label htmlFor="condition">Condition</label>
                    <select
                        id="condition"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}>
                        <option value="">Select condition</option>
                        <option value="Like New">Like New</option>
                        <option value="Very Good">Very Good</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                    </select>
                </div>
                {/* Category */}
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        id="category"
                        name="category"
                        type="text"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="e.g. Guitar"
                    />
                </div>

                {/* Product Images */}
                <div className="form-group">
                    <label htmlFor="images">Product Images</label>
                    <input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                    />
                    {uploading && (
                        <p className="upload-status">
                            Uploading images...
                        </p>
                    )}
                    {images.length > 0 && (
                        <div className="image-preview-grid">
                            {images.map((image, index) => (
                                <div
                                    className="image-preview"
                                    key={index}
                                >
                                    <img
                                        src={image}
                                        alt={`Product ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="8"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Tell the story of this object..."/>
                </div>
                {/* Location */}
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Shanghai"/>
                </div>
                {/* Shipping */}
                <div className="form-group">
                    <label htmlFor="shipping">Shipping</label>
                    <input
                        id="shipping"
                        name="shipping"
                        type="text"
                        value={formData.shipping}
                        onChange={handleChange}
                        placeholder="e.g. Available"/>
                </div>
                {/* Available */}
                <div className="form-checkbox">
                    <input
                        id="available"
                        name="available"
                        type="checkbox"
                        checked={formData.available}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                available:
                                    e.target.checked
                            }))}/>
                    <label htmlFor="available">Available for sale</label>
                </div>
                {/* Submit */}
                <div className="form-actions">
                    <Link
                        to="/admin/products"
                        className="cancel-button"
                    >Cancel</Link>
                    <button type="submit" disabled={loading}>
                        {loading
                            ? "Creating..."
                            : "Create Product"}</button>
                </div>
            </form>
        </div>
    );
}


export default AdminCreateProduct;
