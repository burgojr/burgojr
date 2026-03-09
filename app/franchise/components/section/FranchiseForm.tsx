"use client";

import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import KVKKModal from '../modal/KVKKModal';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Country, State, City } from 'country-state-city';

const FranchiseForm = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isKvkkChecked, setIsKvkkChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [currency, setCurrency] = useState("₺");

  // Lokasyon State'leri - Varsayılan Türkiye (TR)
  const [selectedCountry, setSelectedCountry] = useState("TR");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);

  const { executeRecaptcha } = useGoogleReCaptcha();

  // 1. Ülke değişince Şehirleri (States) yükle
  useEffect(() => {
    if (selectedCountry) {
      const fetchedStates = State.getStatesOfCountry(selectedCountry);
      setStates(fetchedStates);
      setSelectedCity(""); 
      setDistricts([]);
    }
  }, [selectedCountry]);

  // 2. Şehir değişince İlçeleri (Cities) yükle
  useEffect(() => {
    if (selectedCity) {
      const fetchedDistricts = City.getCitiesOfState(selectedCountry, selectedCity);
      setDistricts(fetchedDistricts);
      setSelectedDistrict("");
    }
  }, [selectedCity, selectedCountry]);

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

      // NOT: Veritabanına gönderirken formatlı bütçeyi temizlemek istersen 
      // data.min_investment = minBudget.replace(/\./g, ""); gibi eklemeler yapabilirsin.

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
      setMinBudget(""); // State'leri temizle
      setMaxBudget("");

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

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const amount = value.replace(/\D/g, "");
    return amount.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinBudget(formatCurrency(e.target.value));
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxBudget(formatCurrency(e.target.value));
  };

  return (
    <section id='basvuru-formu' className="w-full bg-black mb-10 md:mb-20 px-6 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[40px] p-8 md:p-16 shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 blur-[120px] -z-10"></div>
        
        <div className="text-center mb-12">
          <h2 className="text-brand-yellow italic text-2xl mb-2">Hemen Başvurun</h2>
          <h3 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            BAŞVURU FORMU
          </h3>
          <div className="h-1 w-20 bg-brand-yellow mx-auto mt-6"></div>
        </div>

        {isSubmitted ? (
          <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
            <div className="bg-brand-yellow w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="text-black rotate-[-45deg]" size={40} />
            </div>
            <h4 className="text-white text-3xl font-bold mb-4">BAŞVURUNUZ ALINDI!</h4>
            <p className="text-gray-400 max-w-md mx-auto">
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
<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Ad Soyad */}
  <div className="space-y-2">
    <label className="text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Adınız Soyadınız</label>
    <input name="full_name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white focus:border-brand-yellow outline-none transition-all placeholder:text-xs md:placeholder:text-sm" placeholder="Örn: Ahmet Yılmaz" />
  </div>

  {/* E-Posta */}
  <div className="space-y-2">
    <label className="text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">E-Posta Adresi</label>
    <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white focus:border-brand-yellow outline-none transition-all placeholder:text-xs md:placeholder:text-sm" placeholder="ahmet@mail.com" />
  </div>

  {/* Telefon */}
  <div className="space-y-2">
    <label className="text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Telefon</label>
    <input name="phone" required type="tel" className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white focus:border-brand-yellow outline-none transition-all placeholder:text-xs md:placeholder:text-sm" placeholder="05xx xxx xx xx" />
  </div>

  {/* Konsept Tercihi */}
  <div className="space-y-2">
    <label className="text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Konsept Tercihi</label>
    <div className="relative">
      <select 
        name="concept_type" 
        required
        className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-gray-400 focus:border-brand-yellow focus:text-white outline-none transition-all appearance-none cursor-pointer text-xs md:text-sm"
        onChange={(e) => {
          if(e.target.value !== "") e.target.classList.add("text-white");
          else e.target.classList.remove("text-white");
        }}
      >
        <option value="" className="bg-black">Konsept Türünüzü Seçiniz</option>
        <option value="alkollü" className="bg-black text-white">Alkollü</option>
        <option value="alkolsüz" className="bg-black text-white">Alkolsüz</option>
      </select>
    </div>
  </div>

  {/* ÜLKE - ŞEHİR - İLÇE GRUBU */}
<div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Ülke</label>
      <select required name="country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white outline-none transition-all text-xs appearance-none cursor-pointer">
        {countries.map(c => <option key={c.isoCode} value={c.isoCode} className="bg-black">{c.name}</option>)}
      </select>
    </div>

    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Şehir</label>
      <select required name="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white outline-none transition-all text-xs appearance-none cursor-pointer">
        <option value="" className="bg-black text-gray-400">Şehir Seçiniz</option>
        {states.map(s => <option key={s.isoCode} value={s.isoCode} className="bg-black text-white">{s.name}</option>)}
      </select>
    </div>

    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">İlçe</label>
      <select required name="district" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!selectedCity} className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white outline-none transition-all text-xs appearance-none cursor-pointer disabled:opacity-30">
        <option value="" className="bg-black text-gray-400">İlçe Seçiniz</option>
        {districts.map(d => <option key={d.name} value={d.name} className="bg-black text-white">{d.name}</option>)}
      </select>
    </div>
  </div>

  {/* Bütçe Alanı */}
  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-7 gap-4">
    <div className="md:col-span-3 space-y-2">
      <label className="text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Min. Bütçe</label>
      <input required name="min_investment" type="text" value={minBudget} onChange={handleMinChange} className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white focus:border-brand-yellow outline-none transition-all text-sm" placeholder="Örn: 1.000.000" />
    </div>
    <div className="md:col-span-3 space-y-2">
      <label className="text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Max. Bütçe</label>
      <input required name="max_investment" type="text" value={maxBudget} onChange={handleMaxChange} className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white focus:border-brand-yellow outline-none transition-all text-sm" placeholder="Örn: 5.000.000" />
    </div>
    <div className="md:col-span-1 space-y-2">
      <label className="text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold text-center block">Birim</label>
      <select name="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-2 text-white outline-none appearance-none cursor-pointer text-center font-bold">
        <option value="₺" className="bg-black text-white text-lg">₺</option>
        <option value="$" className="bg-black text-white text-lg">$</option>
        <option value="€" className="bg-black text-white text-lg">€</option>
      </select>
    </div>
  </div>

  {/* Mesaj */}
  <div className="md:col-span-2 space-y-2">
    <label className="text-xs uppercase tracking-widest text-gray-500 ml-4 font-bold">Eklemek İstediğiniz Notlar</label>
    <textarea name="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-[30px] py-5 px-8 text-white focus:border-brand-yellow outline-none transition-all resize-none placeholder:text-xs md:placeholder:text-sm" placeholder="Mesajınız..."></textarea>
  </div>

  {/* KVKK */}
  <div className="md:col-span-2 flex items-center space-x-3 px-4 md:px-4 py-2">
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
      <span className="text-brand-yellow underline hover:text-white transition-colors mr-1 cursor-pointer">
        KVKK Aydınlatma Metni'ni
      </span>
      okudum ve verilerimin işlenmesini onaylıyorum.
    </label>
  </div>

  {/* Submit Button */}
  <div className="md:col-span-2 mt-4">
    <button 
      type="submit" 
      disabled={loading}
      className="w-full bg-brand-yellow hover:bg-white text-black font-black py-5 rounded-full transition-all duration-300 flex items-center justify-center space-x-3 text-lg uppercase tracking-tighter disabled:opacity-50"
    >
      <span>{loading ? "GÖNDERİLİYOR..." : "BAŞVURUYU GÖNDER"}</span>
      <Send size={20} />
    </button>
  </div>
</form>
        )}
      </div>

      <KVKKModal 
        isOpen={isModalOpen} 
        onClose={handleCancel} 
        onAccept={handleAccept} 
      />
    </section>
  );
};

export default FranchiseForm;