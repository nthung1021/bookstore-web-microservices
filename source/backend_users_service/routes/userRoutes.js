const express = require('express');
const router = express.Router();
const { register, login, getUserById } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.post('/:id', getUserById);

module.exports = router;