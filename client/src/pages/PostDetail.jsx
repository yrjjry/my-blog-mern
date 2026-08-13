import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axios"
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../style/PostDetail.css";
import { getImageUrl } from "../utils/imageUtils";


function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPost();
    }, [id])
    if (!post) {
        return <h2>Loading...</h2>
    }
    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (!confirmed) { return }
        try {
            await api.delete(`/posts/${post._id}`)
            alert("Post deleted!")
            navigate("/")
        } catch (error) {
            console.error(error);
            alert("Delete failed.");
        }
    }

    return (
        <div className="post-detail">
            <h1>{post.title}</h1>
            <div className="detail-info">
                <span>
                    👤 {post.author?.username}
                    📅 {new Date(post.createdAt).toLocaleDateString()
                    }
                </span>
            </div>
            {/* <p>{post.content}</p> */}
            <div className="post-content"
                dangerouslySetInnerHTML={{ __html: post.content }} />
            {
                post.attachment && (
                    <div className="attachment-section">
                        <h3>📎 Attachment</h3>
                        <p>
                            {post.attachment.originalName}
                        </p>
                        <a
                            href={getImageUrl(`/${post.attachment.path}`)}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <button>Download</button>
                        </a>
                    </div>
                )
            }
            {user?.role === "admin" && (<div className="owner-actions">
                <Link to={`/posts/${post._id}/edit`}>
                    <button>Edit</button></Link>
                <button onClick={handleDelete}>Delete</button>
            </div>)}
        </div>
    )
}

export default PostDetail;