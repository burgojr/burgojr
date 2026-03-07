"use client";

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
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
        {/* 2. Başlık Grubu - Mobilde boyutlar optimize edildi */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-brand-yellow italic text-xl md:text-4xl mb-1 md:mb-2">
            Bize
          </p>
          <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 md:mb-12">
            KATILIN
          </h2>
        </motion.div>

        {/* 3. Metin İçeriği - Mobilde boşluklar ve fontlar dengelendi */}
        <motion.div 
          className="w-full space-y-8 md:space-y-12 text-gray-400 text-sm md:text-lg leading-relaxed md:leading-loose font-medium flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Üst Paragraf */}
          <p className="max-w-4xl text-center px-2">
            BURGO Jr. ailesine katılmak oldukça kolay ve net bir süreçtir. 
            Başvuru formunu doldurmanızın ardından ekibimiz sizinle iletişime geçer ve yatırım hedeflerinize en uygun işletme modelini belirlemek için kısa bir ön görüşme yapılır. 
            Ardından lokasyon analizi, yatırım planı ve işletme konsepti birlikte oluşturulur.
          </p>

          {/* SOLA HİZALI KISIM */}
          <div className="w-full max-w-3xl px-2 md:px-4 flex flex-col items-start text-left">
            
            <h3 className="text-white font-bold text-base md:text-xl mb-6 md:mb-8 tracking-tight">
              Marka, işletmecilerine yalnızca bir isim hakkı değil aynı zamanda:
            </h3>
            
            {/* Madde İşaretleri - Mobilde tek sütun, daha kompakt */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-5 w-full">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center space-x-3 text-gray-300"
                >
                  <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full border border-brand-yellow flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-brand-yellow" strokeWidth={4} />
                  </div>
                  <span className="text-xs md:text-base font-semibold tracking-tight md:tracking-wide">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>

            <p className="italic text-brand-yellow/80 mt-8 md:mt-10 text-xs md:text-base">
                ...gibi işinizi baştan sona kolaylaştıran güçlü bir destek ağı sunar.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinUsSection;