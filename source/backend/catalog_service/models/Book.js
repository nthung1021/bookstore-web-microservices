const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true,unique: true,trim: true },
    author: { type: String, required: true },
    publish_date: { type: Date, required: true },
    price: { type: Number, required: true },
    image_url: { type: String },
    created_at: { type: Date,default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
