import { create } from 'zustand';

type AppState = {
    activePanel: 'left' | 'right' | null;
    uploadedFile: File | null;
    fileData: ArrayBuffer | string | null;
    fileExt: string | null;
    isWireframe: boolean;
    isAutoRotate: boolean;
    setActivePanel: (panel: 'left' | 'right' | null) => void;
    setUploadedFile: (file: File | null, data: ArrayBuffer | string | null, ext: string | null) => void;
    clearFile: () => void;
    toggleWireframe: () => void;
    toggleAutoRotate: () => void;
};

export const useViewerStore = create<AppState>((set) => ({
    activePanel: 'left', // default left panel open
    uploadedFile: null,
    fileData: null,
    fileExt: null,
    isWireframe: false,
    isAutoRotate: false,
    setActivePanel: (panel) => set({ activePanel: panel }),
    setUploadedFile: (file, data, ext) => set({ uploadedFile: file, fileData: data, fileExt: ext }),
    clearFile: () => set({ uploadedFile: null, fileData: null, fileExt: null, isWireframe: false, isAutoRotate: false }),
    toggleWireframe: () => set((state) => ({ isWireframe: !state.isWireframe })),
    toggleAutoRotate: () => set((state) => ({ isAutoRotate: !state.isAutoRotate })),
}));
