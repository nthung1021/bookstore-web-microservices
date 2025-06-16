const express = require('express');
const cors = require('cors');
const connectMongoDB = require('./database/catalogMongo');

const app = express();
const catalogRoutes = require('./routes/catalogRoutes');

app.use(cors());
app.use(express.json());

connectMongoDB();

app.use('/api/catalog', catalogRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Catalog service running on port ${PORT}`));
