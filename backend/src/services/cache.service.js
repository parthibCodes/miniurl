import { client } from "../config/redis.js";

export const encachingData = async (shortCode,longUrl) => {
    const redisKey = `url:${shortCode}`;
    const value = await client.get(shortCode);
    if(!value){
        await client.setEX(redisKey,3600,longUrl);
        console.log("data is cached");
    }
}

export const decachingData = async (shortCode) =>{
    const redisKey = `url:${shortCode}`;
    const value = await client.get(redisKey);
    if(value){
        console.log("Data is in the cache memory");
        return value;
    }
}