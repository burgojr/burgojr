import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      full_name, 
      email, 
      phone, 
      city, 
      investment_amount, 
      concept_type, 
      message,
      captchaToken // Frontend'den gelen token'ı yakalıyoruz
    } = body;

    // 1. ADIM: reCAPTCHA v3 Doğrulaması (E-posta göndermeden ÖNCE yapılmalı)
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      { method: "POST" }
    );

    const recaptchaData = await recaptchaResponse.json();

    // v3 Puan Kontrolü (0.5 ve üzeri genellikle güvenlidir)
    if (!recaptchaData.success || (recaptchaData.score !== undefined && recaptchaData.score < 0.5)) {
      return NextResponse.json({ 
        error: "Güvenlik doğrulaması başarısız. Bot algılandı.",
        score: recaptchaData.score 
      }, { status: 400 });
    }

    // 2. ADIM: E-posta Gönderme İşlemi
    const mailData = await resend.emails.send({
      from: 'Burgo Jr. Franchise <onboarding@resend.dev>', 
      to: ['kralisandavic16@gmail.com'],
      subject: `YENİ FRANCHISE BAŞVURUSU: ${full_name} (${city})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #fdbf1f; text-transform: uppercase;">🍔 Yeni Franchise Başvurusu</h2>
          <hr />
          <p><strong>Aday Bilgileri:</strong></p>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Ad Soyad:</strong> ${full_name}</li>
            <li><strong>E-posta:</strong> <a href="mailto:${email}">${email}</a></li>
            <li><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></li>
            <li><strong>Şehir:</strong> ${city}</li>
          </ul>
          
          <hr />
          <p><strong>Yatırım Detayları:</strong></p>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Bütçe Aralığı:</strong> ${investment_amount || 'Belirtilmedi'}</li>
            <li><strong>Konsept Tercihi:</strong> ${concept_type || 'Belirtilmedi'}</li>
          </ul>

          <hr />
          <p><strong>Başvuru Notu:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
            ${message || 'Not eklenmedi.'}
          </div>

          <p style="font-size: 11px; color: #aaa; margin-top: 30px;">
            Bu başvuru reCAPTCHA v3 ile doğrulanmıştır (Güven Skoru: ${recaptchaData.score}).
          </p>
        </div>
      `
    });

    return NextResponse.json(mailData);

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: 'Mail gönderilirken bir hata oluştu' }, { status: 500 });
  }
}