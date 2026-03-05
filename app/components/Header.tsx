"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        
        {/* Logo - Yol düzeltildi */}
        <Link href="/" onClick={scrollToTop} className="flex items-center">
          <img 
            src="/images/logo/BURGO.svg" 
            alt="Burgo Logo" 
            className={`transition-all duration-500 ${
              isScrolled ? 'h-15 md:h-20' : 'h-20 md:h-30'
            } w-auto object-contain`}
          />
        </Link>

        {/* Navigasyon */}
        <nav className="flex flex-row items-center justify-center gap-4 md:gap-12 flex-wrap">
          {[
            { name: 'NEDEN BURGO Jr.', id: 'neden-burgo' },
            { name: 'FRANCHISE', id: 'bize-katilin' },
            { name: 'BAŞVURU FORMU', id: 'basvuru-formu' }
          ].map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className="text-white/80 hover:text-[#d4a017] text-[10px] md:text-xs font-bold tracking-tighter md:tracking-widest transition-colors cursor-pointer whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Denge alanı */}
        <div className="hidden md:flex w-[120px]"></div>
      </div>
    </header>
  );
};

export default Header;