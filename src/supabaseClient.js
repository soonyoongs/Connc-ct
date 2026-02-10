import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://uugnucyqrqpyhdoabtjn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1Z251Y3lxcnFweWhkb2FidGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDM2ODIsImV4cCI6MjA4NjI3OTY4Mn0.fuYgaKKmKmLMLTQESXfPK9WLj9075ykKcDN5haagIjE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)