import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import ScrollToTop from "./franchise/components/ScrollToTop";
import { Providers } from "./provider";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins', 
});

export const metadata: Metadata = {
  title: "Burgo Jr. | Franchise Başvuru",
  description: "Burgo Jr. ailesine katılmak için franchise başvuru formunu doldurun ve lezzetli bir yatırıma adım atın.",
  keywords: ["Burgo Jr.", "Franchise", "Hamburger Bayilik", "Yatırım", "Gıda Bayiliği"],
  authors: [{ name: "Burgo Jr." }],
  openGraph: {
    title: "Burgo Jr. | Franchise Başvuru",
    description: "Burgo Jr. ailesine katılmak için franchise başvuru formunu doldurun ve lezzetli bir yatırıma adım atın.",
    url: "https://burgojr.vercel.app",
    siteName: "Burgo Jr.",
images: [
  {
    url: "/images/logo/og-image.jpg", // public/images/logo/og-image.jpg şeklinde olmalı
    width: 1200,
    height: 630,
    alt: "Burgo Jr. Franchise",
  },
],
    locale: "tr_TR",
    type: "website",
  },
icons: {
    // '/favicon.ico' yerine kendi logonun yolunu yazıyoruz
    icon: "/images/logo/BURGO.svg", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* İstersen buraya Google Analytics kodunu ekleyebilirsin */}
      </head>
      <body className={`${poppins.variable} font-sans`} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
        <ScrollToTop />
      </body>
    </html>
  );
}