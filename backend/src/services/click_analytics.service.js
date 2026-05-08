import { client } from "../config/redis.js";

export const increaseClickCounter = async (shortCode) => {
  const key = `click:${shortCode}`;
  await client.incr(key);
  // console.log("click counter is increased");
};