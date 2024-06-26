// Redis Configuration
const redis = require('redis');
const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// PostgreSQL Configuration
const { Client } = require('pg');
const pgClient = new Client({
  host: '172.20.192.1',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres'
});

pgClient.connect(err => {
  if (err) {
    console.error('PostgreSQL connection error:', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});
