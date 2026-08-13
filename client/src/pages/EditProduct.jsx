import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import AuthContext from "../context/AuthContext";
import { getImageUrl } from "../utils/imageUtils";
import "../style/EditProduct.css";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading: authLoading } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "", price: "", condition: "", category: "",
        description: "", location: "", shipping: "",
        available: true, images: []
    });
    // Admin Permission
    useEffect(() => {
        if (authLoading) {return;}
        if (!user) {navigate("/login");return;}

        if (user.role !== "admin") {navigate("/");return;}

        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                const product = response.data;
                setFormData({
                    title: product.title || "",
                    price: product.price ?? "",
                    condition: product.condition || "",
                    category: product.category || "",
                    description: product.description || "",
                    location: product.location || "",
                    shipping: product.shipping || "",
                    available: product.available ?? true,
                    images: Array.isArray(product.images)
                        ? product.images
                        : []
                });

            } catch (error) {
                console.error("Failed to load product:",error);
                alert("Failed to load product.");
                navigate("/admin/products");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [user, authLoading, id, navigate]);

    // Handle Input
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value
        }));
    };
    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await api.put(`/products/${id}`,
                {
                    ...formData,
                    price: Number(formData.price)
                }
            );
            alert("Product updated successfully.");
            navigate("/admin/products");
        } catch (error) {
            console.error("Failed to update product:", error);
            alert("Failed to update product.");

        } finally {
            setSaving(false);
        }

    };
    const handleRemoveImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter(
                (_, imageIndex) => imageIndex !== index
            )
        }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
            return;
        }
        try {
            const uploadedImages = [];
            for (const file of files) {
                const data = new FormData();
                data.append("image", file);
                const response =
                    await api.post(
                        "/upload/image",
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
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...uploadedImages]
            }));

        } catch (error) {
            console.error("Failed to upload image:", error);
            alert("Failed to upload image.");
        }
        // Allow selecting the same file again
        e.target.value = "";
    };

    // Loading
    if (authLoading || loading) {
        return (
            <div className="edit-product">
                <p>Loading...</p>
            </div>
        );
    }

    // Form
    return (
        <div className="edit-product">
            <div className="edit-product-header">
                <p className="admin-eyebrow">
                    ADMINISTRATION
                </p>
                <h1>Edit Product</h1>
            </div>
            <form className="edit-product-form"
                onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="condition">Condition</label>
                    <input
                        id="condition"
                        name="condition"
                        type="text"
                        value={formData.condition}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        id="category"
                        name="category"
                        type="text"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="8"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                {/* Product Images */}
                <div className="form-group">
                    <label>Product Images</label>
                    {formData.images.length > 0 && (
                        <div className="edit-product-images">
                            {formData.images.map(
                                (image, index) => (
                                    <div className="edit-product-image"
                                        key={`${image}-${index}`}>
                                        <img
                                            src={getImageUrl(image)}
                                            alt={`${formData.title} ${index + 1
                                                }`} />
                                        <button type="button"
                                            className="remove-image-button"
                                            onClick={() => handleRemoveImage(index)
                                            }
                                        >Remove</button>
                                    </div>))}
                        </div>
                    )}
                    <label htmlFor="product-images" className="upload-image-button">
                        + Add Images
                    </label>
                    <input
                        id="product-images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        hidden
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="shipping">Shipping</label>
                    <input
                        id="shipping"
                        name="shipping"
                        type="text"
                        value={formData.shipping}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-checkbox">
                    <label>
                        <input
                            type="checkbox"
                            name="available"
                            checked={formData.available}
                            onChange={handleChange}
                        />
                        Available for sale
                    </label>
                </div>
                <div className="edit-product-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() =>
                            navigate("/admin/products")}
                    >Cancel</button>
                    <button
                        type="submit"
                        className="save-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : "Update Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}


export default EditProduct;
