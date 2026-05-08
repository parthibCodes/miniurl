import { client } from "../config/redis.js";
import { apiError } from "../utils/apiError.js";

const bucket_capacity = process.env.BUCKET_SIZE || 5;
const refill_rate = process.env.BUCKET_TIME || 1;

export const consumeToken = async (identifier) => {
  const key = `bucket:${identifier}`;
  const now = Date.now();
  const MAX_RETRIES = 3;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    await client.watch(key);
    const bucket = await client.hGetAll(key);
    let tokens;
    let lastRefill;
    if (Object.keys(bucket).length === 0) {
      tokens = bucket_capacity;
      lastRefill = now;
    } else {
      lastRefill = parseInt(bucket.lastRefill);
      const elapsedTime = (now - lastRefill) / 1000;
      const tokensToAdd = elapsedTime * refill_rate;
      tokens = parseFloat(bucket.tokens);
      tokens = Math.min(bucket_capacity, tokens + tokensToAdd);
      lastRefill = now;
    }
    const allowed = tokens >= 1;
    const newTokenCount = allowed ? tokens - 1 : tokens;

    const multi = client.multi();
    multi.hSet(key, {
      tokens: newTokenCount.toString(),
      lastRefill: lastRefill.toString(),
    });
    multi.expire(key, 3600);
    const result = await multi.exec();
    if (result !== null) {
      return {
        allowed,
        remaining: Math.floor(newTokenCount),
        retryAfter: allowed ? null : Math.ceil(1 / refill_rate),
      };
    }
  }
  throw new apiError(429, "Rate limiter transaction failed after max retries");
};
