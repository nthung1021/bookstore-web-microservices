const Book = require('../models/Book');

async function getAllBooks(req, res) {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
}

async function getBookById(req, res) {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching book' });
    }
}

async function searchBooks(req, res) {
    const q = req.query.q;
    try {
        const books = await Book.find({ name: new RegExp(q, 'i') });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: 'Failed to search books' });
    }
}

module.exports = { getAllBooks, getBookById, searchBooks };
