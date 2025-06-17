const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    book_id: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);
