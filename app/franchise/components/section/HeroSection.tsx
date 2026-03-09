"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('neden-burgo');
    if (nextSection) {
      const offset = 140;
      const elementPosition = nextSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-black text-white font-sans">
<section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
  {/* Arka Plan */}
  <div className="absolute inset-0">
    <img 
      src="/images/hero/hamburger5.jpeg" 
      alt="Burgo Jr. Franchise" 
      className="w-full h-full object-cover scale-110 md:scale-100 opacity-60" 
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black"></div>
  </div>

  {/* İçerik */}
  <div className="relative z-10 text-center px-6 w-full">
    <p className="text-brand-yellow italic text-2xl md:text-4xl mb-1 md:mb-2 tracking-wide drop-shadow-lg">
      Şubemiz Olun
    </p>

    {/* Başlık mobilde 5xl, tablette 7xl, masaüstünde 9xl olacak şekilde ayarlandı */}
    <h1 className="text-white text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-tight md:leading-none drop-shadow-2xl">
      FRANCHISE
    </h1>

    <div className="mt-4 md:mt-6 flex justify-center">
      <div className="h-1 w-16 md:h-1.5 md:w-24 bg-brand-yellow rounded-full"></div>
    </div>
  </div>

  {/* Oklar - Mobilde daha yukarıda dursun */}
  <div 
    onClick={scrollToNext}
    className="absolute bottom-12 md:bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center group"
  >
    <ChevronDown size={28} className="text-brand-yellow animate-bounce" />
    <ChevronDown size={28} className="text-brand-yellow animate-bounce -mt-4" style={{ animationDelay: '0.15s' }} />
  </div>
</section>
    </div>
  );
};

export default HeroSection;