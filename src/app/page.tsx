'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Layers, Lock, Share2, UploadCloud, Zap, ArrowRight, Star, CheckCircle2, Globe, Cpu, ShieldCheck } from 'lucide-react';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/ui/HeroScene').then(m => m.HeroScene), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    color: 'from-yellow-500/20 to-orange-500/10',
    iconColor: 'text-yellow-400',
    title: "Sıfır Kurulum",
    desc: "Masaüstü CAD yazılımına gerek yok. Tarayıcınızda anında açın ve görüntüleyin.",
  },
  {
    icon: <Share2 className="w-5 h-5" />,
    color: 'from-primary/20 to-primaryGlow/10',
    iconColor: 'text-primaryGlow',
    title: "Anlık Paylaşım",
    desc: "Tek bağlantı ile ekibinizle veya müşterilerinizle paylaşın. Hesap şartı yok.",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    color: 'from-teal/20 to-teal/5',
    iconColor: 'text-teal',
    title: "Gizlilik Önce",
    desc: "Modelleriniz sunucuya gönderilmez. Her şey yerel olarak çalışır.",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    color: 'from-purple-500/20 to-purple-500/5',
    iconColor: 'text-purple-400',
    title: "Parça Hiyerarşisi",
    desc: "Montaj dosyalarındaki alt bileşenleri görüntüleyin, filtreleyin ve yönetin.",
  },
  {
    icon: <Eye className="w-5 h-5" />,
    color: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-400',
    title: "Kesit & Patlatma",
    desc: "İç yapıyı göreve hazır kesit düzlemleri ve patlatma görünümleriyle inceleyin.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    color: 'from-accent/20 to-accent/5',
    iconColor: 'text-accentGlow',
    title: "Açık Kaynak",
    desc: "Tamamen açık kaynat. Kendi sunucunuzda barındırın, katkıda bulunun.",
  },
];

const stats = [
  { value: "3", label: "Desteklenen Format", suffix: "+" },
  { value: "0", label: "Sunucu Yüklemesi", suffix: "KB" },
  { value: "100", label: "Açık Kaynak", suffix: "%" },
  { value: "∞", label: "Ücretsiz Kullanım", suffix: "" },
];

