'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Github, Box } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSocialLogin = async (provider: 'google' | 'github') => {
        setIsLoading(provider);
        setErrorMsg(null);
        try {
            await signIn(provider, { callbackUrl: '/viewer' });
        } catch {
            setErrorMsg('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
            setIsLoading(null);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
                {/* Status Notifications */}
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[120] flex flex-col gap-3 items-center w-full max-w-md px-4 pointer-events-none">
                    <AnimatePresence>
                        {errorMsg && (
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="px-6 py-3 bg-red-500 text-white rounded-2xl shadow-[0_20px_40px_rgba(239,68,68,0.4)] font-bold text-sm flex items-center gap-3 border border-white/20 pointer-events-auto"
                            >
                                <X size={16} />
                                {errorMsg}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    className="relative w-full max-w-[400px] glass-panel rounded-[2rem] border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.8)] flex flex-col z-[110] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-8 sm:p-9 relative flex flex-col items-center">
                        {/* Background Decorative Glow */}
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-1.5 text-foreground/20 hover:text-foreground transition-all hover:bg-white/5 rounded-full z-30 group"
                        >
                            <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <div className="text-center mb-8 relative w-full">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/5 border border-primary/20 mb-4 text-primary shadow-[0_0_20px_rgba(14,165,233,0.1)]">
                                <Box className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-glow mb-1.5 tracking-tight">
                                Hoş Geldiniz
                            </h2>
                            <p className="text-[13px] text-foreground/40 leading-snug font-medium">
                                Projelerinizi yönetmek için hesabınızla giriş yapın.
                            </p>
                        </div>

                        <div className="w-full space-y-3 relative">
                            {/* Google Login */}
                            <button
                                onClick={() => handleSocialLogin('google')}
                                disabled={!!isLoading}
                                className="w-full flex items-center justify-center gap-3 h-12 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-primary/[0.03] transition-all text-[11px] font-bold uppercase tracking-widest group relative overflow-hidden disabled:opacity-50"
                            >
                                {isLoading === 'google' ? (
                                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Mail size={14} className="text-foreground/20 group-hover:text-primary transition-colors" />
                                        Gmail ile Giriş Yap
                                    </>
                                )}
                            </button>

                            {/* GitHub Login */}
                            <button
                                onClick={() => handleSocialLogin('github')}
                                disabled={!!isLoading}
                                className="w-full flex items-center justify-center gap-3 h-12 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-primary/[0.03] transition-all text-[11px] font-bold uppercase tracking-widest group relative overflow-hidden disabled:opacity-50"
                            >
                                {isLoading === 'github' ? (
                                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Github size={14} className="text-foreground/20 group-hover:text-primary transition-colors" />
                                        GitHub ile Giriş Yap
                                    </>
                                )}
                            </button>

                            <p className="text-center text-[10px] text-foreground/20 font-medium pt-3">
                                Giriş yaparak{' '}
                                <span className="text-primary/60">Kullanım Şartları</span>
                                {' '}ve{' '}
                                <span className="text-primary/60">Gizlilik Politikası</span>
                                &apos;nı kabul etmiş olursunuz.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
