'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Plus, Box, Clock, Filter, Search,
    HardDrive, Users, Activity, UploadCloud, FolderOpen, LogIn
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthSync } from '@/store/authStore';

export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useAuthSync();

    // Redirect to home if not authenticated (after loading)
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace('/');
        }
    }, [isLoading, isAuthenticated, router]);

    // Loading state
    if (isLoading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-primary/30 border-t-primaryGlow rounded-full animate-spin" />
                    <p className="text-foreground/40 text-sm">Yükleniyor...</p>
                </div>
            </main>
        );
    }

    // Not authenticated — show a nice login prompt instead of blank redirect flash
    if (!isAuthenticated || !user) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-3xl p-10 text-center max-w-md w-full border-primary/20"
                >
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <LogIn className="w-8 h-8 text-primaryGlow" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Giriş Gerekiyor</h2>
                    <p className="text-foreground/50 text-sm mb-7">
                        Dashboard&apos;a erişmek için Google veya GitHub hesabınızla giriş yapmanız gerekiyor.
                    </p>
                    <Link
                        href="/"
                        className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
                    >
                        Ana Sayfaya Dön
                    </Link>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 pt-28 pb-24">

            {/* Header with real user info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
            >
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary/30 bg-surfaceAlt relative flex-shrink-0">
                        {user.avatar ? (
                            <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-primaryGlow font-bold text-xl">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-foreground/50 text-xs font-semibold uppercase tracking-widest mb-0.5">
                            Hoş geldin 👋
                        </p>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-foreground/40 text-xs mt-0.5">{user.email}</p>
                    </div>
                </div>

                <Link
                    href="/viewer"
                    className="btn-primary h-11 px-6 rounded-xl text-white font-bold flex items-center gap-2 text-sm"
                >
                    <Plus size={18} />
                    Yeni Model Yükle
                </Link>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                    { label: 'Toplam Model', value: '0', icon: <Box className="text-primaryGlow w-5 h-5" />, bg: 'bg-primary/10 border-primary/20' },
                    { label: 'Depolama', value: '0 KB', icon: <HardDrive className="text-accentGlow w-5 h-5" />, bg: 'bg-accent/10 border-accent/20' },
                    { label: 'Paylaşılan', value: '0', icon: <Users className="text-teal w-5 h-5" />, bg: 'bg-teal/10 border-teal/20' },
                    { label: 'Görüntüleme', value: '0', icon: <Activity className="text-yellow-400 w-5 h-5" />, bg: 'bg-yellow-500/10 border-yellow-500/20' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="glass-card p-5 rounded-2xl border-borderLight/50 card-hover"
                    >
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-4 ${stat.bg}`}>
                            {stat.icon}
                        </div>
                        <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold stat-number">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Search + Filter toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" size={16} />
                    <input
                        type="text"
                        placeholder="Modellerde ara..."
                        className="w-full h-10 bg-surfaceMid/60 border border-borderLight/50 rounded-xl pl-9 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all text-foreground/80 placeholder:text-foreground/25"
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none h-10 px-4 rounded-xl glass-card border-borderLight/50 flex items-center justify-center gap-2 text-xs font-bold text-foreground/50 hover:text-foreground hover:border-primary/30 transition-all">
                        <Filter size={14} /> Filtrele
                    </button>
                    <button className="flex-1 sm:flex-none h-10 px-4 rounded-xl glass-card border-borderLight/50 flex items-center justify-center gap-2 text-xs font-bold text-foreground/50 hover:text-foreground hover:border-primary/30 transition-all">
                        Format: Hepsi
                    </button>
                </div>
            </div>

            {/* Empty State — no models yet */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-2xl border-borderLight/50 overflow-hidden"
            >
                <div className="py-20 flex flex-col items-center justify-center text-center px-4">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                        <FolderOpen className="w-10 h-10 text-primary/50" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Henüz Model Yok</h3>
                    <p className="text-foreground/40 text-sm max-w-sm mb-8">
                        İlk CAD modelinizi yükleyin. STL veya OBJ formatlarını destekliyoruz. Modelleriniz yalnızca cihazınızda işlenir.
                    </p>
                    <Link
                        href="/viewer"
                        className="btn-primary h-11 px-6 rounded-xl text-white font-bold flex items-center gap-2 text-sm"
                    >
                        <UploadCloud size={18} />
                        İlk Modelini Yükle
                    </Link>
                    <p className="text-foreground/25 text-xs mt-5 flex items-center gap-1.5">
                        <Clock size={11} />
                        Modeller oturum sonrası saklanmyor — sadece görüntüleme modu
                    </p>
                </div>
            </motion.div>

        </main>
    );
}
