import express from "express";
import { getPosts,getPost,createPost,updatePost,deletePost } from "../controllers/postController.js";
import {protect} from "../middlewares/addMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", protect,upload.single("attachment"),createPost);
router.put("/:id", protect,upload.single("attachment"),updatePost);
router.delete("/:id", protect,deletePost);



export default router;