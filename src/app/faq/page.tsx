import { FAQ } from '@/components/ui/FAQ';

export const metadata = {
    title: 'Sıkça Sorulan Sorular - OpenCAD Review',
    description: 'OpenCAD Review hakkında merak ettiğiniz tüm soruların cevapları.',
};

export default function FAQPage() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="w-full pt-16">
                <FAQ />
            </div>
        </main>
    );
}
