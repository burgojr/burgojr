"use client";

import HeroSection from './franchise/components/section/HeroSection';
import WhyBurgoSection from './franchise/components/section/WhyBurgoSection';
import JoinUsSection from './franchise/components/section/JoinUsSection'; // Yeni eklediğimiz bölüm
import FranchiseForm from './franchise/components/section/FranchiseForm';
import Footer from './franchise/components/section/Footer';
import ScrollToTop from './franchise/components/ScrollToTop';
import Header from './franchise/components/section/Header';
import SocialMedia from './franchise/components/section/SocialMedia';

export default function FranchisePage() {
  return (
    <main className="min-h-screen bg-black font-sans text-white overflow-x-hidden">
      <Header />
      {/* 1. Bölüm: Karşılama ve Görsel Odak (Hero) */}
      <HeroSection />

      {/* 2. Bölüm: "Neden Burgo?" ve Marka Hikayesi */}
      <WhyBurgoSection />

      {/* 3. Bölüm: "Bize Katılın" ve Süreç Bilgilendirmesi */}
      <JoinUsSection />
      {/* 4. Bölüm: Sosyal Medya */}
      <SocialMedia />

      {/* 5. Bölüm: Aksiyon Alanı (Başvuru Formu) */}
      <FranchiseForm />

      {/* 6. Bölüm: Kurumsal Kapanış (Footer) */}
      <Footer />

      {/* Sayfa her zaman etkileşimde kalsın diye sağ altta duran buton */}
      <ScrollToTop />
      
    </main>
  );
}