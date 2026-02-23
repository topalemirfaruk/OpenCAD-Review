import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenCAD Review",
  description: "Tarayıcıda CAD Görüntüleyici & İnceleme & Paylaşım. STEP/STP, STL, OBJ desteği. Güvenli işbirliği.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-background text-foreground antialiased min-h-screen bg-grid`}>
        {/* Navbar only shown on landing pages, handled per-page or globally via checks. We'll add it globally and hide in viewer if needed. */}
        {children}
      </body>
    </html>
  );
}
