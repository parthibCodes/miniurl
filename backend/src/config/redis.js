import {createClient} from "redis";
import dotenv from "dotenv";
dotenv.config();


const client = createClient();

client.on("error",(error)=>console.log("Redis Client Error",error));

await client.connect();

export { client };
