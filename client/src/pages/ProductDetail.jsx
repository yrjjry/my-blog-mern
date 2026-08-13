
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import "../style/ProductDetail.css";
import { getImageUrl } from "../utils/imageUtils";

function ProductDetail() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    // Fetch Product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);

            } catch (error) {
                console.error(
                    "Failed to load product:", error
                );
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Loading
    if (loading) {
        return (
            <div className="product-detail">
                <p>Loading...</p>
            </div>
        );
    }

    // Product Not Found
    if (!product) {
        return (
            <div className="product-detail">
                <p>Product not found.</p>
                <Link to="/shop">← Back to Shop</Link>
            </div>
        );
    }
    // Image URL
    const imageUrl =
        product.images?.[selectedImage]
            ? getImageUrl(product.images[selectedImage])
            : null;
    return (
        <div className="product-detail">
            <Link to="/shop" className="back-to-shop">
                ← Back to Shop</Link>
            <div className="product-detail-content">
                <div className="product-gallery">
                    {/* Main Image */}
                    <div className="product-main-image">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={product.title}
                            />
                        ) : (
                            <div className="no-image">No Image</div>
                        )}
                        {/* SOLD */}
                        {!product.available && (
                            <span className="sold-label">SOLD</span>
                        )}
                    </div>
                    {product.images?.length > 1 && (
                        <div className="product-thumbnails">
                            {product.images.map(
                                (image, index) => {
                                    return (
                                        <button key={image}
                                            type="button"
                                            className={selectedImage === index
                                                ? "thumbnail active"
                                                : "thumbnail"
                                            }
                                            onClick={() => setSelectedImage(index)}
                                        >
                                            <img
                                                src={getImageUrl(image)}
                                                alt={`${product.title} ${index + 1}`}
                                            />
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    )}
                </div>
                <div className="product-detail-info">
                    <p className="product-detail-eyebrow">
                        {product.category || "SECOND-HAND OBJECT"}
                    </p>
                    <h1>{product.title}</h1>
                    <p className="product-detail-price">€{product.price}</p>
                    <div className="product-detail-description">
                        <h2>Description</h2>
                        <p>{product.description}</p>
                    </div>
                    <div className="product-detail-meta">
                        {product.condition && (
                            <div className="meta-row">
                                <span>Condition</span>
                                <strong>{product.condition}</strong>
                            </div>
                        )}
                        {product.location && (
                            <div className="meta-row">
                                <span>Location</span>
                                <strong>{product.location}</strong>
                            </div>
                        )}
                        {product.shipping && (
                            <div className="meta-row">
                                <span>Shipping</span>
                                <strong>{product.shipping}</strong>
                            </div>
                        )}
                    </div>
                    {!product.available && (
                        <div className="sold-message">
                            This item has been sold.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export default ProductDetail;
