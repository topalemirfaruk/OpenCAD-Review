import Link from 'next/link';
import { Github, Box, Heart } from 'lucide-react';

const links = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Çalışma Alanı', href: '/viewer' },
    { label: 'SSS', href: '/faq' },
    { label: 'Dokümantasyon', href: 'https://github.com/topalemirfaruk/OpenCAD-Review?tab=readme-ov-file' },
];

export function Footer() {
    return (
        <footer className="w-full border-t border-border/50 bg-surface/60 backdrop-blur-md mt-12">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Brand */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                            <Box className="w-4 h-4 text-primaryGlow" />
                        </div>
                        <span className="font-bold text-lg text-foreground/90">OpenCAD</span>
                    </div>

                    {/* Links */}
                    <nav className="flex items-center gap-6 flex-wrap justify-center">
                        {links.map(link => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm text-foreground/45 hover:text-foreground/80 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="https://github.com/topalemirfaruk/OpenCAD-Review"
                            target="_blank"
                            className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-foreground/50 hover:text-primaryGlow hover:border-primary/40 transition-all"
                        >
                            <Github className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-2">
                    <p className="text-foreground/30 text-xs">
                        © {new Date().getFullYear()} OpenCAD Review. Açık kaynak ve ücretsiz.
                    </p>
                    <p className="text-foreground/30 text-xs flex items-center gap-1">
                        Yapıldı <Heart className="w-3 h-3 text-primary/60" /> ile{' '}
                        <Link
                            href="https://www.linkedin.com/services/page/5ae4f66d8b2dad4a0a/"
                            target="_blank"
                            className="text-primary/60 hover:text-primaryGlow transition-colors"
                        >
                            Emir Faruk Topal
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
