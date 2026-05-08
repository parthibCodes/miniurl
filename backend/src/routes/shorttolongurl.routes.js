import { Router } from "express";
import { retrieveUrl } from "../controllers/retrieveUrl.js";
import { tokenBucketLimiter } from "../middlewares/rate-limiter.js";
const router = Router();

router.get("/:short_code",tokenBucketLimiter,retrieveUrl);

export default router;