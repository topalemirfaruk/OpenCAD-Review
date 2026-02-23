import Link from 'next/link';
import { Github } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full py-8 border-t border-border/50 backdrop-blur-md bg-surface/50 mt-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-foreground/60 text-sm">
                    &copy; {new Date().getFullYear()} OpenCAD Review. Açık kaynak kodlu ve ücretsizdir.
                </div>
                <div className="flex items-center gap-4">
                    <Link href="https://github.com/topalemirfaruk/OpenCAD-Review?tab=readme-ov-file" target="_blank" className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all">
                        <Github className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
