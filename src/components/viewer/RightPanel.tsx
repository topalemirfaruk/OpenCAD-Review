import { useState } from 'react';
import { MessageSquare, Share2, CornerDownRight, Check } from 'lucide-react';
import { useViewerStore } from '@/store/viewerStore';

export function RightPanel() {
    const { uploadedFile } = useViewerStore();
    const [copied, setCopied] = useState(false);

    if (!uploadedFile) return null;

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Kopyalama başarısız:', err);
        }
    };

    return (
        <div className="w-80 h-full glass-panel border-l border-border/50 flex flex-col absolute right-0 top-0 pt-16 z-20">
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <h2 className="font-semibold text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-accent" /> Yorumlar & İşbirliği
                </h2>
                <button
                    onClick={handleShare}
                    className={`transition-all duration-300 p-1.5 rounded-md flex items-center gap-1.5 ${copied ? 'bg-green-500/20 text-green-500' : 'text-primary hover:text-primaryGlow hover:bg-primary/10'}`}
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4" />
                            <span className="text-[10px] font-bold">Kopyalandı!</span>
                        </>
                    ) : (
                        <Share2 className="w-4 h-4" />
                    )}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                {/* Mock Comments */}
                <div className="bg-surfaceAlt/60 border border-border/60 rounded-xl p-3 hover:border-accent/40 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-accent to-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">AE</div>
                        <span className="text-xs font-semibold text-foreground/90">Ahmet E.</span>
                        <span className="text-[10px] text-foreground/40 ml-auto flex items-center gap-1 group-hover:text-primary/70 transition-colors">
                            <CornerDownRight className="w-3 h-3" /> Pin 1
                        </span>
                    </div>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                        Buradaki pah kırma ölçüsünü biraz daha artırabilir miyiz? Üretimde sorun çıkarabilir.
                    </p>
                </div>

                <div className="bg-surfaceAlt/60 border border-border/60 rounded-xl p-3 hover:border-primary/40 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">ME</div>
                        <span className="text-xs font-semibold text-foreground/90">Merve E.</span>
                        <span className="text-[10px] text-foreground/40 ml-auto flex items-center gap-1 group-hover:text-primary/70 transition-colors">
                            <CornerDownRight className="w-3 h-3" /> Pin 2
                        </span>
                    </div>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                        Cıvata delikleri m4 standardına tam uygun görünüyor, onaylıyorum.
                    </p>
                </div>
            </div>

            <div className="p-4 border-t border-border/50 bg-surfaceAlt/30">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Yorum ekle..."
                        className="w-full bg-surface border border-border rounded-lg pl-3 pr-10 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-foreground/30"
                    />
                    <button
                        className="absolute right-1.5 top-1.5 p-1 text-primary hover:text-primaryGlow bg-primary/10 hover:bg-primary/20 rounded-md transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            if (input && input.value) {
                                alert(`Yorum eklendi: ${input.value} (Bu özellik demo amaçlıdır ve veritabanına kaydedilmez)`);
                                input.value = '';
                            }
                        }}
                    >
                        <CornerDownRight className="w-3.5 h-3.5" />
                    </button>
                </div>
                <p className="text-[10px] text-center text-foreground/40 mt-2">
                    Yorumlar tarayıcı oturumunda tutulur.
                </p>
            </div>
        </div>
    );
}
