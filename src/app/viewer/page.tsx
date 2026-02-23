'use client';

import { Navbar } from '@/components/ui/Navbar';
import { LeftPanel } from '@/components/viewer/LeftPanel';
import { RightPanel } from '@/components/viewer/RightPanel';
import { Viewport } from '@/components/viewer/Viewport';
import { Dropzone } from '@/components/viewer/Dropzone';
import { useViewerStore } from '@/store/viewerStore';

export default function ViewerPage() {
    const { uploadedFile } = useViewerStore();

    return (
        <main className="flex min-h-screen flex-col bg-[#020617] overflow-hidden relative">
            <Navbar />

            {/* Viewer Workspace */}
            <div className="flex-1 flex w-full h-full relative mt-16">

                {uploadedFile ? (
                    <>
                        <LeftPanel />
                        <Viewport />
                        <RightPanel />
                    </>
                ) : (
                    <div className="w-full flex-1 flex items-center justify-center pt-8">
                        <Dropzone />
                    </div>
                )}

            </div>
        </main>
    );
}
