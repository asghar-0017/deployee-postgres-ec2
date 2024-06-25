const dotenv = require("dotenv");
dotenv.config();

const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST || 'redis', // Use the Redis service name defined in docker-compose.yml
  port: process.env.REDIS_PORT || 6379, // Default Redis port
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redis;
