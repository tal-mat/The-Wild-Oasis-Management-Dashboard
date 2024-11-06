import { createClient } from "@supabase/supabase-js";

// Define the Supabase URL for the project
export const supabaseUrl = "https://jakiggtosfociarlvgsw.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
