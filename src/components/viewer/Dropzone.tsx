'use client';

import { useState } from 'react';
import { UploadCloud, FileBox, Loader2 } from 'lucide-react';
import { useViewerStore } from '@/store/viewerStore';
import { uploadModel } from '@/store/modelStore';
import { useAuthSync } from '@/store/authStore';

export function Dropzone() {
    const [isDragActive, setIsDragActive] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { setUploadedFile } = useViewerStore();
    const { user } = useAuthSync();

    const processFile = async (file: File) => {
        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        if (!['stl', 'obj'].includes(ext)) {
            alert('Sadece STL ve OBJ formatları desteklenmektedir.');
            return;
        }

        setIsUploading(true);
        setUploadProgress(10); // Fake initial progress just for UX

        const reader = new FileReader();
        reader.onload = async (e) => {
            const result = e.target?.result;
            if (!result) {
                setIsUploading(false);
                return;
            }

            setUploadProgress(40); // Read complete

            // Also persist to Supabase Cloud Storage
            try {
                // Upload real model to cloud database
                const savedModel = await uploadModel(file, result as ArrayBuffer | string, ext, user);
                setUploadProgress(100);

                // Wait a tiny bit for the 100% to show
                setTimeout(() => {
                    // Set in-memory viewer state and the DB ID
                    setUploadedFile(file, result, ext, savedModel.id);
                    setIsUploading(false);
                }, 500);

            } catch (err) {
                console.error('Model buluta yüklenemedi:', err);
                alert('Dosya buluta yüklenirken hata oluştu. Lütfen tekrar deneyin.');
                setIsUploading(false);
            }
        };

        if (ext === 'stl') {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsText(file); // OBJ needs text
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            if (!isUploading) setIsDragActive(true);
        } else if (e.type === 'dragleave') {
            setIsDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (isUploading) return;

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (isUploading) return;

        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 z-10">
            <div
                className={`w-full max-w-2xl h-96 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden glass-panel
          ${isDragActive && !isUploading ? 'border-primary bg-primary/10 scale-105 border-dashed' : 'border-border/60 hover:border-primary/50 hover:bg-surface/80 border-dashed'}
          ${isUploading ? 'pointer-events-none border-primary/30 border-solid bg-surfaceMid rounded-3xl' : 'cursor-pointer'}
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {!isUploading && (
                    <input
                        type="file"
                        accept=".stl,.obj"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleChange}
                        disabled={isUploading}
                    />
                )}

                {isUploading ? (
                    <div className="flex flex-col items-center justify-center w-full max-w-xs mx-auto animate-in fade-in zoom-in duration-300">
                        <div className="relative w-24 h-24 mb-6">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    className="text-white/5 stroke-current"
                                    strokeWidth="6"
                                    fill="transparent"
                                    r="44"
                                    cx="50"
                                    cy="50"
                                />
                                <circle
                                    className="text-primaryGlow stroke-current transition-all duration-300 ease-out"
                                    strokeWidth="6"
                                    strokeDasharray="276"
                                    strokeDashoffset={276 - (276 * uploadProgress) / 100}
                                    strokeLinecap="round"
                                    fill="transparent"
                                    r="44"
                                    cx="50"
                                    cy="50"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Buluta Yükleniyor</h3>
                        <p className="text-foreground/50 text-sm animate-pulse">
                            Modeliniz güvenli Supabase sunucularına aktarılıyor...
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="w-20 h-20 rounded-full bg-surfaceAlt flex items-center justify-center mb-6 shadow-inner border border-border transition-transform group-hover:scale-110">
                            {isDragActive ? (
                                <FileBox className="w-10 h-10 text-primary animate-bounce" />
                            ) : (
                                <UploadCloud className="w-10 h-10 text-primary/70" />
                            )}
                        </div>

                        <h3 className="text-2xl font-bold mb-2">Modelinizi Sürükleyin veya Seçin</h3>
                        <p className="text-foreground/60 max-w-sm mb-6 mt-2 text-sm leading-relaxed">
                            Güvenli inceleme için bilgisayarınızdaki CAD dosyalarını bulut alanınıza yükleyin. Her yerden erişin ve paylaşın.
                        </p>

                        <div className="flex gap-4 items-center">
                            <span className="px-3 py-1.5 text-[11px] font-bold rounded-lg bg-primary/10 border border-primary/20 text-primaryGlow tracking-wider">.STL</span>
                            <span className="px-3 py-1.5 text-[11px] font-bold rounded-lg bg-accent/10 border border-accent/20 text-accentGlow tracking-wider">.OBJ</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
