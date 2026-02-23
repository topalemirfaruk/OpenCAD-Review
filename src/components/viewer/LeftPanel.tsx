'use client';

import { useViewerStore } from '@/store/viewerStore';
import { Layers, Cuboid, Settings2, Trash2 } from 'lucide-react';

export function LeftPanel() {
    const {
        fileExt,
        uploadedFile,
        clearFile,
        isWireframe,
        isAutoRotate,
        isSectioning,
        isExploded,
        explodeFactor,
        toggleWireframe,
        toggleAutoRotate,
        toggleSectioning,
        toggleExploded,
        setExplodeFactor
    } = useViewerStore();

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
                            onClick={toggleSectioning}
                            className={`w-full text-left px-3 py-2 text-sm rounded border transition-colors flex items-center gap-2 ${isSectioning ? 'bg-accent/20 border-accent/50 text-accent' : 'bg-surfaceAlt/50 hover:bg-surfaceAlt border-transparent hover:border-border text-foreground/70'}`}
                        >
                            <Settings2 className="w-4 h-4" />
                            Kesit Görünümü (Section)
                        </button>
                        <button
                            onClick={toggleExploded}
                            className={`w-full text-left px-3 py-2 text-sm rounded border transition-colors flex items-center gap-2 ${isExploded ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-surfaceAlt/50 hover:bg-surfaceAlt border-transparent hover:border-border text-foreground/70'}`}
                        >
                            <Settings2 className="w-4 h-4" />
                            Parçaları Patlat (Explode)
                        </button>
                        {isExploded && (
                            <div className="px-2 pt-1 pb-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={explodeFactor}
                                    onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
                                    className="w-full accent-primary h-1.5 bg-surfaceAlt rounded-lg cursor-pointer"
                                />
                                <div className="flex justify-between text-[10px] text-foreground/40 mt-1">
                                    <span>Kapalı</span>
                                    <span>Seviye: {explodeFactor.toFixed(1)}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {modelStructure.length > 0 && (
                    <div>
                        <h3 className="text-xs uppercase font-bold text-foreground/50 tracking-wider mb-3">Parça Hiyerarşisi</h3>
                        <div className="bg-surfaceAlt/30 border border-border/40 rounded-lg overflow-hidden">
                            {modelStructure.slice(0, 10).map((name, idx) => (
                                <div key={idx} className="px-3 py-2 text-xs border-b border-border/20 last:border-0 flex items-center gap-2 hover:bg-primary/5 transition-colors cursor-default">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                                    <span className="truncate">{name}</span>
                                </div>
                            ))}
                            {modelStructure.length > 10 && (
                                <div className="px-3 py-1.5 text-[10px] text-foreground/30 text-center italic bg-surfaceAlt/20">
                                    + {modelStructure.length - 10} parça daha
                                </div>
                            )}
                        </div>
                    </div>
                )}
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
