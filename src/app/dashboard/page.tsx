'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Box, Clock, Filter, Search,
    HardDrive, Users, Activity, UploadCloud,
    FolderOpen, LogIn, Trash2, Eye, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthSync } from '@/store/authStore';
import {
    getModelsMeta, deleteModel, formatFileSize,
    relativeTime, downloadFileFromCloud, type SavedModel
} from '@/store/modelStore';
import { useViewerStore } from '@/store/viewerStore';

export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading: authLoading } = useAuthSync();
    const { setUploadedFile } = useViewerStore();

    const [models, setModels] = useState<SavedModel[]>([]);
    const [search, setSearch] = useState('');
    const [formatFilter, setFormatFilter] = useState<'ALL' | 'STL' | 'OBJ'>('ALL');
    const [openingId, setOpeningId] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState(true);

    const refreshModels = useCallback(async () => {
        if (!user?.id) return;
        setIsFetching(true);
        try {
            const data = await getModelsMeta(user.id);
            setModels(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetching(false);
        }
    }, [user?.id]); // Re-fetch when user ID is available

    useEffect(() => {
        if (isAuthenticated) {
            refreshModels();
        } else if (!authLoading) {
            setIsFetching(false);
        }
    }, [isAuthenticated, authLoading, refreshModels]);

    // Redirect unauthenticated users
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.replace('/');
        }
    }, [authLoading, isAuthenticated, router]);

    const handleOpen = async (model: SavedModel) => {
        setOpeningId(model.id);
        try {
            // Download binary from Supabase Storage
            const data = await downloadFileFromCloud(model.file_path);
            if (!data) {
                alert('Dosya buluttan indirilemedi.');
                return;
            }
            const ext = model.format.toLowerCase();
            // Create a dummy File object so viewerStore is satisfied
            const file = new File(
                [data instanceof ArrayBuffer ? data : data],
                model.name,
                { type: 'application/octet-stream' }
            );

            // Pass the modelId to the viewer store so it's shareable
            setUploadedFile(file, data, ext, model.id);
            router.push('/viewer');
        } catch (err) {
            console.error(err);
            alert('Model açılırken bir hata oluştu veya dosya silinmiş.');
        } finally {
            setOpeningId(null);
        }
    };

    const handleDelete = async (model: SavedModel) => {
        if (!confirm('Bu modeli buluttan kalıcı olarak silmek istediğinize emin misiniz?')) return;
        try {
            await deleteModel(model.id, model.file_path);
            refreshModels();
        } catch (err) {
            console.error(err);
            alert('Model silinirken hata oluştu.');
        }
    };

    // Derived values
    const filtered = models.filter(m => {
        const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
        const matchFormat = formatFilter === 'ALL' || m.format === formatFilter;
        return matchSearch && matchFormat;
    });

    const totalSize = models.reduce((acc, m) => acc + (Number(m.size) || 0), 0);
    const totalViews = models.reduce((acc, m) => acc + (Number(m.views) || 0), 0);

    // ── Loading state ────────────────────────────────────────────────────────
    if (authLoading || (isFetching && models.length === 0)) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-primary/30 border-t-primaryGlow rounded-full animate-spin" />
                    <p className="text-foreground/40 text-sm">Modelleriniz buluttan çekiliyor...</p>
                </div>
            </main>
        );
    }

    // ── Not authenticated ────────────────────────────────────────────────────
    if (!isAuthenticated || !user) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-3xl p-10 text-center max-w-md w-full border-primary/20"
                >
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <LogIn className="w-8 h-8 text-primaryGlow" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Giriş Gerekiyor</h2>
                    <p className="text-foreground/50 text-sm mb-7">
                        Hesabınızın modellerini görüntülemek için giriş yapmalısınız.
                    </p>
                    <Link href="/" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm">
                        Ana Sayfaya Dön
                    </Link>
                </motion.div>
            </main>
        );
    }

    // ── Authenticated ────────────────────────────────────────────────────────
    return (
        <main className="max-w-7xl mx-auto px-4 pt-28 pb-24">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
            >
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary/30 bg-surfaceAlt relative flex-shrink-0">
                        {user.avatar ? (
                            <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-primaryGlow font-bold text-xl">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-foreground/50 text-xs font-semibold uppercase tracking-widest mb-0.5">Hoş geldin 👋</p>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-foreground/40 text-xs mt-0.5">{user.email}</p>
                    </div>
                </div>
                <Link href="/viewer" className="btn-primary h-11 px-6 rounded-xl text-white font-bold flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    <Plus size={18} />
                    Yeni Model Yükle
                </Link>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                    { label: 'Bulut Modelleri', value: String(models.length), icon: <Box className="text-primaryGlow w-5 h-5" />, bg: 'bg-primary/10 border-primary/20' },
                    { label: 'Bulut Depolama', value: formatFileSize(totalSize), icon: <HardDrive className="text-accentGlow w-5 h-5" />, bg: 'bg-accent/10 border-accent/20' },
                    { label: 'STL Dosyaları', value: String(models.filter(m => m.format === 'STL').length), icon: <Users className="text-teal w-5 h-5" />, bg: 'bg-teal/10 border-teal/20' },
                    { label: 'Görüntüleme', value: String(totalViews), icon: <Activity className="text-yellow-400 w-5 h-5" />, bg: 'bg-yellow-500/10 border-yellow-500/20' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="glass-card p-5 rounded-2xl border-borderLight/50 card-hover"
                    >
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-4 ${stat.bg}`}>
                            {stat.icon}
                        </div>
                        <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold stat-number">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" size={16} />
                    <input
                        type="text"
                        placeholder="Modellerde ara..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full h-10 bg-surfaceMid/60 border border-borderLight/50 rounded-xl pl-9 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all text-foreground/80 placeholder:text-foreground/25"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {(['ALL', 'STL', 'OBJ'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFormatFilter(f)}
                            className={`flex-1 sm:flex-none h-10 px-4 rounded-xl text-xs font-bold transition-all border ${formatFilter === f
                                ? 'bg-primary/20 border-primary/40 text-primaryGlow'
                                : 'glass-card border-borderLight/50 text-foreground/50 hover:text-foreground hover:border-primary/30'
                                }`}
                        >
                            {f === 'ALL' ? <><Filter size={12} className="inline mr-1" />Hepsi</> : `.${f}`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Model list */}
            <div className="glass-card rounded-2xl border-borderLight/50 overflow-hidden min-h-[400px]">
                {filtered.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-24 flex flex-col items-center justify-center text-center px-4"
                    >
                        <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                            <FolderOpen className="w-10 h-10 text-primaryGlow" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">
                            {search || formatFilter !== 'ALL' ? 'Sonuç Bulunamadı' : 'Bulut Alanınız Boş'}
                        </h3>
                        <p className="text-foreground/40 text-sm max-w-sm mb-8 leading-relaxed">
                            {search || formatFilter !== 'ALL'
                                ? 'Farklı arama kriterleri deneyin.'
                                : 'CAD dosyalarınızı güvenli Supabase bulutuna yükleyin. Her cihazdan anında erişin ve ekibinizle paylaşın.'}
                        </p>
                        {!search && formatFilter === 'ALL' && (
                            <Link href="/viewer" className="btn-primary h-11 px-6 rounded-xl text-white font-bold flex items-center gap-2 text-sm">
                                <UploadCloud size={18} />
                                Buluta Model Yükle
                            </Link>
                        )}
                    </motion.div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-borderLight/40 bg-surfaceMid/30">
                                    <th className="px-6 py-4 text-xs font-bold text-foreground/35 uppercase tracking-widest">Model Adı</th>
                                    <th className="px-6 py-4 text-xs font-bold text-foreground/35 uppercase tracking-widest">Format</th>
                                    <th className="px-6 py-4 text-xs font-bold text-foreground/35 uppercase tracking-widest">Boyut</th>
                                    <th className="px-6 py-4 text-xs font-bold text-foreground/35 uppercase tracking-widest hidden md:table-cell">Tarih</th>
                                    <th className="px-6 py-4 text-xs font-bold text-foreground/35 uppercase tracking-widest text-right">İşlem</th>
                                </tr>
                            </thead>
                            <AnimatePresence>
                                <tbody className="divide-y divide-borderLight/20">
                                    {filtered.map((model, i) => (
                                        <motion.tr
                                            key={model.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="hover:bg-white/3 transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center border font-mono text-[10px] font-bold flex-shrink-0 ${model.format === 'STL'
                                                        ? 'bg-primary/10 border-primary/20 text-primaryGlow'
                                                        : 'bg-accent/10 border-accent/20 text-accentGlow'
                                                        }`}>
                                                        .{model.format}
                                                    </div>
                                                    <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors truncate max-w-[180px]">
                                                        {model.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold text-foreground/50 border border-borderLight/30">
                                                    {model.format}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-foreground/50 font-mono">
                                                {formatFileSize(model.size)}
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <div className="flex items-center gap-2 text-foreground/40">
                                                    <Clock size={13} />
                                                    <span className="text-xs">{relativeTime(model.created_at)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => handleOpen(model)}
                                                        disabled={openingId === model.id}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg btn-primary text-white text-xs font-bold disabled:opacity-50 transition-all"
                                                        title="Görüntüleyicide Aç"
                                                    >
                                                        {openingId === model.id ? (
                                                            <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                                                        ) : (
                                                            <Eye size={13} />
                                                        )}
                                                        <span className="hidden sm:inline">Aç</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(model)}
                                                        className="p-2 text-foreground/25 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                                        title="Buluttan Sil"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </AnimatePresence>
                        </table>
                    </div>
                )}
            </div>

            {/* Storage info */}
            {models.length > 0 && (
                <p className="text-center text-foreground/40 text-xs mt-5 flex items-center justify-center gap-1.5 font-medium">
                    <ExternalLink size={12} className="text-primary/70" />
                    Modeller güvenli Supabase cloud sürücünüzde saklanmaktadır — tüm cihazlarınızdan erişebilirsiniz
                </p>
            )}
        </main>
    );
}
