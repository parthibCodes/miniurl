import { consumeToken } from "../services/redis_bucket.js";

export const tokenBucketLimiter = async (req,res,next) =>{
    try {
        const identifier = req.ip;
        const result = await consumeToken(identifier);    
        if(!result.allowed){
            return res.status(429).json({ success: false, message: "Too many requests", retryAfter: result.retryAfter });
        }
        next();
    } catch (error) {
        console.error("Rate limiter error: ",error);
        return res.status(500).json({ success: false, message: "Internal rate limiter error" });
    }
}