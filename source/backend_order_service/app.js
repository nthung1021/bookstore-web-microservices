const express = require('express');
const cors = require('cors');
const app = express();
const orderRoutes = require('./routes/orderRoutes');
app.use(cors({
    origin: process.env.WEB_URL
}));
app.use(express.json());
app.use('/api/order', orderRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));