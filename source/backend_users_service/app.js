const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
app.use(express.json());
app.use('/api/user', userRoutes);
app.use(cors({
  origin: process.env.USER_API_URL
}));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User service on ${PORT}`));
