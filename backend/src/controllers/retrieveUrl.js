import { connectDB } from "../config/db.js";
import { apiError } from "../utils/apiError.js";
const pool = await connectDB();
import { decachingData, encachingData } from "../services/cache.service.js";
import { increaseClickCounter } from "../services/click_analytics.service.js";
import { logCache, logError, logRedirect } from "../logger/events.js";


export const retrieveUrl = async (req,res) =>{
    const shortCode = req.params.short_code;
    if(!shortCode){
        throw new apiError(400,"short code is not valid");
    }
    try {
        const cachedUrl = await decachingData(shortCode);
        if(cachedUrl){
            await increaseClickCounter(shortCode);
            logRedirect(req,{ shortCode, ip: req.ip, status: "success" ,source:"cache"});
            return res.redirect(302, cachedUrl);
        }
        else{
            const result = await pool.query(`SELECT long_url FROM url WHERE short_code = $1`,[shortCode]);
            if(result.rows.length === 0){
                throw new apiError(404,"There is no original url corresponding to the short url");
            }
            const original_url = result.rows[0].long_url;
            await encachingData(shortCode,original_url);
            await increaseClickCounter(shortCode);
            logCache(req,{ shortCode, original_url, ip: req.ip, status: "success",source:"database"});
            return res.redirect(302,original_url);
        }
    } catch (error) {
        console.error(error);
        logError(req,{ error: error.message, ip: req.ip });
        throw new apiError(500,error.message);
    }
};