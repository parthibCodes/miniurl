import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { updateClickCountInDB } from "./workers/update_click_count_db.js";
import requestLogger from "./middlewares/requestLogger.js";
import requetIdMiddleware from "./middlewares/requestIdForLogger.js";

const pool = await connectDB();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(requetIdMiddleware);
app.use(requestLogger);

const data = await pool.query(`SELECT current_database()`);
console.log(`connected with database ${data.rows[0].current_database}`);

updateClickCountInDB();

import shortUrl from "./routes/longtoshorturl.routes.js";
app.use("/api/v0",shortUrl);

import longUrl from "./routes/shorttolongurl.routes.js";
app.use("/api/v0",longUrl);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});