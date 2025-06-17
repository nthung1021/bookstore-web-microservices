const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
        console.log(`MongoDB connected to ${process.env.DB_NAME}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectMongoDB;
