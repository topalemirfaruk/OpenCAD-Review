'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Box, Github, UploadCloud, LogOut, UserCircle, Menu, X } from 'lucide-react';
import { useAuthSync } from '../../store/authStore';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AuthModal } from './AuthModal';

const navLinks = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Çalışma Alanı', href: '/viewer' },
    { label: 'SSS', href: '/faq' },
    { label: 'Dökümanlar', href: 'https://github.com/topalemirfaruk/OpenCAD-Review?tab=readme-ov-file', external: true },
];

export function Navbar() {
    const pathname = usePathname();
    const { isAuthenticated, user, isLoading } = useAuthSync();
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                <div className="mx-4 mt-3">
                    <div className="max-w-6xl mx-auto glass-panel rounded-2xl border-borderLight/60 px-5 h-14 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
                            <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                                <Box className="w-4 h-4 text-primaryGlow" />
                            </div>
                            <span className="font-bold text-base tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
                                OpenCAD
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    target={link.external ? '_blank' : undefined}
                                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${pathname === link.href
                                            ? 'text-primaryGlow bg-primary/10'
                                            : 'text-foreground/50 hover:text-foreground/90 hover:bg-white/5'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-primary/30 border-t-primaryGlow rounded-full animate-spin" />
                            ) : !isAuthenticated ? (
                                <button
                                    onClick={() => setIsAuthOpen(true)}
                                    className="hidden sm:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-xl text-foreground/60 hover:text-foreground/90 hover:bg-white/5 transition-all border border-transparent hover:border-borderLight"
                                >
                                    <UserCircle className="w-4 h-4" />
                                    Giriş Yap
                                </button>
                            ) : (
                                <div className="hidden sm:flex items-center gap-2">
                                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-primary/10 border border-primary/20">
                                        <div className="w-5 h-5 rounded-lg overflow-hidden border border-primary/30 relative flex-shrink-0">
                                            {user?.avatar ? (
                                                <Image src={user.avatar} alt={user.name || 'User'} fill className="object-cover" />
                                            ) : (
                                                <UserCircle className="w-5 h-5 text-primaryGlow" />
                                            )}
                                        </div>
                                        <span className="text-xs font-semibold text-foreground/80">{user?.name}</span>
                                    </div>
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="p-1.5 text-foreground/30 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                        title="Çıkış Yap"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            <Link
                                href="https://github.com/topalemirfaruk/OpenCAD-Review"
                                target="_blank"
                                className="p-1.5 text-foreground/40 hover:text-foreground/80 hover:bg-white/5 rounded-lg transition-all"
                            >
                                <Github className="w-4 h-4" />
                            </Link>

                            <Link
                                href="/viewer"
                                className="btn-primary hidden sm:flex h-8 items-center px-4 rounded-xl text-white font-semibold text-xs gap-1.5"
                            >
                                <UploadCloud className="w-3.5 h-3.5" />
                                Model Yükle
                            </Link>

                            {/* Mobile toggle */}
                            <button
                                className="md:hidden p-1.5 text-foreground/50 hover:text-foreground rounded-lg transition-colors"
                                onClick={() => setIsMobileOpen(!isMobileOpen)}
                            >
                                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-6xl mx-auto glass-panel rounded-2xl border-borderLight/60 mt-2 p-4 flex flex-col gap-2"
                        >
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    target={link.external ? '_blank' : undefined}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${pathname === link.href
                                            ? 'text-primaryGlow bg-primary/10'
                                            : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="h-px bg-border/50 my-1" />
                            {!isAuthenticated ? (
                                <button
                                    onClick={() => { setIsAuthOpen(true); setIsMobileOpen(false); }}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-white/5 transition-all"
                                >
                                    <UserCircle className="w-4 h-4" />
                                    Giriş Yap
                                </button>
                            ) : (
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Çıkış Yap
                                </button>
                            )}
                        </motion.div>
                    )}
                </div>
            </motion.header>

            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </>
    );
}
