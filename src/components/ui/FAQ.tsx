'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "Hangi dosya formatlarını destekliyor?",
        answer: "Şu anda STL ve OBJ formatlarını tam performanslı olarak destekliyoruz. STEP, IGES ve CAD-native formatlar üzerinde çalışmalarımız devam ediyor."
    },
    {
        question: "Verilerim ve modellerim güvende mi?",
        answer: "Evet, OpenCAD Review 'Privacy-First' yaklaşımıyla çalışır. Modelleriniz sunucuya yüklenmez, doğrudan tarayıcınızda işlenir. Hiç kimse modellerinize erişemez."
    },
    {
        question: "OpenCAD Review ücretsiz mi?",
        answer: "Evet, OpenCAD Review tamamen açık kaynak kodlu ve ücretsizdir. Topluluk tarafından geliştirilmekte ve desteklenmektedir."
    },
    {
        question: "Modellerim üzerinde nasıl ölçüm yaparım?",
        answer: "Viewer ekranındaki araç çubuğunu kullanarak mesafe, açı ve kesit alanı gibi ölçümleri mockup araçlarımızla simüle edebilir, kesit görünümü özelliğini kullanabilirsiniz."
    },
    {
        question: "Büyük boyutlu modellerde performans nasıl?",
        answer: "Three.js tabanlı render motorumuz ve GPU hızlandırma sayesinde, milyonlarca poligona sahip modelleri bile modern tarayıcılarda akıcı bir şekilde inceleyebilirsiniz."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 relative overflow-hidden bg-surface">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4"
                    >
                        <HelpCircle className="w-4 h-4" />
                        Destek Merkezi
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Sıkça Sorulan Sorular
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-foreground/60 max-w-2xl mx-auto"
                    >
                        OpenCAD Review hakkında en çok merak edilen soruları ve cevaplarını burada bulabilirsiniz.
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`glass-panel overflow-hidden border transition-all duration-300 ${openIndex === index ? 'border-primary/50 ring-1 ring-primary/20 shadow-[0_0_20px_rgba(14,165,233,0.1)]' : 'border-border/30 hover:border-border/60'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 group"
                            >
                                <span className={`font-semibold transition-colors ${openIndex === index ? 'text-primary' : 'text-foreground/90 group-hover:text-foreground'}`}>
                                    {faq.question}
                                </span>
                                <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : 'text-foreground/40'}`} />
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-6 pb-6 text-foreground/60 leading-relaxed text-sm border-t border-border/10 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
