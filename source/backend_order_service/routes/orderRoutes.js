const express = require('express');
const router = express.Router();
const {
    addToCart,
    getCartItems,
    placeOrderFromCart,
    placeOrderFromBook,
    getOrderHistory
} = require('../controllers/orderControllers');

router.post('/cart/add', addToCart);
router.get('/cart/:userId', getCartItems);
router.post('/from-cart', placeOrderFromCart);
router.post('/from-book', placeOrderFromBook);
router.get('/history/:userId', getOrderHistory);

module.exports = router;