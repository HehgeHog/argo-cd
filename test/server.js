const express = require('express');
const redis = require('redis');
const app = express();
const client = redis.createClient({
    host: process.env.REDIS_HOST || 'redis'
});

client.on('error', (err) => console.log('Redis error:', err));

app.use(express.static('../frontend'));
app.use(express.json());

app.get('/api/counter', (req, res) => {
    client.get('counter', (err, reply) => {
        res.json({ value: reply || 0 });
    });
});

app.post('/api/counter', (req, res) => {
    client.incr('counter', (err, reply) => {
        res.json({ value: reply });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));