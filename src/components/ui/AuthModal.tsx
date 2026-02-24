import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Github, ArrowRight, Box } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const { login, register, loginWithOAuth, resetPassword } = useAuthStore();
    const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>('login');
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSocialLogin = async (platform: string) => {
        setIsLoading(platform);
        setErrorMsg(null);
        try {
            const provider = platform.toLowerCase() === 'gmail' ? 'google' : 'github';
            await loginWithOAuth(provider as 'google' | 'github');
            // Redirect handled by Supabase
        } catch (error: any) {
            setErrorMsg(error.message || 'Sosyal giriş başarısız oldu.');
            setIsLoading(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading('form');
        setErrorMsg(null);
        try {
            if (mode === 'login') {
                await login(email, password);
                setSuccessMsg('Giriş başarılı! Hoş geldiniz.');
            } else if (mode === 'register') {
                await register(name, email, password);
                setSuccessMsg('Kayıt başarılı! Lütfen e-postanızı onaylayın.');
            } else {
                await resetPassword(email);
                setSuccessMsg('Şifre sıfırlama bağlantısı e-postanıza gönderildi.');
            }

            if (mode !== 'forgot-password') {
                setTimeout(() => {
                    setSuccessMsg(null);
                    onClose();
                }, 1500);
            }
        } catch (error: any) {
            setErrorMsg(error.message || 'İşlem sırasında bir hata oluştu.');
        } finally {
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
                        {successMsg && (
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="px-6 py-3 bg-primary text-white rounded-2xl shadow-[0_20px_40px_rgba(14,165,233,0.4)] font-bold text-sm flex items-center gap-3 border border-white/20 pointer-events-auto"
                            >
                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                    <Box size={12} className="fill-white" />
                                </div>
                                {successMsg}
                            </motion.div>
                        )}
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

                        <div className="text-center mb-7 relative w-full">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/5 border border-primary/20 mb-4 text-primary shadow-[0_0_20px_rgba(14,165,233,0.1)]">
                                <Box className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-glow mb-1.5 tracking-tight">
                                {mode === 'login' ? 'Tekrar Hoş Geldiniz' : mode === 'register' ? 'Hesap Oluşturun' : 'Şifre Sıfırlama'}
                            </h2>
                            <p className="text-[13px] text-foreground/40 leading-snug font-medium">
                                {mode === 'login'
                                    ? 'Projelerinizi yönetmek için oturum açın.'
                                    : mode === 'register'
                                        ? 'Mühendislik dünyasına saniyeler içinde katılın.'
                                        : 'E-posta adresinizi girerek şifrenizi sıfırlayın.'}
                            </p>
                        </div>

                        <div className="w-full space-y-5 relative">
                            {/* Social Buttons */}
                            {mode !== 'forgot-password' && (
                                <>
                                    <div className="grid grid-cols-1 gap-2.5">
                                        <button
                                            onClick={() => handleSocialLogin('Gmail')}
                                            disabled={!!isLoading}
                                            className="flex items-center justify-center gap-3 h-11 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-primary/[0.03] transition-all text-[11px] font-bold uppercase tracking-widest group relative overflow-hidden disabled:opacity-50"
                                        >
                                            {isLoading === 'Gmail' ? (
                                                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Mail size={14} className="text-foreground/20 group-hover:text-primary transition-colors" />
                                                    GMAIL İLE GİRİŞ YAP
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleSocialLogin('GitHub')}
                                            disabled={!!isLoading}
                                            className="flex items-center justify-center gap-3 h-11 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-primary/[0.03] transition-all text-[11px] font-bold uppercase tracking-widest group relative overflow-hidden disabled:opacity-50"
                                        >
                                            {isLoading === 'GitHub' ? (
                                                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Github size={14} className="text-foreground/20 group-hover:text-primary transition-colors" />
                                                    GITHUB İLE GİRİŞ YAP
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <div className="relative flex items-center gap-3 py-1">
                                        <div className="h-px bg-white/[0.05] flex-1" />
                                        <span className="text-[9px] text-foreground/15 font-black uppercase tracking-[0.4em]">Veya</span>
                                        <div className="h-px bg-white/[0.05] flex-1" />
                                    </div>
                                </>
                            )}

                            {/* Form Fields */}
                            <form onSubmit={handleSubmit} className="space-y-3">
                                {mode === 'register' && (
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-foreground/20 group-focus-within:text-primary transition-colors">
                                            <User size={16} />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Ad Soyad"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full h-11 bg-white/[0.02] border border-white/5 focus:border-primary/30 focus:bg-white/[0.04] rounded-xl pl-12 pr-4 text-[13px] outline-none transition-all font-medium placeholder:text-foreground/10"
                                        />
                                    </div>
                                )}
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-foreground/20 group-focus-within:text-primary transition-colors">
                                        <Mail size={16} />
                                    </div>
                                    <input
                                        required
                                        type="email"
                                        placeholder="E-posta Adresi"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-11 bg-white/[0.02] border border-white/5 focus:border-primary/30 focus:bg-white/[0.04] rounded-xl pl-12 pr-4 text-[13px] outline-none transition-all font-medium placeholder:text-foreground/10"
                                    />
                                </div>
                                {mode !== 'forgot-password' && (
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-foreground/20 group-focus-within:text-primary transition-colors">
                                            <Lock size={16} />
                                        </div>
                                        <input
                                            required
                                            type="password"
                                            placeholder="Şifre"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full h-11 bg-white/[0.02] border border-white/5 focus:border-primary/30 focus:bg-white/[0.04] rounded-xl pl-12 pr-4 text-[13px] outline-none transition-all font-medium placeholder:text-foreground/10"
                                        />
                                    </div>
                                )}
                                {mode === 'login' && (
                                    <div className="text-right px-1">
                                        <button
                                            type="button"
                                            onClick={() => setMode('forgot-password')}
                                            className="text-[10px] font-bold text-foreground/15 hover:text-primary transition-colors tracking-tight"
                                        >
                                            Şifremi Unuttum?
                                        </button>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={!!isLoading}
                                    className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2.5 hover:bg-primary/90 transition-all shadow-[0_15px_30px_rgba(14,165,233,0.15)] active:scale-[0.98] mt-2 group disabled:opacity-50"
                                >
                                    {isLoading === 'form' ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {mode === 'login' ? 'Giriş Yap' : mode === 'register' ? 'Kayıt Ol' : 'Şifre Gönder'}
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        <div className="mt-8 text-center relative w-full">
                            <button
                                onClick={() => {
                                    if (mode === 'forgot-password') setMode('login');
                                    else setMode(mode === 'login' ? 'register' : 'login');
                                }}
                                className="group inline-flex items-center justify-center py-1"
                            >
                                <span className="text-[11px] text-foreground/20 font-medium tracking-tight">
                                    {mode === 'login' ? 'Henüz hesabınız yok mu?' : mode === 'register' ? 'Zaten hesabınız var mı?' : 'Giriş sayfasına dön'}
                                </span>
                                <span className="ml-2.5 text-[11px] text-primary font-black group-hover:text-primary/80 transition-all uppercase tracking-widest border-b border-primary/20 group-hover:border-primary">
                                    {mode === 'login' ? 'KAYIT OL' : 'GİRİŞ YAP'}
                                </span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
