const express = require('express');
const cors = require('cors');
const connectMongoDB = require('./database/userMongo');

const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());

connectMongoDB();

app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User service on ${PORT}`));
