const Redis = require("ioredis");
const dotenv = require("dotenv");
dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST, // Update to use environment variable
  port: process.env.REDIS_PORT || 6379,
});

module.exports = redis;
