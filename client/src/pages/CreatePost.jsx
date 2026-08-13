import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import TextEditor from "../components/editor/TextEditor";
import "../style/CreatePost.css";

function CreatePost() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [attachment, setAttachment] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            if (attachment) {
                formData.append("attachment",attachment);
            }
            await api.post("/posts",formData);

            alert("Post created successfully!");
            navigate("/");

        } catch (error) {
            console.error(error);
            alert("Failed to create post.");
        }
    };

    return (
        <main className="create-post">
            {/* Header */}
            <header className="create-post-header">
                <p className="create-post-eyebrow">
                    JOURNAL · WRITING
                </p>
                <h1>Create New Post</h1>
                <p className="create-post-intro">
                    Write something worth keeping.
                </p>
            </header>
            {/* Form */}
            <form
                className="create-post-form"
                onSubmit={handleSubmit}
            >
                {/* Title */}
                <div className="create-field">
                    <label htmlFor="post-title">
                        Title
                    </label>
                    <input
                        id="post-title"
                        className="create-title-input"
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        placeholder="Give your post a title..."
                        required
                    />
                </div>
                {/* Content */}
                <div className="create-field">
                    <label>Content</label>
                    <div className="create-editor">
                        <TextEditor
                            content={content}
                            setContent={setContent}
                            setAttachment={setAttachment}/>
                    </div>
                    {/* Attachment */}
                    {attachment && (
                        <div className="attachment-preview">
                            <div className="attachment-info">
                                <span className="attachment-icon">📄</span>
                                <span>{attachment.name}</span>
                            </div>
                            <button
                                type="button"
                                className="remove-attachment"
                                onClick={() =>setAttachment(null)}
                            >Remove
                            </button>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="create-post-actions">
                    <button
                        type="button"
                        className="create-cancel-button"
                        onClick={() =>
                            navigate("/")
                        }
                    >Cancel</button>
                    <button
                        type="submit"
                        className="create-publish-button"
                    >Publish</button>
                </div>
            </form>
        </main>
    );
}


export default CreatePost;
