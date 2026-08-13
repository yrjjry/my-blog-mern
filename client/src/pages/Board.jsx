import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import AuthContext from "../context/AuthContext";
import "../style/board.css"

function Board() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);

    // get messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get("/board");
                setMessages(response.data);
            } catch (error) {
                console.error("Failed to load board:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    // submit message
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) {return;}
        try {
            const response = await api.post("/board", {
                message: message
            });
            // post new message at top most
            setMessages((prevMessages) => [
                response.data,
                ...prevMessages
            ]);
            // clear input 
            setMessage("");
        } catch (error) {
            console.error("Failed to post message:", error);
        }
    };

    return (
        <div className="board">
            <h1>Guest Board</h1>
            {/* text area  */}
            {user ? (
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Leave a message..."
                        rows="5"
                    />
                    <button type="submit">Leave a Message</button>
                </form>
            ) : (<div>
                    <p>Please login to leave a message.</p>
                    <Link to="/login" state={{ from: "/board" }}><button>Login</button></Link>
                </div>
            )}
            {/* message list */}
            <div className="board-messages">
            {loading ? (<p>Loading...</p>) : messages.length === 0 ? (
                <p>No messages yet.</p>) : (
                messages.map((item) => (
                    <div className="board-message"
                        key={item._id}>
                        <div className="message-info">
                            <span>
                                👤 {item.author?.username || "Unknown"}
                            </span>
                            <span>
                                📅{" "}
                                {new Date(
                                    item.createdAt
                                ).toLocaleDateString()}
                            </span>
                        </div>
                        <p>{item.message}</p>
                    </div>
                            )))}
            </div>
        </div>
    );
}

export default Board;