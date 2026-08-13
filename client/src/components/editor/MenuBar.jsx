
function MenuBar({ editor,fileInputRef,onAttachmentClick,onImageClick }) {
    if (!editor) return null;
    return (
        <div className="toolbar">
            <button type="button"
                className={editor.isActive("bold") ? "active" : ""}
                onClick={() => editor.chain().focus().toggleBold().run()
                }>B</button>
            <button type="button"
                className={editor.isActive("italic") ? "active" : ""}
                onClick={() => editor.chain().focus().toggleItalic().run()
                }>I</button>
            <button type="button"
                className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()
                }>H2</button>
            <button type="button"
                className={editor.isActive("bulletList") ? "active" : ""}
                onClick={() => editor.chain().focus().toggleBulletList().run()
                }>List</button>
            <button type="button"
                onClick={() => editor.chain().focus().undo().run()}>
                Undo
            </button>
            <button type="button"
                onClick={() => editor.chain().focus().redo().run()}>
                Redo
            </button>
            <button type="button" onClick={onImageClick}>🖼️
            </button>
            <button type="button"
                onClick={onAttachmentClick}>
                📎
            </button>
        </div>
    );
}

export default MenuBar;