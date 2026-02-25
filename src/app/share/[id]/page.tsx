'use client';

import { useEffect, useState, Suspense, use } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, UploadCloud, Box } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useViewerStore } from '@/store/viewerStore';
import { getModelById, downloadFileFromCloud, incrementModelViews } from '@/store/modelStore';

// Lazy-load the viewer components (they pull in Three.js)
const LeftPanel = dynamic(() => import('@/components/viewer/LeftPanel').then(m => m.LeftPanel), { ssr: false });
const Viewport = dynamic(() => import('@/components/viewer/Viewport').then(m => m.Viewport), { ssr: false });
const RightPanel = dynamic(() => import('@/components/viewer/RightPanel').then(m => m.RightPanel), { ssr: false });

function SharePageContent({ id }: { id: string }) {
    const router = useRouter();
    const { setUploadedFile, uploadedFile } = useViewerStore();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [modelName, setModelName] = useState('Model');

    useEffect(() => {
        if (!id) {
            setError('Geçersiz paylaşım linki.');
            setLoading(false);
            return;
        }

        async function loadSharedModel() {
            try {
                // 1. Fetch metadata
                const meta = await getModelById(id);
                if (!meta) throw new Error('Model bulunamadı veya silinmiş.');
                setModelName(meta.name);

                // 2. Download from storage
                const data = await downloadFileFromCloud(meta.file_path);
                if (!data) throw new Error('Dosya içeriği indirilemedi.');

                // 3. Increment view counter (fire and forget)
                incrementModelViews(id).catch(console.error);

                const ext = meta.format.toLowerCase();
                const file = new File(
                    [data instanceof ArrayBuffer ? data : data],
                    meta.name,
                    { type: 'application/octet-stream' }
                );

                setUploadedFile(file, data, ext, meta.id);
            } catch (err) {
                console.error(err);
                const errorMessage = err instanceof Error ? err.message : 'Link bozuk veya erişim izniniz yok.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        }

        loadSharedModel();
    }, [id, setUploadedFile]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Box className="w-7 h-7 text-primaryGlow animate-pulse" />
                </div>
                <p className="text-foreground/50 text-sm">Model buluttan indiriliyor...</p>
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
                    Paylaşılan Model — {modelName}
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

// In Next.js App Router, dynamic route params must be awaited if using React `use()` or passed down
export default function SharePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    return <SharePageContent id={resolvedParams.id} />;
}
