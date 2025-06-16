const express = require('express');
const axios = require('axios');
const router = express.Router();

const CATALOG_SERVICE = process.env.CATALOG_SERVICE;

router.get('/books', async (req, res) => {
    try {
        const response = await axios.get(`${CATALOG_SERVICE}/books`);
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

router.get('/books/:id', async (req, res) => {
    try {
        const response = await axios.get(`${CATALOG_SERVICE}/books/${req.params.id}`);
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

module.exports = router;
