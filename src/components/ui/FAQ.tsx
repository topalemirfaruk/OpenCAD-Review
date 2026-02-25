'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

const faqs = [
    {
        category: "Teknik",
        question: "Hangi dosya formatlarını destekliyor?",
        answer: "Şu anda STL ve OBJ formatlarını tam performanslı olarak destekliyoruz. STEP, IGES ve natif CAD formatları üzerinde çalışmalarımız devam ediyor."
    },
    {
        category: "Güvenlik",
        question: "Verilerim ve modellerim güvende mi?",
        answer: "Evet, yüklediğiniz tüm modeller Supabase altyapısıyla şifrelenerek bulutta saklanır. Sadece siz ve bağlantıyı ('Link') paylaştığınız kişiler modellerinize erişim sağlayabilir."
    },
    {
        category: "Ücretlendirme",
        question: "OpenCAD Review ücretsiz mi?",
        answer: "Evet, OpenCAD Review tamamen açık kaynak kodlu ve ücretsizdir. Topluluk tarafından geliştirilmekte ve desteklenmektedir. Her zaman ücretsiz kalacak."
    },
    {
        category: "Özellikler",
        question: "Modellerim üzerinde nasıl ölçüm yaparım?",
        answer: "Viewer ekranındaki araç çubuğunu kullanarak mesafe, açı ve kesit alanı gibi ölçümleri yapabilir, kesit görünümü özelliğiyle iç yapıyı inceleyebilirsiniz."
    },
    {
        category: "Performans",
        question: "Büyük boyutlu modellerde performans nasıl?",
        answer: "Three.js tabanlı render motorumuz ve GPU hızlandırma sayesinde, milyonlarca poligona sahip modelleri bile modern tarayıcılarda akıcı bir şekilde görüntüleyebilirsiniz."
    },
    {
        category: "Paylaşım",
        question: "Model paylaşımı nasıl çalışıyor?",
        answer: "Yüklediğiniz modeller arka planda buluta aktarılır ve kısa bir test bağlantısı (UUID) üretilir. 'Paylaş' butonuyla bu bağlantıyı kopyalayıp gönderdiğiniz herkes (hesap açmadan bile) modeli doğrudan tarayıcısında görüntüleyebilir."
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 relative overflow-hidden min-h-screen">
            {/* Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-3xl mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primaryGlow text-xs font-bold uppercase tracking-widest mb-5"
                    >
                        <HelpCircle className="w-3.5 h-3.5" />
                        Destek Merkezi
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Sıkça Sorulan{' '}
                        <span className="gradient-text">Sorular</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-foreground/50 max-w-xl mx-auto"
                    >
                        OpenCAD Review hakkında en çok merak edilen soruların cevaplarını burada bulabilirsiniz.
                    </motion.p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.07 }}
                            className={`glass-card rounded-2xl overflow-hidden border transition-all duration-300 ${openIndex === index
                                ? 'border-primary/40 shadow-[0_0_24px_rgba(99,102,241,0.12)]'
                                : 'border-borderLight/50 hover:border-borderLight'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${openIndex === index
                                        ? 'bg-primary/20 text-primaryGlow'
                                        : 'bg-surfaceMid text-foreground/30'
                                        }`}>
                                        {faq.category}
                                    </span>
                                    <span className={`font-semibold text-sm transition-colors ${openIndex === index ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'
                                        }`}>
                                        {faq.question}
                                    </span>
                                </div>
                                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primaryGlow' : 'text-foreground/30'
                                    }`} />
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                    >
                                        <div className="px-6 pb-6 text-foreground/55 text-sm leading-relaxed border-t border-borderLight/30 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 glass-card rounded-2xl p-8 text-center border-borderLight/50"
                >
                    <MessageCircle className="w-8 h-8 text-primaryGlow mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-2">Aradığınızı Bulamadınız?</h3>
                    <p className="text-foreground/50 text-sm mb-5">
                        GitHub Issues üzerinden bize ulaşabilir veya toplulukla yorum yapabilirsiniz.
                    </p>
                    <a
                        href="https://github.com/topalemirfaruk/OpenCAD-Review/issues"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
                    >
                        Issue Aç
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
