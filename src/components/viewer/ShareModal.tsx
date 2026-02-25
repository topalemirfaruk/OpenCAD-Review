'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link as LinkIcon, Globe, Check, Copy, AlertTriangle } from 'lucide-react';
import { useViewerStore } from '@/store/viewerStore';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    modelName: string;
}

export function ShareModal({ isOpen, onClose, modelName }: ShareModalProps) {
    const { modelId } = useViewerStore();
    const [copied, setCopied] = useState(false);

    // With a real backend, we share by ID, not by massive URL hashes
    const shareUrl = modelId
        ? `${typeof window !== 'undefined' ? window.location.origin : ''}/share/${modelId}`
        : '';

    const handleCopy = () => {
        if (!shareUrl) return;
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

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
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 text-foreground/40 hover:text-foreground transition-colors">
                        <X size={20} />
                    </button>

                    <div className="mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-1">
                            <Globe className="text-primaryGlow w-5 h-5" />
                            Model Paylaş
                        </h2>
                        <p className="text-xs text-foreground/50">
                            <strong>{modelName}</strong>
                        </p>
                    </div>

                    {!modelId ? (
                        <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 shrink-0">
                                <AlertTriangle size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-yellow-400 mb-1">Model Kaydedilmemiş</h3>
                                <p className="text-xs text-foreground/50 leading-relaxed font-medium">
                                    Bu model henüz buluta yüklenmemiş. Lütfen modeli <strong>Çalışma Alanı (Upload)</strong> veya <strong>Dashboard</strong> ekranından yüklediğinize emin olun. Zaten yüklediğiniz modeller Dashboard üzerinden açıldığında kolayca paylaşılabilir.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primaryGlow shrink-0">
                                    <LinkIcon size={18} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold mb-1">Bulut Linki Hazır</h3>
                                    <p className="text-xs text-foreground/45 leading-relaxed font-medium">
                                        Bu linki alan herkes modeli tarayıcıdan, herhangi bir üyelik oluşturmadan hemen görüntüleyebilir. Görüntülemeler istatistiklerinize yansır.
                                    </p>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="flex items-center gap-2 p-1 pl-4 rounded-xl bg-surfaceAlt border border-border/50">
                                    <LinkIcon size={14} className="text-primaryGlow shrink-0" />
                                    <span className="flex-1 text-[11px] font-mono text-foreground/50 truncate select-all">
                                        {shareUrl}
                                    </span>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 h-9 px-4 rounded-lg bg-surface hover:bg-surfaceAlt border border-border/50 transition-all text-xs font-bold shrink-0"
                                    >
                                        {copied ? <Check size={13} className="text-teal" /> : <Copy size={13} />}
                                        {copied ? 'Kopyalandı!' : 'Kopyala'}
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full h-11 bg-surfaceAlt/50 border border-border/50 text-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-surface transition-all text-sm mt-4"
                            >
                                Kapat
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
