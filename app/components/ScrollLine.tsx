"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Scroll = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // HIZ AYARI BURADA YAPILIYOR:
  // [0.1, 0.9] aralığı noktanın hareketini tüm çizgi boyunca yayar ve yavaşlatır.
  // Değerler arası fark ne kadar büyükse hareket o kadar yavaş hissettirir.
  const yPos = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="w-full flex justify-center py-10 bg-black">
      <div className="w-px h-32 md:h-48 bg-brand-yellow relative">
        
        <motion.div 
          style={{ top: yPos }}
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-yellow rounded-full shadow-[0_0_12px_#d4a017]"
        />

      </div>
    </div>
  );
};

export default Scroll;