const bcrypt = require('bcrypt');
const supabase = require('../database/userSupabase');

async function register(req, res) {
    const { name, password, confirmPassword } = req.body;

    if (!name || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Name, password and confirm password are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    const { data: existingUser, error: userCheckError } = await supabase
        .from('User')
        .select('id')
        .eq('username', name)
        .maybeSingle();

    if (existingUser) return res.status(400).json({ error: 'Username already taken' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from('User')
        .insert([{ username: name, password: hashedPassword }])
        .select();

    if (error) return res.status(500).json({ error: error.message });

    if (!data || data.length === 0) {
        return res.status(500).json({ error: 'User was not created properly' });
    }

    res.status(201).json({ message: 'User registered', userId: data[0].id });
}

async function login(req, res) {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: 'Name and password are required' });
    }

    const { data: user, error } = await supabase
        .from('User')
        .select('*')
        .eq('username', name)
        .maybeSingle();

    if (!user) return res.status(401).json({ error: 'Invalid username' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid password' });

    res.status(200).json({ message: 'Login successful', userId: user.id });   
}

async function getUserById(req, res) {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('User')
        .select('id, username')
        .eq('id', id)
        .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(data);
}

module.exports = { register, login, getUserById };
