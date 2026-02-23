'use client';

import { useState } from 'react';
import { UploadCloud, FileBox } from 'lucide-react';
import { useViewerStore } from '@/store/viewerStore';

export function Dropzone() {
    const [isDragActive, setIsDragActive] = useState(false);
    const { setUploadedFile } = useViewerStore();

    const processFile = (file: File) => {
        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        if (!['stl', 'obj'].includes(ext)) {
            alert('Sadece STL ve OBJ formatları desteklenmektedir.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result;
            if (result) {
                setUploadedFile(file, result, ext);
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
            setIsDragActive(true);
        } else if (e.type === 'dragleave') {
            setIsDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 z-10">
            <div
                className={`w-full max-w-2xl h-96 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 text-center cursor-pointer relative overflow-hidden glass-panel
          ${isDragActive ? 'border-primary bg-primary/10 scale-105' : 'border-border/60 hover:border-primary/50 hover:bg-surface/80'}
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept=".stl,.obj"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleChange}
                />

                <div className="w-20 h-20 rounded-full bg-surfaceAlt flex items-center justify-center mb-6 shadow-inner border border-border">
                    {isDragActive ? (
                        <FileBox className="w-10 h-10 text-primary animate-bounce" />
                    ) : (
                        <UploadCloud className="w-10 h-10 text-primary/70" />
                    )}
                </div>

                <h3 className="text-2xl font-bold mb-2">Modelinizi Sürükleyin veya Seçin</h3>
                <p className="text-foreground/60 max-w-sm mb-6">
                    Güvenli inceleme için bilgisayarınızdaki CAD dosyalarını yükleyin. Dosyalarınız sunucuya gönderilmez.
                </p>

                <div className="flex gap-4 items-center">
                    <span className="px-3 py-1 text-xs font-semibold rounded-md bg-surfaceAlt border border-border text-foreground/80">.STL</span>
                    <span className="px-3 py-1 text-xs font-semibold rounded-md bg-surfaceAlt border border-border text-foreground/80">.OBJ</span>
                </div>
            </div>
        </div>
    );
}
