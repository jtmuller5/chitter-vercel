import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export default async function (req: VercelRequest, res: VercelResponse) {
  // Fetch the last 3 stories from the database
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .order('createdAt', { ascending: false })
    .limit(3);

  if (error) {
    res.status(500).send(error.message);
    return;
  }

  res.status(200).json(data);
}
