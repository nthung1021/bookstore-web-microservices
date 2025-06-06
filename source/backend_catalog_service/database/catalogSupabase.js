const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_CATALOG_URL;
const SUPABASE_KEY = process.env.SUPABASE_CATALOG_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;