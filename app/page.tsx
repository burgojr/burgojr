"use client";

import HeroSection from './components/HeroSection';
import WhyBurgoSection from './components/WhyBurgoSection';
import JoinUsSection from './components/JoinUsSection'; // Yeni eklediğimiz bölüm
import FranchiseForm from './components/FranchiseForm';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';

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

      {/* 4. Bölüm: Aksiyon Alanı (Başvuru Formu) */}
      <FranchiseForm />

      {/* 5. Bölüm: Kurumsal Kapanış (Footer) */}
      <Footer />

      {/* Sayfa her zaman etkileşimde kalsın diye sağ altta duran buton */}
      <ScrollToTop />
      
    </main>
  );
}