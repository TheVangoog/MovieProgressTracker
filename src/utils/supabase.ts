import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ylntgijzvfxuserjytrt.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseKey) {
  console.error('VITE_SUPABASE_KEY is missing!')
  console.log('Available env vars:', import.meta.env)
  throw new Error('Missing VITE_SUPABASE_KEY environment variable');
}

console.log('Supabase initialized with URL:', supabaseUrl)
console.log('Key starts with:', supabaseKey.substring(0, 10) + '...')

export const supabase = createClient(supabaseUrl, supabaseKey)
        