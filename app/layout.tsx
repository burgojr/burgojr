import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from 'next/font/google';
import ScrollToTop from "./components/ScrollToTop";
import { Providers } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins', 
});

export const metadata: Metadata = {
  title: "Burgo Jr. | Franchise Başvuru",
  description: "Burgo Jr. ailesine katılmak için franchise başvuru formunu doldurun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${poppins.className}`} suppressHydrationWarning={true}>
        {/* v3 Provider sarmalaması */}
        <Providers>
          {children}
        </Providers>
        <ScrollToTop />
      </body>
    </html>
  );
}