'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Github, Chrome, ArrowRight } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [mode, setMode] = useState<'login' | 'register'>('login');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md glass-panel p-8 rounded-3xl border-primary/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                    {/* Background Decorative Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-foreground/40 hover:text-foreground transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">
                            {mode === 'login' ? 'Tekrar Hoş Geldiniz' : 'Hesap Oluşturun'}
                        </h2>
                        <p className="text-sm text-foreground/60">
                            {mode === 'login'
                                ? 'CAD projelerinizi buluta taşımak için giriş yapın.'
                                : 'Mühendislik topluluğumuza katılın ve projelerinizi paylaşın.'}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Social Buttons */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <button className="flex items-center justify-center gap-2 h-11 rounded-xl bg-surfaceAlt border border-border/50 hover:border-primary/50 transition-all text-sm font-medium">
                                <Chrome size={18} /> Google
                            </button>
                            <button className="flex items-center justify-center gap-2 h-11 rounded-xl bg-surfaceAlt border border-border/50 hover:border-primary/50 transition-all text-sm font-medium">
                                <Github size={18} /> GitHub
                            </button>
                        </div>

                        <div className="relative flex items-center gap-4 py-2">
                            <div className="h-px bg-border/50 flex-1" />
                            <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">Veya</span>
                            <div className="h-px bg-border/50 flex-1" />
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            {mode === 'register' && (
                                <div className="space-y-1">
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Ad Soyad"
                                            className="w-full h-11 bg-surfaceAlt/50 border border-border/50 rounded-xl pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="space-y-1">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                                    <input
                                        type="email"
                                        placeholder="E-posta Adresi"
                                        className="w-full h-11 bg-surfaceAlt/50 border border-border/50 rounded-xl pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                                    <input
                                        type="password"
                                        placeholder="Şifre"
                                        className="w-full h-11 bg-surfaceAlt/50 border border-border/50 rounded-xl pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <button className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all mt-6 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                            {mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
                            <ArrowRight size={18} />
                        </button>
                    </div>

                    <div className="mt-8 text-center text-sm">
                        <span className="text-foreground/60">
                            {mode === 'login' ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mu?'}
                        </span>
                        <button
                            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                            className="ml-2 text-primary font-bold hover:underline transition-all"
                        >
                            {mode === 'login' ? 'Hemen Kayıt Ol' : 'Giriş Yap'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
