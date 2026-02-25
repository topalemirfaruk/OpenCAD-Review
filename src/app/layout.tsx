import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenCAD Review",
  description: "Tarayıcıda CAD Görüntüleyici & İnceleme & Paylaşım. STEP/STP, STL, OBJ desteği. Güvenli işbirliği.",
};

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { Providers } from "@/components/ui/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-background text-foreground antialiased min-h-screen bg-grid relative`}>
        <Providers>
          {/* Global Background Glows */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />
          </div>

          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
