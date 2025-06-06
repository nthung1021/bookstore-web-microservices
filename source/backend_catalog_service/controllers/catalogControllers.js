const supabase = require('../database/catalogSupabase');

async function getAllBooks(req, res) {
    const { data, error } = await supabase
        .from('Book')
        .select('*');

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
}

async function getBookById(req, res) {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('Book')
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (error || !data) return res.status(404).json({ error: 'Book not found' });

    res.json(data);
}

async function searchBooks(req, res) {
    const q = req.query.q;
    const { data, error } = await supabase
        .from('Book')
        .select('*')
        .ilike('title', `%${q}%`);
    if (error) return res.status(500).json({ error: error.message });
    
    res.json(data);
}

module.exports = { getAllBooks, getBookById, searchBooks };