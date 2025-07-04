const express = require('express');
const axios = require('axios');
const router = express.Router();

const ORDER_SERVICE = process.env.ORDER_SERVICE;

router.post('/cart/add', async (req, res) => {
    try {
        const response = await axios.post(`${ORDER_SERVICE}/cart/add`, req.body);
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

router.get('/cart/:userId', async (req, res) => {
    try {
        const response = await axios.get(`${ORDER_SERVICE}/cart/${req.params.userId}`);
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

router.post('/from-cart', async (req, res) => {
    try {
        const response = await axios.post(`${ORDER_SERVICE}/from-cart`, req.body);
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

router.post('/from-book', async (req, res) => {
    try {
        const response = await axios.post(`${ORDER_SERVICE}/from-book`, req.body);
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

router.get('/history/:userId', async (req, res) => {
    try {
        const response = await axios.get(`${ORDER_SERVICE}/history/${req.params.userId}`);
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

module.exports = router;
