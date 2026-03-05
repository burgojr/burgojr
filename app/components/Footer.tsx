import React from 'react';
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaRegCompass, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white pt-10 pb-10 border-t border-brand-yellow/20 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Üst Kısım: 3 Sütunlu Bilgi Alanı */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-brand-yellow/30 rounded-sm">
          
          {/* 1. Sütun: Açılış Saatleri */}
          <div className="flex items-center p-8 border-b md:border-b-0 md:border-r border-brand-yellow/30">
            <div className="text-brand-yellow text-3xl mr-6">
              <FaPhoneAlt />
            </div>
            <div>
              <h4 className="text-lg font-bold mb-1 tracking-tight">Açılış Saatleri</h4>
              <p className="text-gray-400 font-mono text-sm tracking-widest">08.30 – 01.00</p>
            </div>
          </div>

          {/* 2. Sütun: Adres Bilgisi */}
          <div className="flex items-center p-8 border-b md:border-b-0 md:border-r border-brand-yellow/30">
            <div className="text-brand-yellow text-3xl mr-6">
              <FaRegCompass />
            </div>
            <div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Bla bla Mah, bla bla sokak, Parkora AVM<br />
                <span className="font-bold text-white tracking-wide">Nilüfer / BURSA</span>
              </p>
            </div>
          </div>

          {/* 3. Sütun: Sosyal Medya */}
          <div className="flex items-center justify-center p-8 space-x-10">
            <a 
              href="https://www.facebook.com/p/BURGO-JR-61556004706178/" 
              target='blank'
              className="text-gray-400 hover:text-brand-yellow transition-all duration-300 transform hover:scale-110 text-2xl"
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://www.instagram.com/burgo_jr/?hl=en" 
              target='blank'
              className="text-gray-400 hover:text-brand-yellow transition-all duration-300 transform hover:scale-110 text-2xl"
            >
              <FaInstagram />
            </a>
            {/*
            <a 
              href="#" 
              target='blank'
              className="text-gray-400 hover:text-brand-yellow transition-all duration-300 transform hover:scale-110 text-2xl"
            >
              <FaTiktok />
            </a>
            */}
          </div>
        </div>

        {/* Alt Kısım: Telif Hakkı */}
        <div className="mt-12 text-center">
          <p className="text-[10px] md:text-xs tracking-[0.4em] font-black uppercase text-gray-500">
            © 2026 <span className="text-brand-yellow">BURGO Jr.</span> - TÜM HAKLARI SAKLIDIR
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;