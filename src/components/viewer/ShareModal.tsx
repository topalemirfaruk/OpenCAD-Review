'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cloud, Link as LinkIcon, Globe, Shield, Check, Copy } from 'lucide-react';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    modelName: string;
}

export function ShareModal({ isOpen, onClose, modelName }: ShareModalProps) {
    const [step, setStep] = useState<'initial' | 'uploading' | 'completed'>('initial');
    const [progress, setProgress] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (step === 'uploading') {
            const timer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        setStep('completed');
                        return 100;
                    }
                    return prev + 5;
                });
            }, 100);
            return () => clearInterval(timer);
        }
    }, [step]);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://opencad.review/share/${Math.random().toString(36).substring(7)}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg glass-panel p-8 rounded-3xl border-primary/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-foreground/40 hover:text-foreground transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-1">
                            <Cloud className="text-primary w-5 h-5" />
                            Bulut Paylaşımı
                        </h2>
                        <p className="text-xs text-foreground/50">
                            <strong>{modelName}</strong> projesini güvenli bir linkle ekibinize paylaşın.
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 'initial' && (
                            <motion.div
                                key="initial"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-3">
                                    <div className="p-4 rounded-2xl bg-surfaceAlt border border-border/50 flex items-start gap-4 hover:border-primary/30 transition-all cursor-pointer group">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary/20">
                                            <Globe size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold mb-0.5">Herkese Açık Link</h3>
                                            <p className="text-[10px] text-foreground/40 leading-relaxed">Projeyi linke sahip olan herkes görüntüleyebilir ve yorum yapabilir.</p>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-surfaceAlt border border-border/50 flex items-start gap-4 hover:border-accent/30 transition-all cursor-pointer group">
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 transition-colors group-hover:bg-accent/20">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold mb-0.5">Gizli Paylaşım</h3>
                                            <p className="text-[10px] text-foreground/40 leading-relaxed">Sadece belirli e-posta adreslerine sahip kişiler projeyi görüntüleyebilir.</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep('uploading')}
                                    className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                                >
                                    Link Oluştur ve Paylaş
                                </button>
                            </motion.div>
                        )}

                        {step === 'uploading' && (
                            <motion.div
                                key="uploading"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="py-12 flex flex-col items-center justify-center gap-6"
                            >
                                <div className="relative w-24 h-24">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle
                                            className="text-white/5 stroke-current"
                                            strokeWidth="8"
                                            fill="transparent"
                                            r="40"
                                            cx="50"
                                            cy="50"
                                        />
                                        <motion.circle
                                            className="text-primary stroke-current"
                                            strokeWidth="8"
                                            strokeDasharray="251.2"
                                            strokeDashoffset={251.2 - (251.2 * progress) / 100}
                                            strokeLinecap="round"
                                            fill="transparent"
                                            r="40"
                                            cx="50"
                                            cy="50"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">
                                        %{progress}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold mb-1">Buluta Yükleniyor</h3>
                                    <p className="text-[10px] text-foreground/40 animate-pulse">Model verileri şifreleniyor ve güvenli sunuculara aktarılıyor...</p>
                                </div>
                            </motion.div>
                        )}

                        {step === 'completed' && (
                            <motion.div
                                key="completed"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div className="p-8 rounded-3xl bg-green-500/5 border border-green-500/20 flex flex-col items-center justify-center gap-4 text-center">
                                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                        <Check size={32} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Hazır!</h3>
                                        <p className="text-xs text-foreground/50">Projeniz başarıyla buluta yüklendi ve paylaşıma açıldı.</p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="flex items-center gap-2 p-1 pl-4 rounded-xl bg-surfaceAlt border border-border/50">
                                        <LinkIcon size={16} className="text-primary" />
                                        <span className="flex-1 text-[11px] font-mono text-foreground/60 truncate">opencad.review/share/x7v93j2...</span>
                                        <button
                                            onClick={handleCopy}
                                            className="flex items-center gap-2 h-9 px-4 rounded-lg bg-surface hover:bg-surfaceAlt border border-border/50 transition-all text-xs font-bold"
                                        >
                                            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                            {copied ? 'Kopyalandı' : 'Kopyala'}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="w-full h-12 bg-surfaceAlt border border-border/50 text-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-surface transition-all"
                                >
                                    Kapat
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
