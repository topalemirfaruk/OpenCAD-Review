/**
 * modelStore.ts
 *
 * Persistent local model storage using:
 * - IndexedDB  → actual file binary (ArrayBuffer or text)
 * - localStorage → lightweight metadata list (name, size, format, date)
 *
 * This is 100% client-side — nothing ever leaves the browser.
 */

export interface SavedModel {
    id: string;
    name: string;
    size: number;      // bytes
    format: string;    // 'stl' | 'obj'
    savedAt: string;   // ISO string
    views: number;
}

// ─── localStorage metadata ──────────────────────────────────────────────────

const META_KEY = 'opencad_models_meta';

export function getModelsMeta(): SavedModel[] {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(META_KEY) || '[]');
    } catch {
        return [];
    }
}

function setModelsMeta(models: SavedModel[]) {
    localStorage.setItem(META_KEY, JSON.stringify(models));
}

export function incrementModelViews(id: string) {
    const models = getModelsMeta();
    const idx = models.findIndex(m => m.id === id);
    if (idx !== -1) {
        models[idx].views = (models[idx].views || 0) + 1;
        setModelsMeta(models);
    }
}

export function deleteModelMeta(id: string) {
    setModelsMeta(getModelsMeta().filter(m => m.id !== id));
}

// ─── IndexedDB file storage ─────────────────────────────────────────────────

const DB_NAME = 'opencad_files';
const DB_VERSION = 1;
const STORE_NAME = 'files';

function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = () => {
            req.result.createObjectStore(STORE_NAME);
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export async function saveFileToIDB(id: string, data: ArrayBuffer | string) {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(data, id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function loadFileFromIDB(id: string): Promise<ArrayBuffer | string | null> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const req = tx.objectStore(STORE_NAME).get(id);
        req.onsuccess = () => resolve(req.result ?? null);
        req.onerror = () => reject(req.error);
    });
}

export async function deleteFileFromIDB(id: string) {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// ─── Combined save / delete ─────────────────────────────────────────────────

export async function saveModel(
    file: File,
    data: ArrayBuffer | string,
    ext: string
): Promise<SavedModel> {
    const id = `model_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    const meta: SavedModel = {
        id,
        name: file.name,
        size: file.size,
        format: ext.toUpperCase(),
        savedAt: new Date().toISOString(),
        views: 0,
    };

    // Save file binary to IndexedDB
    await saveFileToIDB(id, data);

    // Save metadata to localStorage
    const models = getModelsMeta();
    setModelsMeta([meta, ...models]);

    return meta;
}

export async function deleteModel(id: string) {
    deleteModelMeta(id);
    await deleteFileFromIDB(id);
}

// ─── Human-readable helpers ─────────────────────────────────────────────────

export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function relativeTime(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Şimdi';
    if (mins < 60) return `${mins} dakika önce`;
    if (hours < 24) return `${hours} saat önce`;
    if (days < 7) return `${days} gün önce`;
    return new Date(iso).toLocaleDateString('tr-TR');
}
