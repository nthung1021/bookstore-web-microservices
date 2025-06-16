const mongoose = require('mongoose');

const bookOrderSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
    book_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    book_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true }
});

module.exports = mongoose.model('BookOrder', bookOrderSchema);
