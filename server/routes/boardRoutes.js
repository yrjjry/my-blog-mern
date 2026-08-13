import express from "express";
import {getMessage,createMessage} from "../controllers/boardController.js";

import {protect}  from "../middlewares/addMiddleware.js";

const router = express.Router();


// ========================================
// Public
// ========================================

// Anyone can read board messages
router.get("/", getMessage);


// ========================================
// Logged-in users
// ========================================

// Only logged-in users can create messages
router.post("/", protect, createMessage);


export default router;