import mongoose from "mongoose";

 const boardMessageSchema = new mongoose.Schema({
    message:{type:String, required:true,trim: true},
    author:{type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
 },
 {timestamps:true})

 const BoardMessage = mongoose.model("BoardMessage", boardMessageSchema);
 export default BoardMessage;