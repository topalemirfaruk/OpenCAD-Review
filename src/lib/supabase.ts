import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// During build time on Vercel, these might be missing. We allow the build to proceed 
// by only throwing at runtime if they are missing.
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'production' && !isBuildTime) {
        const missing = !supabaseUrl ? 'NEXT_PUBLIC_SUPABASE_URL' : 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY';
        throw new Error(`CRITICAL: Supabase environment variables (${missing}) are missing! Please check your Vercel Dashboard.`);
    }
    console.warn('Supabase URL or Anon Key is missing. Using placeholders for current process phase.');
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-anon-key',
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        },
    }
);
