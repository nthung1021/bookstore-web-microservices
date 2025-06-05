const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
app.use(express.json());
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User service on ${PORT}`));
