import jwt from "jsonwebtoken";

export const protect =(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            return res.status(401).json({message:"No token provided"})
        }
        const token =authHeader.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json({message:"Invalid token"})
    }
}



export const adminOnly = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Authentication required"});
    }
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access required"});
    }
    next();
};

