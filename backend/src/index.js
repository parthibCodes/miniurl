import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { updateClickCountInDB } from "./workers/update_click_count_db.js";
import requestLogger from "./middlewares/requestLogger.js";
import requestIdMiddleware from "./middlewares/requestIdForLogger.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json" with { type : "json" };

const pool = await connectDB();
const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(cookieParser());
app.use(express.json());


app.use(requestIdMiddleware);
app.use(requestLogger);

app.use("/api/v0/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));

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