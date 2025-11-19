const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-19934.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 19934,
        // simple reconnect strategy to avoid hard crashes
        reconnectStrategy: retries => Math.min(retries * 50, 5000)
    }
});

// Prevent unhandled exceptions from Redis by listening for errors
redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});

redisClient.on('connect', () => {
    console.log('Redis client connecting...');
});

redisClient.on('ready', () => {
    console.log('Redis client ready');
});

redisClient.on('end', () => {
    console.warn('Redis client connection closed');
});

module.exports = redisClient;