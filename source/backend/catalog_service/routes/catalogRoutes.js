const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, searchBooks } = require('../controllers/catalogControllers');

router.get('/books', getAllBooks);
router.get('/books/search', searchBooks);
router.get('/books/:id', getBookById);

module.exports = router;
