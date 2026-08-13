import { getImageUrl } from "../utils/imageUtils";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function ProductCard({ product }) {
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();
    const imageUrl = product.images?.[0]
        ? getImageUrl(product.images[0])
        : null;
    const handleEdit = (e) => { 
        // Prevent the parent Link from opening 
        e.preventDefault(); 
        // Prevent event bubbling 
        e.stopPropagation(); 
        navigate( `/admin/products/${product._id}/edit` ); };
    return (
        <Link to={`/shop/${product._id}`}
              className="product-card">
            <div className="product-image">
                {imageUrl ? (
                    <img src={imageUrl}
                        alt={product.title}/>
                ) : (<div className="no-image">No Image</div>)}
                {!product.available && (
                    <span className="sold-label">
                        SOLD</span>
                )}
            </div>
            <div className="product-info">
                <h2>{product.title}</h2>
                {product.condition && (
                    <p className="product-condition">
                        {product.condition}</p>)}
                <p className="product-price">
                    €{product.price}
                </p>
                {/* Admin Edit */} 
                {user?.role === "admin" && ( 
                        <button type="button" 
                                className="product-edit-button" 
                                onClick={handleEdit} > Edit 
                        </button> )}
            </div>
        </Link>
    );
}

export default ProductCard;

