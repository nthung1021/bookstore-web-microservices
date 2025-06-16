const axios = require('axios');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const BookOrder = require('../models/BookOrder');

const CATALOG_URL = process.env.CATALOG_URL;

async function addToCart(req, res) {
    const { userId, bookId } = req.body;
    try {
        await Cart.create({ user_id: userId, book_id: bookId });
        res.json({ message: 'Book added to cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getCartItems(req, res) {
    const { userId } = req.params;
    try {
        const cartItems = await Cart.find({ user_id: userId });
        const bookData = await Promise.all(cartItems.map(async item => {
        try {
            const response = await axios.get(`${CATALOG_URL}/api/catalog/books/${item.book_id}`);
            return {
                book_id: item.book_id,
                name: response.data.name,
                price: response.data.price,
                cover_url: response.data.image_url
            };
        } catch (e) {
            return { book_id: item.book_id, error: "Book not found" };
        }
        }));
        res.json(bookData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function placeOrderFromCart(req, res) {
    const { userId } = req.body;
    try {
        const cartItems = await Cart.find({ user_id: userId });
        if (!cartItems.length) return res.status(400).json({ error: 'Cart is empty' });

        const orderItems = await Promise.all(cartItems.map(async item => {
        const response = await axios.get(`${CATALOG_URL}/api/catalog/books/${item.book_id}`);
        const book = response.data;
        return {
            book_id: item.book_id,
            book_price: book.price,
            quantity: 1,
            total_price: book.price
        };
        }));

        const total_cost = orderItems.reduce((sum, item) => sum + item.total_price, 0);
        const order = await Order.create({ user_id: userId, total_cost });

        await BookOrder.insertMany(orderItems.map(item => ({
            order_id: order._id,
            ...item
        })));

        await Cart.deleteMany({ user_id: userId });

        res.json({ message: 'Order placed from cart', order_id: order._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function placeOrderFromBook(req, res) {
    const { userId, bookId, quantity } = req.body;
    try {
        const response = await axios.get(`${CATALOG_URL}/api/catalog/books/${bookId}`);
        const book = response.data;

        const total_price = book.price * quantity;
        const order = await Order.create({
            user_id: userId,
            total_cost: total_price
        });

        await BookOrder.create({
            order_id: order._id,
            book_id,
            book_price: book.price,
            quantity,
            total_price
        });

        res.json({ message: 'Order placed from book', order_id: order._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getOrderHistory(req, res) {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ user_id: userId }).sort({ order_time: -1 });

        const result = await Promise.all(orders.map(async order => {
        const items = await BookOrder.find({ order_id: order._id });
        return {
            id: order._id,
            order_time: order.order_time,
            total_cost: order.total_cost,
            items
        };
        }));

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    addToCart,
    getCartItems,
    placeOrderFromCart,
    placeOrderFromBook,
    getOrderHistory
};
