'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Box, Github, UploadCloud, LogOut, UserCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AuthModal } from './AuthModal';

export function Navbar() {
    const pathname = usePathname();
    const { isAuthenticated, user, logout, initialize } = useAuthStore();
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50"
            >
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
                            <Box className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-glow">OpenCAD</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
                            Ana Sayfa
                        </Link>
                        <Link href="/viewer" className={`text-sm font-medium transition-colors ${pathname === '/viewer' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
                            Çalışma Alanı
                        </Link>
                        <Link href="/faq" className={`text-sm font-medium transition-colors ${pathname === '/faq' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
                            SSS
                        </Link>
                        <Link href="https://github.com/topalemirfaruk/OpenCAD-Review?tab=readme-ov-file" target="_blank" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                            Dokümantasyon
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        {!isAuthenticated ? (
                            <button
                                onClick={() => setIsAuthOpen(true)}
                                className="hidden sm:flex items-center gap-2 text-foreground/80 hover:text-primary transition-all text-xs font-bold px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 group/btn"
                            >
                                <UserCircle className="w-4 h-4 text-foreground/40 group-hover/btn:text-primary transition-colors" />
                                <span>Giriş Yap</span>
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                                    <div className="w-6 h-6 rounded-lg overflow-hidden border border-primary/30">
                                        <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[11px] font-bold text-foreground leading-none">{user?.name}</span>
                                        <span className="text-[9px] text-foreground/40 font-medium leading-none mt-0.5">{user?.role}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => logout()}
                                    className="p-2 text-foreground/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all group"
                                    title="Çıkış Yap"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <Link href="https://github.com/topalemirfaruk/OpenCAD-Review?tab=readme-ov-file" target="_blank" className="text-foreground/70 hover:text-foreground transition-colors p-2 hover:bg-white/5 rounded-full">
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link href="/viewer" className="hidden sm:flex h-9 items-center justify-center px-4 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors gap-2 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                            <UploadCloud className="w-4 h-4" />
                            <span>Model Yükle</span>
                        </Link>
                    </div>
                </div>
            </motion.header>

            {/* Premium Modals - Moved outside header to resolve centering/clipping issues */}
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </>
    );
}
