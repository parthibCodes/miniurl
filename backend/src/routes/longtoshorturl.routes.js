import { Router } from "express";
import { shorten } from "../controllers/shortenURL.js";
import { tokenBucketLimiter } from "../middlewares/rate-limiter.js";
const router = Router();

router.route("/short-url",tokenBucketLimiter).post(shorten);

export default router;