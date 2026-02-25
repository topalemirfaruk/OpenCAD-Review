import { supabase } from '@/lib/supabase';

export interface SavedModel {
    id: string;
    name: string;
    size: number;
    format: string;
    file_path: string;
    user_id?: string;
    user_name?: string;
    user_email?: string;
    user_avatar?: string;
    views: number;
    created_at: string;
}

// ─── Cloud Storage (Supabase) ───────────────────────────────────────────────

export async function uploadModel(
    file: File,
    data: ArrayBuffer | string,
    ext: string,
    user: { id?: string; name?: string; email?: string; avatar?: string } | null = null
): Promise<SavedModel> {
    const timestamp = Date.now();
    const randomHex = Math.random().toString(36).substring(2, 8);
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-]/g, '_');
    const filePath = `${user?.id || 'anonymous'}/${timestamp}_${randomHex}_${safeName}`;

    // 1. Upload file binary to Supabase Storage bucket 'models'
    const { error: storageError } = await supabase.storage
        .from('models')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (storageError) {
        console.error('Storage Upload Error:', storageError);
        throw new Error('Dosya buluta yüklenemedi.');
    }

    // 2. Insert metadata into Supabase Database table 'models'
    const { data: dbData, error: dbError } = await supabase
        .from('models')
        .insert([
            {
                name: file.name,
                size: file.size,
                format: ext.toUpperCase(),
                file_path: filePath,
                user_id: user?.id || null,
                user_name: user?.name || null,
                user_email: user?.email || null,
                user_avatar: user?.avatar || null,
            }
        ])
        .select()
        .single();

    if (dbError) {
        console.error('Database Insert Error:', dbError);
        // Fallback cleanup if DB fails but storage succeeded
        await supabase.storage.from('models').remove([filePath]);
        throw new Error('Model veritabanına kaydedilemedi.');
    }

    return dbData as SavedModel;
}

export async function getModelsMeta(userId: string): Promise<SavedModel[]> {
    if (!userId) return [];

    const { data, error } = await supabase
        .from('models')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Fetch Models Error:', error);
        return [];
    }

    return data || [];
}

export async function getModelById(id: string): Promise<SavedModel | null> {
    const { data, error } = await supabase
        .from('models')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        console.error('Fetch Model Error:', error);
        return null;
    }
    return data;
}

export async function incrementModelViews(id: string) {
    // Basic increment via RPC would be better, but doing a read-update for simplicity without creating custom SQL functions
    const model = await getModelById(id);
    if (model) {
        await supabase
            .from('models')
            .update({ views: model.views + 1 })
            .eq('id', id);
    }
}

export async function deleteModel(id: string, filePath: string) {
    // 1. Delete from storage
    if (filePath) {
        const { error: storageError } = await supabase.storage
            .from('models')
            .remove([filePath]);

        if (storageError) console.error('Storage Delete Error:', storageError);
    }

    // 2. Delete from database
    const { error: dbError } = await supabase
        .from('models')
        .delete()
        .eq('id', id);

    if (dbError) {
        console.error('Database Delete Error:', dbError);
        throw new Error('Model veritabanından silinemedi.');
    }
}

export async function downloadFileFromCloud(filePath: string): Promise<ArrayBuffer | string> {
    const { data, error } = await supabase.storage
        .from('models')
        .download(filePath);

    if (error || !data) {
        throw new Error('Dosya buluttan indirilemedi.');
    }

    // Determine if it should be text or arraybuffer based on extension
    const ext = filePath.split('.').pop()?.toLowerCase();

    if (ext === 'obj') {
        return await data.text();
    } else {
        return await data.arrayBuffer();
    }
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
