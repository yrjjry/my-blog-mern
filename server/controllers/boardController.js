import BoardMessage from "../models/BoardMessage.js";

export const getMessage = async(req,res)=>{
    try {
        const messages = await BoardMessage.find()
                                           .populate("author","username")
                                           .sort({createdAt:-1})
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const createMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        if(!message || !message.trim()){
            return res.status(400).json({
                message:"Message cannot be empty"
            })
        }
        const newMessage = await BoardMessage.create({
            message:message.trim(),
            author:req.user.id
        })

        const populateMessage = await newMessage.populate(
            "author","username"
        )

        res.status(201).json(populateMessage);

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}