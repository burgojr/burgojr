"use client";

import React from 'react';
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaRegCompass } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white pt-16 pb-10 border-t border-brand-yellow/20 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* 3 Sütunlu Yapı */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-brand-yellow/30 rounded-sm divide-y md:divide-y-0 md:divide-x divide-brand-yellow/30">
          
          {/* 1. Sütun: İletişim Bilgisi */}
<div className="flex items-center p-6 md:p-8">
  <div className="text-brand-yellow text-2xl md:text-3xl mr-6">
    <FaPhoneAlt />
  </div>
  <div>
    <h4 className="text-sm md:text-lg font-bold mb-1 tracking-tight">İletişim</h4>
    {/* href="tel:..." kısmı arama ekranını tetikler */}
    <a 
      href="tel:+905300710745" 
      className="text-gray-400 hover:text-white font-mono text-xs md:text-sm tracking-widest transition-colors"
    >
      0530 071 07 45
    </a>
  </div>
</div>

          {/* 2. Sütun: Adres ve Harita Bilgisi */}
          <div className="flex flex-col p-6 md:p-8 space-y-4">
            <div className="flex items-start">
              <div className="text-brand-yellow text-2xl md:text-3xl mr-6 mt-1">
                <FaRegCompass />
              </div>
              <div>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Odunluk Mah. Akpınar Cd. J blok 12J/11<br />
                  Parkora AVM <span className="font-bold text-white tracking-wide">Nilüfer / BURSA</span>
                </p>
              </div>
            </div>
            
            {/* Harita Embed - Title eklendi */}
            <div className="w-full h-32 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border border-white/5">
              <iframe 
                src="https://www.google.com/maps/embed?..." // Buraya gerçek embed kodunuzu yapıştırın
                title="Burgo Jr. Konum Haritası"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"> 
              </iframe>
            </div>
          </div>

          {/* 3. Sütun: Sosyal Medya - Aria-label'lar eklendi */}
          <div className="flex items-center justify-center p-8 space-x-10">
            <a 
              href="https://www.facebook.com/p/BURGO-JR-61556004706178/" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Sayfamız"
              className="text-gray-400 hover:text-brand-yellow transition-all duration-300 transform hover:scale-110 text-2xl"
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://www.instagram.com/burgo_jr/?hl=en" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Sayfamız"
              className="text-gray-400 hover:text-brand-yellow transition-all duration-300 transform hover:scale-110 text-2xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Telif Hakkı */}
<div className="mt-12 text-center">
  <p className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.4em] font-black uppercase text-gray-500">
    © Copyright {new Date().getFullYear()} <span className="text-brand-yellow">BURGO Jr.</span> - TÜM HAKLARI SAKLIDIR
  </p>
</div>
      </div>
    </footer>
  );
};

export default Footer;