"use client";

import { motion } from 'framer-motion';
import { Check } from 'lucide-react'; // İkon için lucide-react (veya projenizdeki başka bir kütüphane)
import ScrollLine from './ScrollLine'; 

const JoinUsSection = () => {
  const benefits = [
    "Profesyonel eğitim süreçleri",
    "Menü standardizasyonu",
    "Tedarik zinciri güvencesi",
    "Sosyal medya & pazarlama desteği",
    "Operasyonel danışmanlık"
  ];

  return (
    <section className="w-full flex flex-col items-center pb-24 bg-black font-sans">
      
      {/* 1. Ara Dikey Çizgi */}
      <div className="mb-1">
        <ScrollLine />
      </div>

      <div id='bize-katilin' className="max-w-5xl px-6 text-center">
        {/* 2. Başlık Grubu */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-brand-yellow italic text-3xl md:text-4xl mb-2">
            Bize
          </p>
          <h2 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12">
            KATILIN
          </h2>
        </motion.div>

{/* 3. Metin İçeriği */}
<motion.div 
  className="w-full space-y-12 text-gray-400 text-base md:text-lg leading-loose font-medium flex flex-col items-center"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.2 }}
  transition={{ duration: 1, delay: 0.2 }}
>
  {/* Üst Paragraf */}
  <p className="max-w-4xl text-center">
    BURGO Jr. ailesine katılmak oldukça kolay ve net bir süreçtir. 
    Başvuru formunu doldurmanızın ardından ekibimiz sizinle iletişime geçer ve yatırım hedeflerinize en uygun işletme modelini belirlemek için kısa bir ön görüşme yapılır. 
    Ardından lokasyon analizi, yatırım planı ve işletme konsepti birlikte oluşturulur.
  </p>

  {/* SOLA HİZALI KISIM (BAŞLIK + MADDELER) */}
  <div className="w-full max-w-3xl px-4 flex flex-col items-start text-left">
    
    {/* Marka ile başlayan yazı - Tam buradan hizalanıyor */}
    <h4 className="text-white font-bold text-lg md:text-xl mb-8 tracking-tight">
      Marka, işletmecilerine yalnızca bir isim hakkı değil aynı zamanda:
    </h4>
    
    {/* Madde İşaretleri - Sütunlu ama sola yaslı */}
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 w-full">
      {benefits.map((benefit, index) => (
        <motion.li 
          key={index}
          className="flex items-center space-x-3 text-gray-300"
        >
          {/* Onay İkonu */}
          <div className="flex-shrink-0 w-5 h-5 rounded-full border border-brand-yellow flex items-center justify-center">
            <Check className="w-3 h-3 text-brand-yellow" strokeWidth={3} />
          </div>
          {/* Metin */}
          <span className="text-sm md:text-base font-semibold tracking-wide">
            {benefit}
          </span>
        </motion.li>
      ))}
    </ul>

    {/* Alt Kısım - Yine aynı hizadan başlıyor */}
    <p className="italic text-brand-yellow/80 mt-10 text-sm md:text-base">
       ...gibi işinizi baştan sona kolaylaştıran güçlü bir destek ağı sunar.
    </p>
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default JoinUsSection;