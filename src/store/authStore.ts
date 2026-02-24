import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    initialize: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    loginWithOAuth: (provider: 'google' | 'github') => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

const mapSupabaseUser = (user: SupabaseUser | null): User | null => {
    if (!user) return null;
    return {
        id: user.id,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        avatar: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
        role: 'Engineer',
    };
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    initialize: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        set({
            user: mapSupabaseUser(session?.user || null),
            isAuthenticated: !!session?.user,
            isLoading: false
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            set({
                user: mapSupabaseUser(session?.user || null),
                isAuthenticated: !!session?.user
            });
        });
    },

    login: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
    },

    register: async (name, email, password) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
            },
        });
        if (error) throw error;
    },

    loginWithOAuth: async (provider) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/viewer`,
            },
        });
        if (error) throw error;
    },

    logout: async () => {
        await supabase.auth.signOut();
    },

    resetPassword: async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/callback`,
        });
        if (error) throw error;
    },
}));
