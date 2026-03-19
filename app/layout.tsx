import type { Metadata, Viewport } from "next";
import { BootScreenWrapper } from "@/components/layout/BootScreenWrapper";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Bitácora Félix",
  description: "Personal journal to track your daily itinerary",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bitácora Félix",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0a0e11" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-950 text-vault-500 pb-20 md:pb-0 relative overflow-x-hidden" style={{ fontFamily: "'VT323', monospace" }}>
        <BootScreenWrapper>
          <div className="min-h-screen relative">
            <div className="relative z-10">
              {children}
            </div>
            {/* Background scanlines */}
            <div
              className="fixed inset-0 pointer-events-none opacity-[0.02]"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, #d4a302 1px, #d4a302 2px)"
              }}
            />
          </div>
        </BootScreenWrapper>
      </body>
    </html>
  );
}
