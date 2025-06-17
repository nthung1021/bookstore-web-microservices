const bcrypt = require('bcrypt');
const User = require('../models/User');

async function register(req, res) {
    const { name, password, confirmPassword } = req.body;

    if (!name || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Name, password and confirm password are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ username: name });
        if (existingUser) return res.status(400).json({ error: 'Username already taken' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username: name, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User registered', userId: savedUser._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while registering user' });
    }
}

async function login(req, res) {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: 'Name and password are required' });
    }

    try {
        const user = await User.findOne({ username: name });
        if (!user) return res.status(401).json({ error: 'Invalid username' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid password' });

        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while logging in' });
    }
}

async function getUserById(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('username _id');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while fetching user' });
    }
}

module.exports = { register, login, getUserById };
