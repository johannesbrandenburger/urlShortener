// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js';

// get supabase key from env
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

console.log('supabaseKey', supabaseKey);

// create supabase client
// const supabaseClient = createClient("https://kgshezreyobypiidaeii.supabase.co", supabaseKey);

export default async function handler(req, res) {
    // const { data: shortcutList, error } = await supabase
    //   .from('shortcuts') 
    //   .select()
    // console.log(shortcutList);
    res.status(200).json({ key: supabaseKey })
  }