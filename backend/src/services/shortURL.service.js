import { connectDB } from "../config/db.js";
const pool = await connectDB();
import { URL } from "url";
import { encoderBase62 } from "../services/encode.service.js";
import { decoderBase62 } from "../services/decode.service.js";

export const convertToShortUrl = async(rawUrl) =>{
    const canonicalize = new URL(rawUrl);
    const { rows } = await pool.query(`INSERT INTO url(long_url) VALUES($1) RETURNING id`,[canonicalize.href]);
    const id = rows[0].id;
    const shortened_code = encoderBase62(id);
    await pool.query(`UPDATE url SET short_code = $1 WHERE id = $2`,[shortened_code,id]);
    return shortened_code;
}

export const retriveFromShortUrl = async(str) =>{
    const decoded_id = decoderBase62(str);
    const result = await pool.query(`SELECT long_url FROM url WHERE short_code = $1`,[decoded_id]);
    console.log(result);
    if(result.rows.length === 0)throw new Error("URL is not found");
    return result.rows[0].long_code;
}