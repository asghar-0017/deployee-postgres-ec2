const Redis = require('ioredis');

const redisClient = new Redis({
  host: 'redis',
  port: 6379,
  // other options if needed
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redisClient;
