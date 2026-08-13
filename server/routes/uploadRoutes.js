import express from "express";
import upload from "../middlewares/upload.js";
import { uploadImage } from "../controllers/uploadControllers.js";

const router = express.Router();

router.post("/image",upload.single("image"),uploadImage);

export default router;