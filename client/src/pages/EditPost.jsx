import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import TextEditor from "../components/editor/TextEditor";

function EditPost(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [currentAttachment, setCurrentAttachment] = useState(null);

    // Get Old Post Data
    useEffect(()=>{
    const fetchPost = async()=>{
            try{
                const response = await api.get(`/posts/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
                setCurrentAttachment(response.data.attachment || null);
            }catch(error){
                console.error(error);
            }
        };
        fetchPost(); },[id]);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        await api.put(`/posts/${id}`,{title,content});
        navigate(`/posts/${id}`);

    }catch(error){
        console.error(error);
    }
}

    return (
        <div>
            <h1>  Edit Post</h1>
            <form onSubmit={handleSubmit}>
            <input value={title}
                   onChange={e=>setTitle(e.target.value)}/>
            <br/><br/>
            {/* <textarea value={content}
                      onChange={e=>setContent(e.target.value)}/> */}
            <TextEditor 
                    content={content} setContent={setContent}
                    setAttachment={setAttachment}/>
            <br/><br/>
            {
            currentAttachment && !attachment && (
                <div className="attachment-preview">
                    <h3>📎 Current Attachment</h3>
                    <p>{currentAttachment.originalName}</p>
                    <a href={`${import.meta.env.VITE_SERVER_URL}/${currentAttachment.path}`}                        target="_blank"
                        rel="noreferrer">View Attachment</a>
                </div>)
            }
            {attachment && (
                <div className="attachment-preview">
                    <h3>📎 New Attachment</h3>
                    <p>{attachment.name}</p>
                </div>)}
            <button>Save Changes</button>
            </form>
        </div>
    )
}


export default EditPost;