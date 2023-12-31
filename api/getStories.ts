import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export default async function (req: VercelRequest, res: VercelResponse) {

  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production'?'https://chat.openai.com':'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { type } = req.query; // Get the type from query parameters

  // Build the query
  let query = supabase
    .from('stories')
    .select('*')
    .order('createdAt', { ascending: false })
    .limit(3);

  // Apply the type filter if provided
  if (type) {
    query = query.eq('type', type);
  }

  // Execute the query
  const { data, error } = await query;

  if (error) {
    res.status(500).send(error.message);
    return;
  }

  res.status(200).json(data);
}

