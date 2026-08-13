import Product from "../models/product.js";

export const createProduct = async (req, res) => {
    try {
        const {title,description,price,images,condition,
            category,location,shipping} = req.body;

        const product = await Product.create({
            title,description,price,images,
            condition,category,location,shipping});
        res.status(201).json(product);

    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({
            message: "Failed to create product"});
    }
};


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 });
        res.status(200).json(products);

    } catch (error) {
        console.error("Get products error:", error);
        res.status(500).json({
            message: "Failed to get products"});
    }
};

// get single product
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"});
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Get product error:", error);
        res.status(500).json({
            message: "Failed to get product"});
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {returnDocument: "after",runValidators: true}
        );
        if (!product) {
            return res.status(404).json({
                message: "Product not found"});
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Update product error:", error);
        res.status(500).json({
            message: "Failed to update product"});
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"});
        }
        res.status(200).json({
            message: "Product deleted successfully"});

    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({
            message: "Failed to delete product"});
    }
};


// Upload Product Images
export const uploadProductImages = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"});}
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: "No images uploaded"});}

        const imagePaths = req.files.map(
            (file) => `/uploads/${file.filename}`);

        product.images.push(...imagePaths);
        await product.save();
        res.status(200).json(product);

    } catch (error) {
        console.error("Upload product images error:", error);
        res.status(500).json({
            message: "Failed to upload product images"});
    }
};

