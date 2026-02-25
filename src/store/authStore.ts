'use client';

import { create } from 'zustand';
import { useSession, signIn, signOut } from 'next-auth/react';

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
    initialize: () => void;
    loginWithOAuth: (provider: 'google' | 'github') => Promise<void>;
    logout: () => Promise<void>;
}

// Zustand store - provides global access to auth state
export const useAuthStore = create<AuthState>(() => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    initialize: () => { }, // Handled by SessionProvider + useAuthSync below
    loginWithOAuth: async (provider) => {
        await signIn(provider, { callbackUrl: '/viewer' });
    },
    logout: async () => {
        await signOut({ callbackUrl: '/' });
    },
}));

// Hook to sync NextAuth session with the Zustand store
// Use this in top-level components (e.g., Navbar)
export function useAuthSync() {
    const { data: session, status } = useSession();

    const isLoading = status === 'loading';
    const isAuthenticated = status === 'authenticated';

    const user: User | null = session?.user ? {
        id: (session.user as { id?: string }).id || session.user.email || '',
        name: session.user.name || session.user.email?.split('@')[0] || 'User',
        email: session.user.email || '',
        avatar: session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`,
        role: 'Engineer',
    } : null;

    return { user, isAuthenticated, isLoading };
}
