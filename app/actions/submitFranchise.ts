"use server";

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function submitFranchiseForm(formData: FormData) {
  const rawFormData = {
    full_name: formData.get('full_name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    city: formData.get('city'),
    concept_type: formData.get('concept_type'),
    message: formData.get('message'),
  };

  const { data, error } = await supabase
    .from('franchise_applications')
    .insert([rawFormData]);

  if (error) {
    console.error("Hata:", error);
    return { success: false, message: "Kayıt sırasında bir hata oluştu." };
  }

  return { success: true, message: "Başvurunuz başarıyla alındı!" };
}