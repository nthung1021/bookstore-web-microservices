const pool = require('../database/db');

async function addToCart(req, res) {
    const { userId, bookId } = req.body;
    try {
        await pool.query('INSERT INTO Cart (user_id, book_id) VALUES ($1, $2)', [userId, bookId]);
        res.json({ message: 'Book added to cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function placeOrderFromCart(req, res) {
    const { userId } = req.body;

    try {
        const cartItemsRes = await pool.query(`
        SELECT c.book_id, b.price
        FROM Cart c
        JOIN Book b ON c.book_id = b.id
        WHERE c.user_id = $1
        `, [userId]);

        const cartItems = cartItemsRes.rows;
        if (cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
        }

        const totalCost = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
        const orderRes = await pool.query(
        'INSERT INTO "Order" (user_id, total_cost) VALUES ($1, $2) RETURNING id',
        [userId, totalCost]
        );
        const orderId = orderRes.rows[0].id;

        const insertValues = cartItems.map((item, i) => `($1, $${i * 4 + 2}, $${i * 4 + 3}, 1, $${i * 4 + 4})`).join(',');
        const flatValues = cartItems.flatMap(item => [item.book_id, item.price, item.price]);

        await pool.query(
        `INSERT INTO BookOrder (order_id, book_id, book_price, quantity, total_price) VALUES ${insertValues}`,
        [orderId, ...flatValues]
        );

        await pool.query('DELETE FROM Cart WHERE user_id = $1', [userId]);
        res.json({ message: 'Order placed from cart', orderId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function placeOrderFromBook(req, res) {
    const { userId, bookId, quantity } = req.body;
    try {
        const bookRes = await pool.query('SELECT * FROM Book WHERE id = $1', [bookId]);
        if (bookRes.rowCount === 0) {
        return res.status(404).json({ error: 'Book not found' });
        }

        const book = bookRes.rows[0];
        const total = book.price * quantity;

        const orderRes = await pool.query(
        'INSERT INTO "Order" (user_id, total_cost) VALUES ($1, $2) RETURNING id',
        [userId, total]
        );
        const orderId = orderRes.rows[0].id;

        await pool.query(
        'INSERT INTO BookOrder (order_id, book_id, book_price, quantity, total_price) VALUES ($1, $2, $3, $4, $5)',
        [orderId, bookId, book.price, quantity, total]
        );

        res.json({ message: 'Order placed', orderId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getOrderHistory(req, res) {
    const { userId } = req.params;
    try {
        const orderRes = await pool.query(`
        SELECT o.*, 
            json_agg(json_build_object(
            'book_id', bo.book_id,
            'price', bo.book_price,
            'quantity', bo.quantity,
            'total_price', bo.total_price
            )) as items
        FROM "Order" o
        JOIN BookOrder bo ON o.id = bo.order_id
        WHERE o.user_id = $1
        GROUP BY o.id
        ORDER BY o.order_time DESC
        `, [userId]);

        res.json(orderRes.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    addToCart,
    placeOrderFromCart,
    placeOrderFromBook,
    getOrderHistory
};
