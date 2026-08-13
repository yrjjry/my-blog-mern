import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {type: String,required: true,trim: true},
        description: {type: String,required: true},
        price: {type: Number,required: true,min: 0},
        images: [{type: String}],
        condition: {
            type: String,
            enum: ["New","Like New","Very Good","Good","Fair"],
            default: "Good"
        },
        category: {type: String,trim: true},
        location: {type: String,trim: true},
        shipping: {type: String,default: "Available"},
        available: {type: Boolean,default: true}
    },
    {timestamps: true}
);

const Product = mongoose.model("Product", productSchema);
export default Product;

