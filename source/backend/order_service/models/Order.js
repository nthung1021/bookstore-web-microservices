const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    order_time: { type: Date, default: Date.now },
    total_cost: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
