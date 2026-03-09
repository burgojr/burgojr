"use client";

import { motion } from 'framer-motion';
import ScrollLine from '../ScrollLine'; 

const WhyBurgoSection = () => {
  return (
    <div className="bg-black w-full overflow-hidden font-sans">
      {/* 1. BAŞLIK VE ÇİZGİ ALANI */}
      <section className="w-full flex flex-col items-center pt-10 pb-10">
        <ScrollLine />
        <motion.div 
          className="mt-5 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 id='neden-burgo'className="text-brand-yellow text-4xl md:text-6xl font-bold tracking-[0.2em] italic uppercase">
            NEDEN BURGO Jr. ?
          </h2>
          <div className="h-1 w-20 bg-brand-yellow mx-auto mt-6" />
        </motion.div>
      </section>

      {/* 2. GÖRSEL VE ÜZERİNE BİNEN YAZI ALANI */}
      <section className="relative w-full max-w-6xl mx-auto px-6 flex flex-col items-center pb-20">
        
        {/* Resim Kutusu */}
        <div className="relative w-full h-[400px] md:h-[600px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl z-10">
          <img 
            src="/images/hero/hamburger2.jpeg" 
            className="w-full h-full object-cover opacity-60" 
            alt="Burgo Jr."
          />
          {/* Karartma gradyanı */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        {/* FRANCHISE YAZISI */}
        <motion.div 
          className="relative z-20 -mt-32 md:-mt-40 w-full text-left px-4 md:px-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-2xl text-gray-300 text-sm md:text-base font-medium leading-relaxed space-y-4">
            <p>
              BURGO Jr., hızlı tüketim kültürünün klasikleşmiş tatlarını, günümüz sosyal medya trendleriyle harmanlayarak yenilenen bir gastronomi deneyimi sunar. Menümüzdeki her ürün, insanların bugün gerçekten yemek istediği şeyleri hedef alır: Instagram’da karşılaşılan o akış durduran katmanlı burgerler, Meksika sokaklarının vazgeçilmez burritoları, nefis makarnalar ve enfes yan lezzetler…
              Ayrıca marka, genç ama deneyimli bir ruha sahiptir:
            </p>
            <p>Daha dinamik işletme kültürü, daha hızlı uyum, daha hızlı yenilik… Bu sayede 7’den 70’e herkesin kendini evinde hissettiği, enerjisi yüksek bir atmosfer yaratıyoruz.
            Alkollü ve alkolsüz olmak üzere iki farklı işletme modeliyle her yatırımcının ihtiyacına uyum sağlıyor; ister özel kokteyl menüleriyle zenginleştirilmiş bir sosyal mekan, ister hızlı servis odaklı modern bir restaurant açmak isterseniz BURGO Jr. esnek bir çözüm sunuyor.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default WhyBurgoSection;