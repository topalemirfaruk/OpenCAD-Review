import { create } from 'zustand';

type AppState = {
    activePanel: 'left' | 'right' | null;
    uploadedFile: File | null;
    fileData: ArrayBuffer | string | null;
    fileExt: string | null;
    isWireframe: boolean;
    isAutoRotate: boolean;
    isSectioning: boolean;
    isExploded: boolean;
    explodeFactor: number;
    modelStructure: string[];
    modelId: string | null;
    setActivePanel: (panel: 'left' | 'right' | null) => void;
    setUploadedFile: (file: File | null, data: ArrayBuffer | string | null, ext: string | null, modelId?: string | null) => void;
    clearFile: () => void;
    toggleWireframe: () => void;
    toggleAutoRotate: () => void;
    toggleSectioning: () => void;
    toggleExploded: () => void;
    setExplodeFactor: (factor: number) => void;
    setModelStructure: (structure: string[]) => void;
};

export const useViewerStore = create<AppState>((set) => ({
    activePanel: 'left', // default left panel open
    uploadedFile: null,
    fileData: null,
    fileExt: null,
    modelId: null,
    isWireframe: false,
    isAutoRotate: false,
    isSectioning: false,
    isExploded: false,
    explodeFactor: 0,
    modelStructure: [],
    setActivePanel: (panel) => set({ activePanel: panel }),
    setUploadedFile: (file, data, ext, modelId = null) => set({ uploadedFile: file, fileData: data, fileExt: ext, modelId }),
    clearFile: () => set({ uploadedFile: null, fileData: null, fileExt: null, modelId: null, isWireframe: false, isAutoRotate: false, isSectioning: false, isExploded: false, explodeFactor: 0, modelStructure: [] }),
    toggleWireframe: () => set((state) => ({ isWireframe: !state.isWireframe })),
    toggleAutoRotate: () => set((state) => ({ isAutoRotate: !state.isAutoRotate })),
    toggleSectioning: () => set((state) => ({ isSectioning: !state.isSectioning })),
    toggleExploded: () => set((state) => ({ isExploded: !state.isExploded })),
    setExplodeFactor: (factor) => set({ explodeFactor: factor }),
    setModelStructure: (structure) => set({ modelStructure: structure }),
}));
