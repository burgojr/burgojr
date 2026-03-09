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
<div className="p-8 overflow-y-auto text-gray-400 text-sm leading-relaxed space-y-6">
  <h4 className="text-white font-bold uppercase tracking-widest text-xs border-b border-white/10 pb-2">1. Veri Sorumlusu</h4>
  <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla <strong>Burgo Jr.</strong> tarafından aşağıda açıklanan amaçlar kapsamında işlenebilecektir.</p>

  <h4 className="text-white font-bold uppercase tracking-widest text-xs border-b border-white/10 pb-2">2. Veri İşleme Amaçları</h4>
  <p>Franchise başvuru formumuz aracılığıyla paylaştığınız ad-soyad, telefon, e-posta, şehir ve yatırım bilgileri; başvurunuzun değerlendirilmesi, başvuru süreçlerinin takibi ve sizinle iletişime geçilmesi amacıyla işlenmektedir.</p>

  <h4 className="text-white font-bold uppercase tracking-widest text-xs border-b border-white/10 pb-2">3. Veri Güvenliği ve Haklarınız</h4>
  <p>Verileriniz, sistemlerimizde yüksek güvenlik standartlarıyla korunmaktadır. KVKK'nın 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme haklarına sahipsiniz.</p>

  <h4 className="text-white font-bold uppercase tracking-widest text-xs border-b border-white/10 pb-2">4. İletişim</h4>
  <p>Talepleriniz ve KVKK ile ilgili sorularınız için iletişim kısmından bize ulaşabilirsiniz.</p>

  <p className="text-[10px] italic text-gray-600 pt-2 border-t border-white/5">
    "Okudum, Onaylıyorum" butonuna basarak, başvuru formunda ilettiğiniz kişisel verilerinizin yukarıdaki amaçlar dahilinde işlenmesine açık rıza vermiş sayılırsınız.
  </p>
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