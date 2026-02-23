'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Box, Github, UploadCloud } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Navbar() {
    const pathname = usePathname();

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50"
        >
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
                        <Box className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-glow">OpenCAD</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
                        Ana Sayfa
                    </Link>
                    <Link href="/viewer" className={`text-sm font-medium transition-colors ${pathname === '/viewer' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
                        Çalışma Alanı
                    </Link>
                    <Link href="/faq" className={`text-sm font-medium transition-colors ${pathname === '/faq' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
                        SSS
                    </Link>
                    <Link href="https://github.com/topalemirfaruk/OpenCAD-Review?tab=readme-ov-file" target="_blank" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                        Dokümantasyon
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="https://github.com/topalemirfaruk/OpenCAD-Review?tab=readme-ov-file" target="_blank" className="text-foreground/70 hover:text-foreground transition-colors p-2 hover:bg-white/5 rounded-full">
                        <Github className="w-5 h-5" />
                    </Link>
                    <Link href="/viewer" className="hidden sm:flex h-9 items-center justify-center px-4 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors gap-2 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                        <UploadCloud className="w-4 h-4" />
                        <span>Model Yükle</span>
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}
