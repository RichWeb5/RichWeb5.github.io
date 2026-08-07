import type { Metadata } from "next";
import "../styles/globals.css";
import { siteConfig } from "@/config/site";
import { Press_Start_2P } from 'next/font/google';
import { LanguageProvider } from "@/i18n/LanguageProvider";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

const pressStart2P = Press_Start_2P({
  subsets: ['latin'], // This font only supports latin
  weight: '400', // This is the only available weight
  display: 'swap',
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={pressStart2P.className}>
      <body
        className="minecraft-world bg-green-200 font-pixel min-h-screen text-gray-800"
      >
        <LanguageProvider>
          <main>
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
