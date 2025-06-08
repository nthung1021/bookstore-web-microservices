const express = require('express');
const router = express.Router();
const {
    addToCart,
    placeOrderFromCart,
    placeOrderFromBook,
    getOrderHistory
} = require('../controllers/orderControllers');

router.post('/cart', addToCart);
router.post('/order/from-cart', placeOrderFromCart);
router.post('/order/from-book', placeOrderFromBook);
router.get('/order/history/:userId', getOrderHistory);

module.exports = router;