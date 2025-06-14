const express = require('express');
const cors = require('cors');
const app = express();
const catalogRoutes = require('./routes/catalogRoutes');
app.use(cors({
    origin: process.env.WEB_URL
}));
app.use(express.json());
app.use('/api/catalog', catalogRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Catalog service running on port ${PORT}`));
