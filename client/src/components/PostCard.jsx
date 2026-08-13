import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { getExcerpt } from "../utils/textUtils";
import "../style/PostCard.css";


function PostCard({ post }) {
    const { user } = useContext(AuthContext);
    return (
        <div className="post-card">
            <Link to={`/posts/${post._id}`} className="post-title-link"><h2>{post.title}</h2></Link>
            
             <div className="post-excerpt">
                {getExcerpt(post.content, 150)}
            </div>
            <div className="post-info">
                <span>
                    👤 {post.author?.username || "Unknown"}
                </span>
                <span>
                    📅 {new Date(post.createdAt).toLocaleDateString()
                    }
                </span>
            </div>
            <Link to={`/posts/${post._id}`}>
                <button className="read-button">Read More</button>
            </Link>
        </div>
    )
}

export default PostCard;