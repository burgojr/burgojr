import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { State } from 'country-state-city';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      full_name, 
      email, 
      phone, 
      country, 
      city, // Burası plaka kodu (isoCode)
      district, 
      min_investment,
      max_investment,
      currency, 
      concept_type, 
      message,
      captchaToken 
    } = body;

    // Şehir ismini plaka kodundan çözme
    const stateDetails = State.getStateByCodeAndCountry(city, country);
    const cityName = stateDetails ? stateDetails.name : city;

    // 1. ADIM: reCAPTCHA v3 Doğrulaması
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      { method: "POST" }
    );

    const recaptchaData = await recaptchaResponse.json();

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
      subject: `YENİ FRANCHISE BAŞVURUSU: ${full_name} (${district} / ${cityName})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 12px; color: #333;">
          <h2 style="color: #fdbf1f; text-transform: uppercase; margin-bottom: 5px;">🍔 Yeni Franchise Başvurusu</h2>
          <p style="color: #666; font-size: 14px; margin-top: 0;">Web sitesi üzerinden yeni bir franchise başvuru formu iletildi.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          
          <h3 style="font-size: 16px; color: #fdbf1f;">👤 Başvuru Bilgileri</h3>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 5px 0; width: 120px;"><strong>Ad Soyad:</strong></td><td>${full_name}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>E-posta:</strong></td><td><a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></td></tr>
            <tr><td style="padding: 5px 0;"><strong>Telefon:</strong></td><td><a href="tel:${phone}" style="color: #007bff; text-decoration: none;">${phone}</a></td></tr>
          </table>

          <h3 style="font-size: 16px; color: #fdbf1f; margin-top: 25px;">📍 Lokasyon Tercihi</h3>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 5px 0; width: 120px;"><strong>Ülke:</strong></td><td>${country}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Şehir:</strong></td><td>${cityName}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>İlçe:</strong></td><td>${district}</td></tr>
          </table>
          
          <h3 style="font-size: 16px; color: #fdbf1f; margin-top: 25px;">💰 Yatırım ve Konsept</h3>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 5px 0; width: 120px;"><strong>Bütçe Aralığı:</strong></td><td>${min_investment || '0'} ${currency} - ${max_investment || '0'} ${currency}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Konsept:</strong></td><td style="text-transform: capitalize;">${concept_type || 'Belirtilmedi'}</td></tr>
          </table>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;" />
          
          <h3 style="font-size: 16px; color: #fdbf1f;">📝 Başvuru Notu</h3>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; font-size: 14px; line-height: 1.6; border: 1px solid #f0f0f0;">
            ${message?.replace(/\n/g, '<br/>') || 'Not eklenmedi.'}
          </div>

          <p style="font-size: 11px; color: #aaa; margin-top: 40px; text-align: center; border-top: 1px solid #eee; padding-top: 10px;">
            Bu başvuru reCAPTCHA v3 ile doğrulanmıştır. (Güven Skoru: ${recaptchaData.score})
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