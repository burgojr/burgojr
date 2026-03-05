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
      <section className="relative h-[110vh] md:h-[100vh] w-full flex items-center justify-center overflow-hidden">
        
        {/* Arka Plan Görseli ve Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero/hamburger5.jpeg" 
            alt="Burgo Jr. Franchise" 
            className="w-full h-full object-cover opacity-60 transition-transform duration-[2000ms] hover:scale-110" 
          />
          {/* Gradyan Geçişi (Overlay) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
        </div>

        {/* İçerik Katmanı */}
        <div className="relative z-10 text-center px-4">
          <p className="text-brand-yellow italic text-2xl md:text-3xl mb-2 tracking-wide drop-shadow-lg">
            Şubemiz Olun
          </p>

          <h1 className="text-white text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none drop-shadow-2xl">
            FRANCHISE
          </h1>

          {/* Karakteristik kısa çizgi */}
          <div className="mt-6 flex justify-center">
            <div className="h-1.5 w-24 bg-brand-yellow rounded-full shadow-[0_0_15px_rgba(253,191,31,0.5)]"></div>
          </div>
        </div>

        {/* --- İSTEDİĞİN SARI OKLAR --- */}
        <div 
          onClick={scrollToNext}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center group"
        >
          <ChevronDown 
            size={32} 
            className="text-brand-yellow animate-bounce transition-transform group-hover:scale-125" 
          />
          <ChevronDown 
            size={32} 
            className="text-brand-yellow animate-bounce -mt-5 transition-transform group-hover:scale-125" 
            style={{ animationDelay: '0.15s' }}
          />
          <span className="text-[10px] tracking-[0.3em] text-brand-yellow/60 uppercase mt-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Keşfet
          </span>
        </div>

        {/* Alt Siyah Geçiş (Fırça darbesi hissi için) */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      </section>
    </div>
  );
};

export default HeroSection;