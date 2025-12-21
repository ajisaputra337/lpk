import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://srmokgwizcygltsqogft.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNybW9rZ3dpemN5Z2x0c3FvZ2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTY3NDIsImV4cCI6MjA4MTczMjc0Mn0.jCsgX83TrwXfBVyIdqUPrZ_eoJi1R0VMKv_9iQZvOCk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);