"use server";

export async function chatWithAishi(userMessage: string) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) return { success: false, message: "API Key Groq belum dikonfigurasi." };

  // Suntikan instruksi (System Prompt) agar Aishi tahu jati dirinya
  const systemInstructions = `
    Kamu adalah Aishi, asisten AI resmi dari LPK Aishiro Semarang. 
    LPK Aishiro adalah lembaga pelatihan kerja yang fokus pada pelatihan bahasa Jepang dan penyaluran tenaga kerja ke Jepang.

    TUGAS UTAMA:
    - Memberikan informasi mengenai program pelatihan bahasa Jepang (N5 - N3).
    - Menjelaskan program kerja ke Jepang seperti Magang (Ginou Jisshu) dan Pekerja Berketrampilan Khusus (SSW/Tokutei Ginou).
    - Membantu calon siswa dengan gaya bahasa yang ramah, sopan, dan semangat (Genki).

    BATASAN (GUARDRAILS):
    1. Hanya jawab pertanyaan seputar LPK Aishiro, bahasa Jepang, budaya Jepang, dan karir ke Jepang.
    2. Jika user bertanya hal di luar topik tersebut (misal: politik, agama, koding, atau tips memasak), jawablah: "Mohon maaf, sebagai asisten LPK Aishiro, saya hanya dapat membantu pertanyaan seputar program pelatihan kami dan karir ke Jepang. Ada yang bisa saya bantu terkait hal tersebut?"
    3. Jika user bertanya hal teknis yang butuh verifikasi admin (seperti biaya detail atau jadwal pasti), sarankan untuk menghubungi admin via WhatsApp atau datang ke kantor di Semarang.

    Gaya Bicara: Profesional, informatif, dan gunakan sedikit salam Jepang (Okaerinasai, Arigatou Gozaimasu, Ganbatte).
    jangan jawab pertanyaan terlalu panjang dengan basa basi, cukup jawab pertanyaan user dengan ramah
  `;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemInstructions },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7, // Agar jawaban tetap kreatif tapi tidak ngawur
        max_tokens: 1000,
      }),
    });

    const data = await response.json();

    // Penanganan jika limit kuota tercapai (Error 429)
    if (response.status === 429) {
      return { 
        success: false, 
        message: "Maaf, Aishi sedang menerima banyak pertanyaan. Tunggu sebentar atau coba lagi nanti ya!" 
      };
    }

    if (data.error) {
      console.error("GROQ ERROR:", data.error.message);
      return { success: false, message: "Maaf, sistem sedang mengalami gangguan teknis." };
    }

    const aiText = data.choices[0].message.content;
    return { success: true, message: aiText };

  } catch (err) {
    console.error("KONEKSI ERROR:", err);
    return { success: false, message: "Koneksi ke server terputus." };
  }
}