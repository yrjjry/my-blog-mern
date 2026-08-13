import Post from "../models/Post.js";

export const getPosts = async (req, res, next) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search && search.trim() !== "") {
            query = {
                title: {
                    $regex: search.trim(),
                    $options: "i"
                }
            };
        }

        const posts = await Post.find(query)
            .populate("author", "username");
        res.json(posts);

    } catch (error) {
        next(error);
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "username");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    console.log("Uploaded file:");
    console.log(req.file);
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user.id,
            attachment: req.file
        ? {
            originalName: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path
          }
        : undefined
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }
        await post.deleteOne();
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(
            req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
       
        post.title = req.body.title;
        post.content = req.body.content;

        if(req.file){
            post.attachment = {
                originalName: req.file.originalname,
                filename:req.file.filename,
                path:req.file.path
            }
        }
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}