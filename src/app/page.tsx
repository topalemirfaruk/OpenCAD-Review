import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { HeroScene } from '@/components/ui/HeroScene';
import Link from 'next/link';
import { Eye, Layers, Lock, Share2, UploadCloud, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 px-4">
        <HeroScene />

        <div className="max-w-4xl mx-auto text-center z-10 space-y-8 mt-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-primary/30 text-primary text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Açık Kaynak Kodlu & v1.0.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-glow">
            CAD Dosyalarınızı <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primaryGlow">Tarayıcıda İnceleyin</span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Mühendislik ekipleri için <strong className="text-foreground">STL, OBJ</strong> (ve yakında STEP) formatlarında güvenli 3D işbirliği, paylaşım ve inceleme aracı.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/viewer" className="h-14 px-8 rounded-xl bg-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(14,165,233,0.4)]">
              <UploadCloud className="w-5 h-5" />
              <span>Görüntüleyiciyi Aç</span>
            </Link>
            <Link href="https://github.com/emirft/opencad-review" target="_blank" className="h-14 px-8 rounded-xl glass-panel text-foreground font-semibold text-lg flex items-center gap-2 hover:bg-surfaceAlt transition-all group">
              <span>GitHub&apos;da İncele</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 pt-12 text-sm text-foreground/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded glass-panel flex items-center justify-center text-primary font-mono text-xs font-bold border-primary/20">.STL</div>
              <span>Destekleniyor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded glass-panel flex items-center justify-center text-accent font-mono text-xs font-bold border-accent/20">.OBJ</div>
              <span>Destekleniyor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded glass-panel flex items-center justify-center text-foreground/40 font-mono text-xs font-bold border-foreground/10">.STP</div>
              <span>Yakında</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-32 z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mühendisler İçin Tasarlandı</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Hiçbir kurulum gerektirmeden, doğrudan tarayıcınız üzerinden çalışabilen güçlü araçlar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Zap className="w-6 h-6 text-yellow-500" />, title: "Sıfır Kurulum", desc: "Masaüstü CAD yazılımına ihtiyaç duymadan cihaz bağımsız görüntüleme." },
            { icon: <Share2 className="w-6 h-6 text-primary" />, title: "Paylaşılabilir Linkler", desc: "Tasarımınızı tek tıkla iş arkadaşlarınızla veya müşterilerle paylaşın." },
            { icon: <Lock className="w-6 h-6 text-accent" />, title: "Local Privacy-First", desc: "Gizli modelleriniz sunucuya yüklenmeden sadece cihazınızda işlenir." },
            { icon: <Layers className="w-6 h-6 text-purple-500" />, title: "Parça Hiyerarşisi", desc: "Montaj dosyalarındaki alt parçaları inceleyin ve gizleyin." },
            { icon: <Eye className="w-6 h-6 text-blue-400" />, title: "Kesit ve Patlatma", desc: "Modellerin iç yapısını görmek için interaktif araçları kullanın." },
            { icon: <div className="w-6 h-6 text-orange-500 font-bold flex items-center justify-center">OSS</div>, title: "Açık Kaynak & Ücretsiz", desc: "Kendi sunucunuzda (self-host) barındırma özgürlüğüne sahip olun." },
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-8 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform border-border/40 hover:border-primary/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors"></div>
              <div className="w-12 h-12 rounded-xl bg-surfaceAlt flex items-center justify-center border border-border">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-24 z-10 mb-12">
        <div className="glass-panel rounded-3xl p-12 text-center relative overflow-hidden border-primary/30">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-glow">Hemen İncelemeye Başlayın</h2>
          <p className="text-lg text-foreground/80 mb-10 max-w-xl mx-auto">
            3D tasarım dosyalarınızı tarayıcıya sürükleyin ve ekibinizle anında geri bildirim döngüsüne girin.
          </p>
          <Link href="/viewer" className="inline-flex h-14 px-10 rounded-xl bg-primary text-primary-foreground font-semibold text-lg items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(14,165,233,0.5)]">
            <UploadCloud className="w-5 h-5" />
            <span>Modele Git</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
