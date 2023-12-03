import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export default async function (req: VercelRequest, res: VercelResponse) {
  const { title, content, authorId, isPublic } = req.body;

  // Validate the input
  if (!title || !content) {
    res.status(400).send("Title and content are required");
    return;
  }

  // Insert the new story into the database
  const { data, error } = await supabase
    .from('stories')
    .insert([
      { title, content, authorId, createdAt: new Date(), updatedAt: new Date(), isPublic }
    ]);

  if (error) {
    res.status(500).send(error.message);
    return;
  }

  // Send a success message instead of the data
  res.status(201).send("Story added successfully");
}