const steps = [
  { num: "01", title: "Dosyayı Yükle", desc: "STL veya OBJ dosyanızı sürükleyin ya da seçin." },
  { num: "02", title: "3D'de İncele", desc: "360° döndürün, yakınlaştırın, parçaları gizleyin." },
  { num: "03", title: "Ekiple Paylaş", desc: "Bağlantıyı kopyalayıp ekibinizle anında paylaşın." },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-primaryDark/10 rounded-full blur-[100px]" />
        </div>

        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primaryGlow text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryGlow opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primaryGlow" />
            </span>
            Açık Kaynak &amp; Ücretsiz — v1.0.0
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
            <span className="text-foreground">CAD Dosyalarını</span>
            <br />
            <span className="gradient-text">Tarayıcıda İncele</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/55 max-w-2xl mx-auto leading-relaxed mb-10">
            Mühendislik ekipleri için <strong className="text-foreground/80">STL</strong>, <strong className="text-foreground/80">OBJ</strong> ve yakında{' '}
            <strong className="text-foreground/80">STEP</strong> desteğiyle — kurulum yok, sunucu yok, limit yok.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/viewer"
              className="btn-primary h-14 px-8 rounded-2xl text-white font-bold text-base flex items-center gap-2.5 group"
            >
              <UploadCloud className="w-5 h-5" />
              Görüntüleyiciyi Aç
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="https://github.com/topalemirfaruk/OpenCAD-Review"
              target="_blank"
              className="h-14 px-8 rounded-2xl glass-panel text-foreground/80 hover:text-foreground font-semibold text-base flex items-center gap-2.5 hover:border-primary/30 transition-all group"
            >
              <Star className="w-4 h-4 text-yellow-400" />
              GitHub&apos;da İncele
            </Link>
          </div>

          {/* Format badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { ext: '.STL', color: 'border-primary/40 text-primaryGlow bg-primary/10', label: 'Destekleniyor' },
              { ext: '.OBJ', color: 'border-accent/40 text-accentGlow bg-accent/10', label: 'Destekleniyor' },
              { ext: '.STEP', color: 'border-white/10 text-foreground/30 bg-white/5', label: 'Yakında' },
            ].map(f => (
              <div key={f.ext} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${f.color}`}>
                <span className="font-mono">{f.ext}</span>
                <span className="opacity-70">{f.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Real 3D Model Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 mt-16 w-full max-w-3xl mx-auto"
        >
          <div className="relative rounded-3xl glass-card border-primary/20 overflow-hidden" style={{ height: 320 }}>
            {/* Window chrome */}
            <div className="absolute top-4 left-4 z-20 flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-20 text-xs text-foreground/25 font-mono bg-surface/30 px-3 py-0.5 rounded-full backdrop-blur-sm">
              sample_bunny.stl · 69,630 üçgen
            </div>

            {/* Live 3D scene */}
            <div className="absolute inset-0">
              <HeroScene />
            </div>

            {/* Overlay info strip at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-3 flex items-center justify-between bg-gradient-to-t from-background/80 to-transparent">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                <span className="text-xs text-foreground/50 font-medium">Stanford Bunny — Örnek Model</span>
              </div>
              <Link href="/viewer" className="text-[10px] font-bold text-primaryGlow hover:text-white transition-colors uppercase tracking-widest">
                Kendi Modelini Yükle →
              </Link>
            </div>
          </div>

          {/* Glow under card */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-primary/15 blur-2xl rounded-full" />
        </motion.div>
      </section>

      {/* ── STATS ─────────────────────────────────────── */}
      <section className="relative w-full py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card rounded-2xl p-6 text-center card-hover"
              >
                <div className="text-4xl font-bold stat-number">
                  {s.value}<span className="text-2xl">{s.suffix}</span>
                </div>
                <div className="text-foreground/40 text-sm mt-2 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section className="relative w-full py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accentGlow text-xs font-bold uppercase tracking-widest mb-4">
              Nasıl Çalışır?
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              3 Adımda <span className="gradient-text">Hazır</span>
            </h2>
            <p className="text-foreground/50 max-w-xl mx-auto">
              Kayıt olmadan, kurulum yapmadan — hemen başlayın.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card rounded-3xl p-8 text-center card-hover relative"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg font-mono">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ─────────────────────────────── */}
      <section className="relative w-full py-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primaryGlow text-xs font-bold uppercase tracking-widest mb-4">
              Özellikler
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Mühendisler İçin <span className="gradient-text">Tasarlandı</span>
            </h2>
            <p className="text-foreground/50 max-w-xl mx-auto">
              Güçlü araçlar, sıfır karmaşıklık. Tarayıcınız tek ihtiyacınız.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card rounded-2xl p-7 card-hover relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className={`w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-5 ${f.iconColor}`}>
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-foreground/50 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SECTION ────────────────────────────────── */}
      <section className="relative w-full py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal/30 bg-teal/10 text-teal text-xs font-bold uppercase tracking-widest mb-5">
                Neden OpenCAD?
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Masaüstü Yazılımın<br /><span className="gradient-text">Sınırlarını Kırın</span>
              </h2>
              <p className="text-foreground/55 leading-relaxed mb-8">
                Geleneksel CAD araçları pahalı lisanslar, karmaşık kurulumlar ve platform bağımlılığı getirir. OpenCAD tüm bunları tarayıcıya taşır.
              </p>
              <div className="space-y-3">
                {[
                  "Herhangi bir cihazda, herhangi bir tarayıcıda",
                  "İnternet bağlantısı gerektirmez (yerel mod)",
                  "Ekiple gerçek zamanlı yorum ve inceleme",
                  "Dosyalarınız asla sunucuya gönderilmez",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal flex-shrink-0" />
                    <span className="text-foreground/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative grid grid-cols-2 gap-4">
              {[
                { icon: <ShieldCheck className="w-6 h-6" />, label: "Gizlilik Korumalı", color: "text-teal", bg: "bg-teal/10 border-teal/20" },
                { icon: <Zap className="w-6 h-6" />, label: "Anında Yükleme", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
                { icon: <Cpu className="w-6 h-6" />, label: "GPU Hızlandırmalı", color: "text-primaryGlow", bg: "bg-primary/10 border-primary/20" },
                { icon: <Globe className="w-6 h-6" />, label: "Açık Kaynak", color: "text-accentGlow", bg: "bg-accent/10 border-accent/20" },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} border rounded-2xl p-5 flex flex-col gap-3`}>
                  <div className={item.color}>{item.icon}</div>
                  <span className="text-sm font-semibold text-foreground/80">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="relative w-full py-24 px-4 mb-12">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 rounded-3xl blur-2xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden border-primary/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8" />
            <div className="relative">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-5 text-glow">
                Hemen Başla — <span className="gradient-text">Ücretsiz</span>
              </h2>
              <p className="text-lg text-foreground/55 max-w-xl mx-auto mb-10">
                Kayıt gerektirmez. Dosyanı sürükle, 3D&apos;de incele, ekiple paylaş.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/viewer"
                  className="btn-primary h-14 px-10 rounded-2xl text-white font-bold text-base flex items-center gap-2.5 group"
                >
                  <UploadCloud className="w-5 h-5" />
                  Görüntüleyiciyi Aç
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
