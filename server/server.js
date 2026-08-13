import express from "express";
import postRouter from "./routes/postRoutes.js";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import crypto from "crypto";
import connectDB from "./config/db.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";
import uploadRouter from "./routes/uploadRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();

// ===== Middlewares =====
// 我要使用 Express，并创建一个网站服务器。
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use("/uploads", express.static("uploads"));

// ===== Routes =====
// Middleware to parse JSON bodies
app.use(express.json());
app.use(logger);

// ===== Start Server =====
//添加第一个路由

app.use("/api/posts", postRouter);

app.use("/api/posts/:id", postRouter);

app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/board", boardRoutes);
app.use("/api/products", productRoutes);


app.use(errorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});