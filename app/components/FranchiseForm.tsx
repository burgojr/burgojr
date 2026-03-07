"use client";

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import KVKKModal from './KVKKModal';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const FranchiseForm = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isKvkkChecked, setIsKvkkChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget; 

    if (!isKvkkChecked) {
      setIsModalOpen(true);
      return;
    }

    if (!executeRecaptcha) {
      alert("Güvenlik sistemi yüklenmedi, lütfen sayfayı yenileyip tekrar deneyin.");
      return;
    }

    setLoading(true);

    try {
      const captchaToken = await executeRecaptcha('franchise_application');
      const formData = new FormData(formElement); 
      const data = Object.fromEntries(formData.entries());

      const { error: supabaseError } = await supabase
        .from('franchise_applications')
        .insert([data]);

      if (supabaseError) throw new Error("Veritabanı hatası: " + supabaseError.message);

      const mailRes = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({ ...data, captchaToken }), 
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await mailRes.json();
      if (!mailRes.ok) throw new Error(result.error || "Güvenlik doğrulaması başarısız.");

      setIsSubmitted(true);
      formElement.reset(); 
      setIsKvkkChecked(false);

    } catch (error: any) {
      console.error("Form Hatası:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleAccept = () => {
    setIsKvkkChecked(true);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsKvkkChecked(false);
    setIsModalOpen(false);
  };

  return (
    <section id='basvuru-formu' className="w-full bg-black mb-10 md:mb-20 px-4 md:px-6 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[30px] md:rounded-[40px] p-6 md:p-16 shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 blur-[120px] -z-10"></div>
        
        <div className="text-center mb-8 md:mb-12">
          {/* Mobilde 2xl, Masaüstünde 3xl yaparak JoinUs ile eşitledik */}
          <p className="text-brand-yellow italic text-xl md:text-3xl mb-1">Hemen Başvurun</p>
          <h3 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            BAŞVURU FORMU
          </h3>
          <div className="h-1 w-16 md:w-20 bg-brand-yellow mx-auto mt-4 md:mt-6"></div>
        </div>

        {isSubmitted ? (
          <div className="text-center py-10 md:py-12 animate-in fade-in zoom-in duration-500">
            <div className="bg-brand-yellow w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="text-black rotate-[-45deg]" size={32} />
            </div>
            <h4 className="text-white text-2xl md:text-3xl font-bold mb-4 uppercase">BAŞVURUNUZ ALINDI!</h4>
            <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto">
              Bilgileriniz ekibimize ulaştı. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-8 text-brand-yellow underline text-sm hover:text-white"
            >
              Yeni Form Gönder
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Adınız Soyadınız</label>
              <input name="full_name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 md:py-4 px-6 text-white focus:border-brand-yellow outline-none transition-all text-sm md:text-base" placeholder="Örn: Ahmet Yılmaz" />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">E-Posta Adresi</label>
              <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 md:py-4 px-6 text-white focus:border-brand-yellow outline-none transition-all text-sm md:text-base" placeholder="ahmet@mail.com" />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Telefon</label>
              <input name="phone" required type="tel" className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 md:py-4 px-6 text-white focus:border-brand-yellow outline-none transition-all text-sm md:text-base" placeholder="05xx xxx xx xx" />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Yatırım Yapılacak Şehir</label>
              <input name="city" required type="text" className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 md:py-4 px-6 text-white focus:border-brand-yellow outline-none transition-all text-sm md:text-base" placeholder="Örn: İzmir" />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Yatırım Bütçesi</label>
              <select name="investment_amount" className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 md:py-4 px-6 text-gray-400 focus:border-brand-yellow outline-none transition-all appearance-none cursor-pointer text-sm md:text-base">
                <option value="" className="bg-black">Bütçe Aralığı Seçiniz</option>
                <option value="1M-2.5M" className="bg-black text-white">1M - 2.5M TL</option>
                <option value="2.5M-5M" className="bg-black text-white">2.5M - 5M TL</option>
                <option value="5M+" className="bg-black text-white">5M TL ve Üzeri</option>
              </select>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Konsept Tercihi</label>
              <select name="concept_type" className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 md:py-4 px-6 text-gray-400 focus:border-brand-yellow outline-none transition-all appearance-none cursor-pointer text-sm md:text-base">
                <option value="" className="bg-black">Konsept Türünü Seçiniz</option>
                <option value="alkollü" className="bg-black text-white">Alkollü</option>
                <option value="alkolsüz" className="bg-black text-white">Alkolsüz</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Eklemek İstediğiniz Notlar</label>
              <textarea name="message" rows={3} className="w-full bg-white/5 border border-white/10 rounded-[24px] md:rounded-[30px] py-4 md:py-5 px-6 md:px-8 text-white focus:border-brand-yellow outline-none transition-all resize-none text-sm md:text-base" placeholder="Mesajınız..."></textarea>
            </div>

            <div className="md:col-span-2 flex items-start space-x-3 px-2 md:px-4 py-2">
              <input 
                required 
                type="checkbox" 
                id="kvkk"
                checked={isKvkkChecked}
                onClick={handleCheckboxClick}
                onChange={() => {}} 
                className="mt-1 w-4 h-4 md:w-5 md:h-5 accent-brand-yellow cursor-pointer flex-shrink-0" 
              />
              <label 
                htmlFor="kvkk" 
                onClick={handleCheckboxClick}
                className="text-[10px] md:text-xs text-gray-500 leading-tight cursor-pointer select-none"
              >
                <span className="text-brand-yellow underline hover:text-white transition-colors mr-1">
                  KVKK Aydınlatma Metni'ni
                </span>
                okudum ve verilerimin işlenmesini onaylıyorum.
              </label>
            </div>

            <div className="md:col-span-2 mt-2 md:mt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-brand-yellow hover:bg-white text-black font-black py-4 md:py-5 rounded-full transition-all duration-300 flex items-center justify-center space-x-3 text-base md:text-lg uppercase tracking-tighter disabled:opacity-50 active:scale-95"
              >
                <span>{loading ? "GÖNDERİLİYOR..." : "BAŞVURUYU GÖNDER"}</span>
                <Send size={18} />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default FranchiseForm;