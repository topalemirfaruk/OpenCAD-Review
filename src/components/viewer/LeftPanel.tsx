'use client';

import { useViewerStore } from '@/store/viewerStore';
import { Layers, Cuboid, Settings2, Trash2 } from 'lucide-react';

export function LeftPanel() {
    const { fileExt, uploadedFile, clearFile, isWireframe, isAutoRotate, toggleWireframe, toggleAutoRotate } = useViewerStore();

    return (
        <div className="w-80 h-full glass-panel border-r border-border/50 flex flex-col absolute left-0 top-0 pt-16 z-20">
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <h2 className="font-semibold text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" /> Model Özellikleri
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                <div>
                    <h3 className="text-xs uppercase font-bold text-foreground/50 tracking-wider mb-3">Dosya Bilgisi</h3>
                    <div className="space-y-3">
                        <div className="bg-surfaceAlt p-3 rounded-lg border border-border text-sm flex items-start gap-3">
                            <Cuboid className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                            <div className="overflow-hidden">
                                <p className="font-medium truncate" title={uploadedFile?.name || 'Bilinmiyor'}>
                                    {uploadedFile?.name || 'Bilinmiyor'}
                                </p>
                                <p className="text-foreground/50 text-xs mt-1">
                                    Format: <span className="uppercase text-primary">{fileExt}</span>
                                </p>
                                <p className="text-foreground/50 text-xs">
                                    Boyut: {uploadedFile ? (uploadedFile.size / 1024 / 1024).toFixed(2) : 0} MB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs uppercase font-bold text-foreground/50 tracking-wider mb-3">Görünüm Seçenekleri</h3>
                    <div className="space-y-2">
                        <button
                            onClick={toggleWireframe}
                            className={`w-full text-left px-3 py-2 text-sm rounded border transition-colors flex items-center gap-2 ${isWireframe ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-surfaceAlt/50 hover:bg-surfaceAlt border-transparent hover:border-border text-foreground/70'}`}
                        >
                            <Settings2 className="w-4 h-4" />
                            Tel Kafes (Wireframe) Göster
                        </button>
                        <button
                            onClick={toggleAutoRotate}
                            className={`w-full text-left px-3 py-2 text-sm rounded border transition-colors flex items-center gap-2 ${isAutoRotate ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-surfaceAlt/50 hover:bg-surfaceAlt border-transparent hover:border-border text-foreground/70'}`}
                        >
                            <Settings2 className="w-4 h-4" />
                            Otomatik Döndürme
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-border/50 mt-auto">
                <button
                    onClick={clearFile}
                    className="w-full py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <Trash2 className="w-4 h-4" /> Modeli Kapat
                </button>
            </div>
        </div>
    );
}
