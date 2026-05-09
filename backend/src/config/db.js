import {Pool} from "pg";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () =>{
    const pool = new Pool({
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        database:process.env.DB_DATABASE,
    });
    pool.on("connect",()=>{
        console.log("Connected to the DB successfully");
    });
    pool.on("error",(error)=>{
        console.error("something went wrong during db connection",error);
    });
    return pool;
};