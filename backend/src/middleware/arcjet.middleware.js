import aj from '../lib/arcjet.js';
import {isSpoofedBot} from '@arcjet/inspect';

export const arjectProtection = async(req,res,next)=> {
    try {
        const decision = await aj.protect(req);
        if(decision.isDenied()) {
            if(decision.reason.isRateLimit()) {
                return res.status(429).json({messege:"rate limit exceeded. Pleace try again later"});
            }
            if(decision.reason.isBot()) {
                return res.status(403).json({messege:"Bot acccess denied"});
            }
            else {
                return res.status(403).json({messege:"Access denied by security policies"});
            }
        }
        if(decision.results.isSpoofedBot()) {
            return res.status(403).json({
                error:"Spoofed bot detected",
                messege:"Malicious bot activity detcted"
            });
        }
        next();
    } catch (error) {
        console.log("Arject Protection Error ",error);
        next();
    }
}