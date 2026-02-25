'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, UploadCloud, Box } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useViewerStore } from '@/store/viewerStore';

// Lazy-load the viewer components (they pull in Three.js)
const LeftPanel = dynamic(() => import('@/components/viewer/LeftPanel').then(m => m.LeftPanel), { ssr: false });
const Viewport = dynamic(() => import('@/components/viewer/Viewport').then(m => m.Viewport), { ssr: false });
const RightPanel = dynamic(() => import('@/components/viewer/RightPanel').then(m => m.RightPanel), { ssr: false });

function base64ToArrayBuffer(b64: string): ArrayBuffer {
    const binary = atob(b64);
    const buf = new ArrayBuffer(binary.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < binary.length; i++) {
        view[i] = binary.charCodeAt(i);
    }
    return buf;
}

function SharePageContent() {
    const router = useRouter();
    const { setUploadedFile, uploadedFile } = useViewerStore();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const hash = window.location.hash.substring(1); // remove leading #
        if (!hash) {
            setError('Geçersiz paylaşım linki.');
            setLoading(false);
            return;
        }

        try {
            const params = new URLSearchParams(hash);
            const ext = params.get('ext');
            const name = params.get('name') || `shared_model.${ext}`;
            const data = params.get('data');

            if (!ext || !data) {
                throw new Error('Link eksik veri içeriyor.');
            }

            let fileData: ArrayBuffer | string;
            if (ext === 'stl') {
                fileData = base64ToArrayBuffer(data);
            } else {
                // OBJ is text
                fileData = decodeURIComponent(escape(atob(data)));
            }

            const file = new File(
                [fileData instanceof ArrayBuffer ? fileData : fileData],
                name,
                { type: 'application/octet-stream' }
            );

            setUploadedFile(file, fileData, ext);
        } catch (err) {
            console.error(err);
            setError('Link bozuk veya süresi geçmiş olabilir.');
        } finally {
            setLoading(false);
        }
    }, [setUploadedFile]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Box className="w-7 h-7 text-primaryGlow animate-pulse" />
                </div>
                <p className="text-foreground/50 text-sm">Model yükleniyor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-7 h-7 text-yellow-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">Link Açılamadı</h2>
                    <p className="text-foreground/50 text-sm max-w-sm">{error}</p>
                </div>
                <button
                    onClick={() => router.push('/viewer')}
                    className="btn-primary h-11 px-6 rounded-xl text-white font-semibold text-sm flex items-center gap-2"
                >
                    <UploadCloud size={16} />
                    Kendi Modelini Yükle
                </button>
            </div>
        );
    }

    if (!uploadedFile) return null;

    return (
        <div className="flex min-h-screen flex-col bg-background overflow-hidden relative">
            {/* Shared model banner */}
            <div className="fixed top-16 left-0 right-0 z-40 flex justify-center pointer-events-none">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-xs font-semibold text-primaryGlow backdrop-blur-sm">
                    <Box size={12} />
                    Paylaşılan Model — {uploadedFile instanceof File ? uploadedFile.name : 'Model'}
                </div>
            </div>

            <div className="flex-1 flex w-full h-full relative mt-16">
                <Suspense fallback={null}>
                    <LeftPanel />
                    <Viewport />
                    <RightPanel />
                </Suspense>
            </div>
        </div>
    );
}

export default function SharePage() {
    return <SharePageContent />;
}
