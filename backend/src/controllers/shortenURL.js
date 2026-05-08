import { convertToShortUrl } from "../services/shortURL.service.js";
import { apiResponse } from "../utils/apiResponse.js";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../config/db.js";
import { logDB } from "../logger/events.js";
const pool = await connectDB();

export const shorten = async (req,res) =>{
    const { url } = req.body;
    const short_code = await convertToShortUrl(url);
    const short_url = `${process.env.BASE_URL}/${short_code}`;
    await pool.query(`UPDATE url SET short_url = $1 WHERE long_url = $2`,[short_url,url]);
    logDB(req,{ url, short_url });
    return res
    .status(201)
    .json(new apiResponse(201,"Short code is created successfully",short_url));
};