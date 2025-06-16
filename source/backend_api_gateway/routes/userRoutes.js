const express = require('express');
const axios = require('axios');
const router = express.Router();

const USER_SERVICE = process.env.USER_SERVICE;

router.post('/register', (req, res) => {
    try {
        const response = axios.post(`${USER_SERVICE}/register`, req.body);
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

router.post('/login', (req, res) => {
    try {
        const response = axios.post(`${USER_SERVICE}/login`, req.body);
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const response = axios.get(`${USER_SERVICE}/${req.params.id}`);
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

module.exports = router;
