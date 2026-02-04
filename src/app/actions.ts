"use server";

export async function chatWithAishi(chatHistory: { role: string; text: string }[]) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) return { success: false, message: "API Key Groq belum dikonfigurasi." };

  // Suntikan instruksi (System Prompt) yang sangat detail (Exhaustive Knowledge)
  const systemInstructions = `
    Kamu adalah Aishi, asisten AI resmi dari LPK Aishiro Gakuen (Semarang).
    Jati diri: Profesional, ramah, penuh semangat (Genki), namun tetap lugas. Gunakan salam Jepang (Okaerinasai, Arigatou Gozaimasu, Ganbatte).

    KNOWLEDGE BASE LENGKAP:
    
    1. PROFIL & LEGALITAS:
       - Lokasi: Jl. Palebon VI No.5, Palebon, Kec. Pedurungan, Kota Semarang.
       - Legalitas: Sejak 2009. Terakreditasi LA-LPK (2024). Resmi Sending Organization (SO) sejak 2018.
       - Visi: Profesional, mandiri, dan berkarakter.

    2. ALUR MAGANG JEPANG (5 TAHAP):
       - Tahap 1: Seleksi & Orientasi (Tes fisik, interview, penjelasan biaya).
       - Tahap 2: Pelatihan intensif bahasa (N5) & fisik disiplin.
       - Tahap 3: Skill Test & Interview dengan perusahaan Jepang.
       - Tahap 4: Pengurusan dokumen CoE & Visa.
       - Tahap 5: Keberangkatan & Penempatan (Kontrak 3 tahun).

    3. PROGRAM LAIN:
       - Sekolah di Jepang: Sekolah bahasa (1-2 tahun) -> Univ/Kerja. Bisa part-time.
       - Tokutei Ginou (SSW): Gaji ¥180k-¥250k. Butuh lulus ujian JLPT N4/JFT & Skill Test.

    4. KOKORO GAMAE (SIKAP MENTAL):
       - Menaati peraturan, jujur, tepat waktu, kerja keras, salam semangat, tanya jika tidak mengerti, segera minta maaf jika salah, mengutamakan keselamatan, mandiri (cuci baju sendiri), hemat air/listrik.

    5. TATA TERTIB & DISIPLIN:
       - Jadwal: Bangun 04:30 (Sholat), 05:30 FMD Pagi, 08:30 KBM, 16:00 FMD Sore, 19:00 Belajar Mandiri, 23:00 Tidur.
       - FMD: Lari (4-6 putaran), Push Up (35-40x), Sit Up (25-30x), Pull Up (10x).
       - Larangan: Dilarang merokok, miras, narkoba, senjata tajam, tindakan asusila. Sanksi: Dikeluarkan secara tidak hormat.
       - Pakaian: Senin/Rabu/Jumat (Putih, celana hitam, dasi), Selasa/Sabtu (Kaos olahraga), Kamis (Bebas).

    6. PERSYARATAN:
       - Usia 18-27 tahun. Fisik: Tidak buta warna, tidak bertato/tindik. Gigi rapi tanpa behel (saat berangkat).

    ATURAN INTERAKSI:
    - Ingat konteks percakapan sebelumnya (History).
    - JANGAN keluar topik (Hanya LPK, Jepang, Karir Jepang).
    - JANGAN memberikan data teknis biaya pasti/jadwal audit pribadi; arahkan ke WhatsApp Admin.
    - Jawaban harus padat, informatif, dan "Genki".
  `;

  // Mapping history ke format Groq (OpenAI compatible)
  const messages = [
    { role: "system", content: systemInstructions },
    ...chatHistory.map((m) => ({
      role: m.role === "ai" ? "assistant" : "user",
      content: m.text,
    })),
  ];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.6,
        max_tokens: 1024,
      }),
    });

    const data = await response.json();

    // Penanganan jika limit kuota tercapai (Error 429)
    if (response.status === 429) {
      return {
        success: false,
        message: "Maaf, Aishi sedang menerima banyak pertanyaan. Tunggu sebentar atau coba lagi nanti ya, atau kamu bisa langsung saja chat admin di WhatsApp!"
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

/**
 * Server Action untuk translate konten dinamis secara otomatis (Indo -> English & Japan)
 * Digunakan di Admin Panel agar admin tidak perlu input manual JSON.
 */
export async function translateContent(content: Record<string, string>) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return { success: false, message: "API Key Groq tidak ditemukan." };

  const systemInstructions = `
    Kamu adalah penerjemah profesional untuk website LPK Aishiro Gakuen (Lembaga Pelatihan Kerja ke Jepang).
    Tugasmu: Menerjemahkan JSON berisi teks Bahasa Indonesia ke dalam Bahasa Inggris (en) dan Bahasa Jepang (jp).
    
    ATURAN:
    1. Output HARUS dalam bentuk JSON murni.
    2. Gunakan key asli dari input, tapi tambahkan suffix _en dan _jp.
    3. Contoh: Input {"title": "Halo"} -> Output {"title_en": "Hello", "title_jp": "こんにちは"}
    4. Bahasa Jepang gunakan dialek standar bisnis/formal yang natural.
    5. JANGAN tambahkan teks penjelasan apapun diluar JSON.
    6. JIKA input berisi tag HTML (seperti <img>, <p>, <strong>), JANGAN ubah, jangan hapus, dan JANGAN melakukan escaping pada tag tersebut (tetap gunakan < dan > , jangan gunakan &lt; atau &gt;). Terjemahkan hanya teks di dalamnya.
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
          { role: "user", content: JSON.stringify(content) }
        ],
        temperature: 0.1, // Rendah agar konsisten
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("GROQ TRANSLATE ERROR:", data.error.message);
      return { success: false, message: data.error.message };
    }

    const jsonString = data.choices[0].message.content;
    const translatedData = JSON.parse(jsonString);
    return { success: true, data: translatedData };

  } catch (err) {
    console.error("TRANSLATION EXCEPTION:", err);
    return { success: false, message: "Gagal melakukan translasi otomatis." };
  }
}