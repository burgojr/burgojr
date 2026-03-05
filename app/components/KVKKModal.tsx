"use client";

import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface KVKKModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const KVKKModal = ({ isOpen, onClose, onAccept }: KVKKModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
      {/* Arka plan karartma - Tıklanırsa iptal sayılır */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-[#0d0d0d] border border-brand-yellow/20 w-full max-w-xl max-h-[75vh] rounded-[40px] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="text-brand-yellow" size={20} />
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">KVKK AYDINLATMA METNİ</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* İçerik */}
        <div className="p-8 overflow-y-auto text-gray-400 text-sm leading-relaxed space-y-4">
          <p>BURGO Jr. Franchise başvurusu kapsamında kişisel verilerinizin işlenmesine ilişkin detaylar...</p>
          <p className="text-xs italic text-gray-600">Lütfen formu göndermek için onay veriniz.</p>
        </div>

        {/* Footer Butonları */}
        <div className="p-6 bg-white/5 flex flex-col gap-3">
          <button 
            onClick={onAccept}
            className="w-full bg-brand-yellow text-black font-extrabold py-4 rounded-full hover:bg-white transition-all duration-300 uppercase text-sm"
          >
            OKUDUM, ONAYLIYORUM
          </button>
          <button 
            onClick={onClose}
            className="w-full text-gray-500 hover:text-red-500 text-xs font-bold transition-all uppercase tracking-tighter"
          >
            İPTAL ET / ONAYLAMIYORUM
          </button>
        </div>
      </div>
    </div>
  );
};

export default KVKKModal;