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
// Header.tsx içindeki ilgili kısımları şu şekilde güncelle:

<header 
  className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
    isScrolled ? 'bg-black/95 backdrop-blur-md py-2' : 'bg-transparent py-4'
  }`}
>
  <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-between">
    
    {/* Logo - Mobilde daha kompakt boyutlar */}
    <Link href="/" onClick={scrollToTop} className="flex items-center">
      <img 
        src="/images/logo/BURGO.svg" 
        alt="Burgo Logo" 
        className={`transition-all duration-500 ${
          isScrolled ? 'h-10 md:h-20' : 'h-14 md:h-30' // Mobilde 10 ve 14h yaptık
        } w-auto object-contain mb-2 md:mb-0`}
      />
    </Link>

    {/* Navigasyon - Mobilde daha okunaklı aralıklar */}
    <nav className="flex flex-row items-center justify-center gap-3 md:gap-12 px-2">
      {[
        { name: 'NEDEN BURGO Jr.', id: 'neden-burgo' },
        { name: 'FRANCHISE', id: 'bize-katilin' },
        { name: 'BAŞVURU FORMU', id: 'basvuru-formu' }
      ].map((item) => (
        <a 
          key={item.id} 
          href={`#${item.id}`}
          onClick={(e) => scrollToSection(e, item.id)}
          className="text-white/90 hover:text-[#d4a017] text-[9px] sm:text-[10px] md:text-xs font-black tracking-tighter sm:tracking-widest transition-colors cursor-pointer whitespace-nowrap border-b border-transparent hover:border-[#d4a017] pb-1"
        >
          {item.name}
        </a>
      ))}
    </nav>
  </div>
</header>
  );
};

export default Header;