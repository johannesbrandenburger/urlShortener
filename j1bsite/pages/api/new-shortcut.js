// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js';

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

var supabase = createClient("https://kgshezreyobypiidaeii.supabase.co", supabaseKey);


export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    // console.log(req);
    const { data: shortcut, error } = await supabase
      .from('shortcuts')
      .insert({
        shortcut: req.body.shortcut,
        destination_link: req.body.destination_link,
      })
    res.setHeader('Location', '/');
    res.status(200).json({ Success: "true" })
    res.end();

  }


}
