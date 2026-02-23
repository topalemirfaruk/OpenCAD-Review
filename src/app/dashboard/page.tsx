'use client';

import { motion } from 'framer-motion';
import {
    Plus,
    Box,
    Clock,
    Share2,
    MoreVertical,
    Search,
    Filter,
    HardDrive,
    Users,
    Activity
} from 'lucide-react';
import Link from 'next/link';

const myProjects = [
    { id: 1, name: 'Dragon 2.5_stl.stl', size: '1.81 MB', date: '2 saat önce', format: 'STL', views: 24 },
    { id: 2, name: 'EngineAssembly_v3.obj', size: '12.4 MB', date: 'Dün', format: 'OBJ', views: 89 },
    { id: 3, name: 'DroneFrame_Proto.obj', size: '4.2 MB', date: '3 gün önce', format: 'OBJ', views: 12 },
    { id: 4, name: 'GearBox_Final.stl', size: '2.1 MB', date: '1 hafta önce', format: 'STL', views: 56 },
];

export default function DashboardPage() {
    return (
        <main className="max-w-7xl mx-auto px-4 pt-32 pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Çalışma Alanım</h1>
                    <p className="text-foreground/60 text-sm">CAD projelerinizi yönetin ve ekibinizle paylaşın.</p>
                </div>
                <Link href="/viewer" className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    <Plus size={20} />
                    Yeni Proje Yükle
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {[
                    { label: 'Toplam Proje', value: '12', icon: <Box className="text-primary" /> },
                    { label: 'Depolama', value: '%64', icon: <HardDrive className="text-accent" /> },
                    { label: 'Paylaşılan', value: '8', icon: <Users className="text-purple-500" /> },
                    { label: 'Görüntüleme', value: '184', icon: <Activity className="text-green-500" /> },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel p-6 rounded-2xl border-border/30"
                    >
                        <div className="w-10 h-10 rounded-xl bg-surfaceAlt flex items-center justify-center border border-border mb-4">
                            {stat.icon}
                        </div>
                        <p className="text-xs text-foreground/40 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
                    <input
                        type="text"
                        placeholder="Projelerde ara..."
                        className="w-full h-11 bg-surfaceAlt/50 border border-border/50 rounded-xl pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none h-11 px-4 rounded-xl bg-surfaceAlt border border-border/50 flex items-center justify-center gap-2 text-sm font-medium hover:bg-surfaceAlt/80 transition-all">
                        <Filter size={18} /> Filtrele
                    </button>
                    <button className="flex-1 sm:flex-none h-11 px-4 rounded-xl bg-surfaceAlt border border-border/50 flex items-center justify-center gap-2 text-sm font-medium hover:bg-surfaceAlt/80 transition-all">
                        Format: Hepsi
                    </button>
                </div>
            </div>

            {/* Projects Table/List */}
            <div className="glass-panel rounded-2xl border-border/30 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surfaceAlt/50 border-b border-border/50">
                                <th className="px-6 py-4 text-xs font-bold text-foreground/40 uppercase tracking-widest">Model Adı</th>
                                <th className="px-6 py-4 text-xs font-bold text-foreground/40 uppercase tracking-widest">Format</th>
                                <th className="px-6 py-4 text-xs font-bold text-foreground/40 uppercase tracking-widest">Boyut</th>
                                <th className="px-6 py-4 text-xs font-bold text-foreground/40 uppercase tracking-widest text-center">İzlenme</th>
                                <th className="px-6 py-4 text-xs font-bold text-foreground/40 uppercase tracking-widest">Tarih</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {myProjects.map((project, i) => (
                                <motion.tr
                                    key={project.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 + (i * 0.05) }}
                                    className="hover:bg-white/5 transition-colors group"
                                >
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center border font-mono text-[10px] font-bold ${project.format === 'STL' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-accent/10 border-accent/20 text-accent'}`}>
                                                .{project.format}
                                            </div>
                                            <span className="text-sm font-semibold group-hover:text-primary transition-colors cursor-pointer">{project.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold text-foreground/60 border border-border/50">{project.format}</span>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-foreground/60 font-mono italic">{project.size}</td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-sm font-bold">{project.views}</span>
                                            <span className="text-[10px] text-foreground/30 font-bold uppercase tracking-tighter">Görüntüleme</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-foreground/60">
                                            <Clock size={14} />
                                            <span className="text-xs">{project.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-foreground/40 hover:text-primary transition-colors">
                                                <Share2 size={18} />
                                            </button>
                                            <button className="p-2 text-foreground/40 hover:text-foreground transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
