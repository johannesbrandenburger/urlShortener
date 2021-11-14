// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js';
var supabase = createClient("https://kgshezreyobypiidaeii.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTk1MTgzNywiZXhwIjoxOTQ3NTI3ODM3fQ.OVMR_WiGUsuCVylx7Ih6Kuy40LYK-eipFKu7t6qydUE");


export default async function handler(req, res) {
  const { data: shortcutList, error } = await supabase
    .from('shortcuts') 
    .select()
  // console.log(shortcutList);
  res.status(200).json({ shortcutList: shortcutList })
}
