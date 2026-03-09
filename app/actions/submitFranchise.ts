"use server";

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitFranchiseForm(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  try {
    // 1. Supabase'e Kaydet
    const { error: dbError } = await supabase
      .from('franchise_applications')
      .insert([data]);

    if (dbError) throw new Error("Veritabanı hatası: " + dbError.message);

    // 2. Mail Gönder
    await resend.emails.send({
      from: 'Burgo Jr. <onboarding@resend.dev>',
      to: ['kralisandavic16@gmail.com'],
      subject: `YENİ FRANCHISE BAŞVURUSU: ${data.full_name}`,
      html: `
        <h2>Yeni Başvuru: ${data.full_name}</h2>
        <p><strong>E-posta:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.phone}</p>
        <p><strong>Lokasyon:</strong> ${data.city} / ${data.district}</p>
        <p><strong>Bütçe:</strong> ${data.min_investment} - ${data.max_investment} ${data.currency}</p>
      `
    });

    return { success: true, message: "Başvurunuz başarıyla alındı!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}