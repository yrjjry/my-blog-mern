import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import "../../style/editor.css"
import { useRef,useEffect } from "react";
import Image from "@tiptap/extension-image";
import api from "../../api/axios";

function TextEditor({ content, setContent, setAttachment }) {
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const isFirstLoad = useRef(true);
    const editor = useEditor({
        extensions: [StarterKit,  Image.configure({
        inline: false,
        allowBase64: false
    })],
        content: content,
        onUpdate({ editor }) {
            console.log("CONTENT UPDATED");

    console.log(editor.getHTML());
            setContent(editor.getHTML());
        },
    });
   useEffect(()=>{

    if(!editor){
        return;
    }


    if(isFirstLoad.current && content){

        editor.commands.setContent(content,false);

        isFirstLoad.current = false;

    }

},[editor,content]);

    return (
        <div className="editor-container">
           <MenuBar editor={editor} onAttachmentClick={() => {
                    fileInputRef.current.click();}} 
                    onImageClick={() => {imageInputRef.current.click();
                    }}/>
            <EditorContent editor={editor} />
            <input ref={fileInputRef} type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                    setAttachment(e.target.files[0]);
                }} />
            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append("image", file);
                    try {
                        const response = await api.post("/upload/image",formData);
                        editor.chain()
                              .focus()
                              .setImage({
                                    src: response.data.imageUrl
                                        })
                              .run();
                        // 立即同步 React state
                    } catch (error) {
                        console.error(error);
                        alert("Image upload failed.");
                    } }}/>
        </div>
    )
}

export default TextEditor;