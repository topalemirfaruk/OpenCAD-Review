'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link as LinkIcon, Globe, Check, Copy, AlertTriangle, Loader2 } from 'lucide-react';
import { useViewerStore } from '@/store/viewerStore';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    modelName: string;
}

const MAX_SHARE_SIZE = 4 * 1024 * 1024; // 4 MB limit for URL encoding

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

export function ShareModal({ isOpen, onClose, modelName }: ShareModalProps) {
    const { fileData, fileExt, uploadedFile } = useViewerStore();
    const [step, setStep] = useState<'initial' | 'generating' | 'completed' | 'toobig'>('initial');
    const [shareUrl, setShareUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const fileSize = uploadedFile instanceof File ? uploadedFile.size : 0;
    const tooBig = fileSize > MAX_SHARE_SIZE;

    const handleGenerate = async () => {
        if (tooBig) {
            setStep('toobig');
            return;
        }

        setStep('generating');

        try {
            let encoded = '';
            if (fileData instanceof ArrayBuffer) {
                encoded = arrayBufferToBase64(fileData);
            } else if (typeof fileData === 'string') {
                encoded = btoa(unescape(encodeURIComponent(fileData)));
            } else {
                throw new Error('Dosya verisi bulunamadı.');
            }

            const base = window.location.origin;
            const url = `${base}/share#ext=${fileExt}&name=${encodeURIComponent(modelName)}&data=${encoded}`;
            setShareUrl(url);
            setStep('completed');
        } catch (err) {
            console.error(err);
            setStep('toobig');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const reset = () => {
        setStep('initial');
        setShareUrl('');
        setCopied(false);
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg glass-panel p-8 rounded-3xl border-primary/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                    <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-foreground/40 hover:text-foreground transition-colors">
                        <X size={20} />
                    </button>

                    <div className="mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-1">
                            <Globe className="text-primaryGlow w-5 h-5" />
                            Model Paylaş
                        </h2>
                        <p className="text-xs text-foreground/50">
                            <strong>{modelName}</strong> — {(fileSize / 1024).toFixed(0)} KB
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* ── INITIAL ─────────────────────────── */}
                        {step === 'initial' && (
                            <motion.div key="initial" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-5">
                                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primaryGlow shrink-0">
                                        <LinkIcon size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold mb-1">Paylaşım Linki Oluştur</h3>
                                        <p className="text-xs text-foreground/45 leading-relaxed">
                                            Model dosyası doğrudan linke gömülür. Linki alan herkes dosyayı tarayıcısında açabilir — sunucu veya hesap gerekmez.
                                        </p>
                                        {tooBig && (
                                            <p className="text-xs text-yellow-400 mt-2 flex items-center gap-1">
                                                <AlertTriangle size={12} />
                                                Dosya büyük ({(fileSize / 1024 / 1024).toFixed(1)} MB) — link çok uzun olabilir.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    className="btn-primary w-full h-12 rounded-xl text-white font-bold flex items-center justify-center gap-2 text-sm"
                                >
                                    <LinkIcon size={16} />
                                    Link Oluştur
                                </button>
                            </motion.div>
                        )}

                        {/* ── GENERATING ──────────────────────── */}
                        {step === 'generating' && (
                            <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-12 flex flex-col items-center gap-4">
                                <Loader2 className="w-10 h-10 text-primaryGlow animate-spin" />
                                <p className="text-sm font-semibold">Link hazırlanıyor...</p>
                                <p className="text-xs text-foreground/40">Dosya linke gömülüyor</p>
                            </motion.div>
                        )}

                        {/* ── COMPLETED ───────────────────────── */}
                        {step === 'completed' && (
                            <motion.div key="completed" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-5">
                                <div className="p-5 rounded-2xl bg-teal/5 border border-teal/20 flex items-center gap-3">
                                    <Check className="w-6 h-6 text-teal shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-teal">Link hazır!</p>
                                        <p className="text-xs text-foreground/45">Bu linki paylaşarak modeli doğrudan açtırabilirsiniz.</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 p-1 pl-4 rounded-xl bg-surfaceAlt border border-border/50">
                                    <LinkIcon size={14} className="text-primaryGlow shrink-0" />
                                    <span className="flex-1 text-[11px] font-mono text-foreground/50 truncate">
                                        {shareUrl.substring(0, 60)}…
                                    </span>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 h-9 px-4 rounded-lg bg-surface hover:bg-surfaceAlt border border-border/50 transition-all text-xs font-bold shrink-0"
                                    >
                                        {copied ? <Check size={13} className="text-teal" /> : <Copy size={13} />}
                                        {copied ? 'Kopyalandı!' : 'Kopyala'}
                                    </button>
                                </div>

                                <p className="text-[10px] text-foreground/30 flex items-start gap-1.5">
                                    <AlertTriangle size={10} className="mt-0.5 shrink-0 text-yellow-500/60" />
                                    Model verisi linkin içinde saklanır. Çok büyük dosyalar için link bazı tarayıcılarda kesilebilir.
                                </p>

                                <div className="flex gap-3">
                                    <button onClick={reset} className="flex-1 h-10 glass-card border-borderLight/50 text-foreground/60 rounded-xl text-xs font-bold hover:text-foreground transition-all">
                                        Yeni Link
                                    </button>
                                    <button onClick={handleClose} className="flex-1 h-10 glass-card border-borderLight/50 text-foreground/60 rounded-xl text-xs font-bold hover:text-foreground transition-all">
                                        Kapat
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* ── TOO BIG ─────────────────────────── */}
                        {step === 'toobig' && (
                            <motion.div key="toobig" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 flex items-start gap-3">
                                    <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-yellow-400 mb-1">Dosya çok büyük</p>
                                        <p className="text-xs text-foreground/50 leading-relaxed">
                                            {(fileSize / 1024 / 1024).toFixed(1)} MB boyutundaki bu dosya URL&apos;e sığmıyor.
                                            Dosyayı dashboard&apos;dan tekrar yükleyerek aynı tarayıcıda açabilirsiniz.
                                        </p>
                                    </div>
                                </div>
                                <button onClick={reset} className="btn-primary w-full h-11 rounded-xl text-white font-bold text-sm">
                                    Geri Dön
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
