import { client } from "../config/redis.js";
import { connectDB } from "../config/db.js";

const pool = await connectDB();

export const updateClickCountInDB = async () => {
  setInterval(async () => {
    try {
      const iterator = client.scanIterator({
        MATCH: "click:*",
        COUNT: 100,
      });
      // const keys = await client.keys("click:*");
      for await (const keys of iterator) {
        for (const key of keys) {
          const count = parseInt(await client.getDel(key), 10);

          const shortCode = String(key).split(":")[1];

          if (count > 0) {
            await pool.query(
              `UPDATE url SET click_count = click_count + $1 WHERE short_code = $2`,
              [count, shortCode],
            );
          }
          // console.log("Updated click count for short code:", shortCode);
          // await client.del(key);
        }
      }
    } catch (error) {
      console.error("Sync job error: ", error.message);
    }
  }, 1000 * 60);
};
