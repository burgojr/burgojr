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
    isScrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-transparent py-6'
  }`}
>
  <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-between">
    
    {/* Logo - Boyutlar %20-30 oranında büyütüldü */}
    <Link href="/" onClick={scrollToTop} className="flex items-center">
      <img 
        src="/images/logo/BURGO.svg" 
        alt="Burgo Logo" 
        className={`transition-all duration-500 ${
          isScrolled ? 'h-14 md:h-24' : 'h-20 md:h-36' 
        } w-auto object-contain`}
      />
    </Link>

    {/* Navigasyon - Yazılar ve aralıklar büyütüldü */}
    <nav className="flex flex-row items-center justify-center gap-5 sm:gap-8 md:gap-14 px-2">
      {[
        { name: 'NEDEN BURGO Jr.', id: 'neden-burgo' },
        { name: 'FRANCHISE', id: 'bize-katilin' },
        { name: 'BAŞVURU FORMU', id: 'basvuru-formu' }
      ].map((item) => (
        <a 
          key={item.id} 
          href={`#${item.id}`}
          onClick={(e) => scrollToSection(e, item.id)}
          className="text-white/90 hover:text-[#d4a017] 
                     text-[12px] sm:text-sm md:text-base 
                     font-black tracking-tight sm:tracking-widest 
                     transition-all duration-300 cursor-pointer 
                     whitespace-nowrap border-b-2 border-transparent 
                     hover:border-[#d4a017] pb-1 uppercase"
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