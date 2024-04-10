
import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = () => {
    const url = import.meta.env.VITE_REACT_APP_SUPABASE_PROJECT_URL;
    const key = import.meta.env.VITE_REACT_APP_SUPABASE_PROJECT_KEY;
    const supabase = createClient(url, key);
    return supabase;
};
