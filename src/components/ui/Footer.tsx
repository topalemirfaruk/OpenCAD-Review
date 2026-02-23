

export function Footer() {
    return (
        <footer className="w-full py-8 border-t border-border/50 backdrop-blur-md bg-surface/50 mt-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-foreground/60 text-sm">
                    &copy; {new Date().getFullYear()} OpenCAD Review. Açık kaynak kodlu ve ücretsizdir.
                </div>
                <div className="flex items-center gap-6 text-sm text-foreground/60">
                    <a href="#" className="hover:text-primary transition-colors">Kullanım Şartları</a>
                    <a href="#" className="hover:text-primary transition-colors">Gizlilik</a>
                    <a href="https://github.com/emirft/opencad-review" className="hover:text-primary transition-colors" target="_blank" rel="noreferrer">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
