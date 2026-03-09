import { Instagram, Facebook } from 'lucide-react';
import ScrollLine from './ScrollLine';

const socialLinks = [
  { name: 'Instagram', icon: <Instagram size={32} />, url: 'https://www.instagram.com/burgo_jr/?hl=en', handle: '@burgo_jr' },
  { name: 'Facebook', icon: <Facebook size={32} />, url: 'https://www.facebook.com/p/BURGO-JR-61556004706178/', handle: 'Burgo Jr. Official' },
];

export default function SocialMedia() {
  return (
    <section className="w-full bg-black border-t border-white/5">
    {/* 1. Ara Dikey Çizgi */}
      <div className="my-10">
        <ScrollLine />
      </div>
      <div id="sosyal-medya"  className="max-w-4xl  pb-24 mx-auto px-6 text-center">
        
        {/* Başlık ve Ekip Vurgusu */}
        <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">
          Dijitalde <span className="text-brand-yellow">Güçlü Bir Ekip</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed text-sm md:text-base">
          Burgo Jr. olarak, profesyonel sosyal medya ve pazarlama ekibimizle markamızı 
          her gün milyonlara ulaştırıyoruz. Franchise partnerlerimize sunduğumuz dijital 
          destekle, yerel başarınızı ulusal bir vizyonla destekliyoruz.
        </p>

        {/* İkonlar (Sadece 2 tane) */}
        <div className="flex justify-center items-center gap-12 md:gap-24">
          {socialLinks.map((social) => (
            <a 
              key={social.name} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:border-brand-yellow group-hover:text-brand-yellow transition-all duration-300 group-hover:scale-105">
                {social.icon}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white text-sm font-bold uppercase tracking-wider">{social.name}</span>
                <span className="text-brand-yellow text-[11px] tracking-widest">{social.handle}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}