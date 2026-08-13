import express from "express";
import {createProduct,getProducts,getProduct,
        updateProduct,deleteProduct,uploadProductImages} from "../controllers/productController.js";
import {protect,adminOnly} from "../middlewares/addMiddleware.js";
import productUpload from "../middlewares/productUpload.js";

const router = express.Router();

// Public;Get all products
router.get("/", getProducts);

// Public;Get one product
router.get("/:id", getProduct);

// Admin only;Create product
router.post("/",protect,adminOnly,createProduct);

// Admin only;Update product
router.put("/:id",protect,adminOnly,updateProduct);

// Admin only;Delete product
router.delete("/:id",protect,adminOnly,deleteProduct);

// Admin only;Upload product images
router.post(
    "/:id/images",
    protect,
    adminOnly,
    productUpload.array("images", 10),
    uploadProductImages
);

export default router;

