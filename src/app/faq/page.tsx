import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { FAQ } from '@/components/ui/FAQ';

export const metadata = {
    title: 'Sıkça Sorulan Sorular - OpenCAD Review',
    description: 'OpenCAD Review hakkında merak ettiğiniz tüm soruların cevapları.',
};

export default function FAQPage() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar />
            <div className="w-full pt-16">
                <FAQ />
            </div>
            <Footer />
        </main>
    );
}
