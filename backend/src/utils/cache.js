import { redisClient } from "../config/redis.js";

// Get cached data
export const getCache = async (key) => {
  try {
    if (!redisClient.isReady) return null;

    const cachedData = await redisClient.get(key);

    if (!cachedData) return null;

    return JSON.parse(cachedData);
  } catch (error) {
    console.error("Redis cache read error:", error.message);
    return null;
  }
};

// Store data in Redis
export const setCache = async (key, data, expiration = 120) => {
  try {
    if (!redisClient.isReady) return;

    const result = await redisClient.set(key, JSON.stringify(data), {
      EX: expiration,
    });

    console.log(`Redis cache SET: ${key}`, result);
  } catch (error) {
    console.error("Redis cache write error:", error.message);
  }
};

// Delete a cache entry
export const deleteCache = async (key) => {
  try {
    if (!redisClient.isReady) return;

    await redisClient.del(key);
  } catch (error) {
    console.error("Redis cache delete error:", error.message);
  }
};
