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
  
  // Header'ı bul (veya sınıf ismine göre seç)
  const header = document.querySelector('header');
  
  if (element) {
    // Header varsa yüksekliğini al, yoksa varsayılan bir değer (örn: 80) kullan
    const headerOffset = header ? header.offsetHeight : 80;
    
    // Ekstra bir boşluk daha bırakmak istersen buraya ekle (örn: + 20)
    const offset = headerOffset + 20; 

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
    isScrolled ? 'bg-black/55 backdrop-blur-md py-3' : 'bg-transparent py-6'
  }`}
>
  <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
    
    <Link href="/" onClick={scrollToTop} className="flex items-center">
      <img 
        src="/images/logo/BURGO.svg" 
        alt="Burgo Logo" 
        className={`transition-all duration-500 ${
          isScrolled ? 'h-14 md:h-24' : 'h-20 md:h-28' 
        } w-auto object-contain`}
      />
    </Link>

    {/* Navigasyon - Yazılar ve aralıklar büyütüldü */}
    <nav className="flex flex-row items-center justify-center gap-5 sm:gap-8 md:gap-14 px-2">
{[
  { name: 'NEDEN BURGO', id: 'neden-burgo' },
  { name: 'FRANCHISE', id: 'bize-katilin' },
  { name: 'SOSYAL MEDYA', id: 'sosyal-medya' },
  { name: 'BAŞVURU', id: 'basvuru-formu' }
].map((item) => (
  <a 
    key={item.id} 
    href={`#${item.id}`}
    onClick={(e) => scrollToSection(e, item.id)}
    className="text-[10px] md:text-sm font-black text-white hover:text-[#d4a017] uppercase tracking-wider transition-all duration-300 border-b-2 border-transparent hover:border-[#d4a017] pb-1 cursor-pointer"
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