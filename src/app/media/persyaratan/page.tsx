import React from 'react';

export const metadata = {
    title: "Persyaratan Magang Jepang | LPK Aishiro Gakuen",
    description: "Persyaratan lengkap untuk program magang ke Jepang melalui LPK Aishiro Gakuen.",
};

export default function PersyaratanPage() {
    return (
        <div className="container mx-auto px-4 pt-28 pb-8 md:pt-36 md:pb-12 max-w-4xl">
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-10">

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-8 uppercase tracking-wide">
                    Persyaratan Magang Jepang 2024 <br className="hidden md:block" /> ( SO/ SWASTA )
                </h1>

                <div className="grid gap-8 md:gap-10">
                    {/* Section 1: Persyaratan Khusus */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-4 uppercase border-b-2 border-red-100 pb-2">
                            Persyaratan Khusus
                        </h2>
                        <ol className="list-decimal list-outside text-gray-700 space-y-2 pl-5 text-base md:text-lg leading-relaxed">
                            <li>Pria / Wanita, usia minimal 18 s/d 27 tahun</li>
                            <li>Tidak buta warna (total/parsial), dan berkaca mata/kontak lens</li>
                            <li>Tidak bertato atau bekas tato</li>
                            <li>Tidak bertindik atau bekas tindik</li>
                            <li><strong>Bersemangat dan bersedia belajar Bahasa Jepang di LPK.</strong></li>
                        </ol>
                    </section>

                    {/* Section 2: Persyaratan Administrasi */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-4 uppercase border-b-2 border-red-100 pb-2">
                            Persyaratan Administrasi
                        </h2>
                        <ul className="list-disc list-outside text-gray-700 space-y-2 pl-5 text-base md:text-lg leading-relaxed">
                            <li>Foto Copy KTP , KK , Akte Kelahiran</li>
                            <li>Ijazah dan Transkrip SD sampai terakhir.</li>
                            <li>SKCK ( diurus di Polres )</li>
                            <li>Kartu Kuning (AK1) diurus di Disnaker setempat</li>
                            <li>Surat Ijin Orang Tua / Wali ( <em>Ada Format di LPK, bermaterai</em> )</li>
                            <li>Pas poto 4x6 dan 3x4 @ 3 lembar / Soft-File</li>
                        </ul>
                    </section>
                </div>

                {/* Call to Action (Optional but good for UX) */}
                <div className="mt-10 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-600 mb-4">
                        Sudah memenuhi persyaratan? Segera daftarkan diri Anda!
                    </p>
                    <a
                        href="/pendaftaran"
                        className="inline-block bg-yellow-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-md transform hover:-translate-y-1"
                    >
                        Daftar Sekarang
                    </a>
                </div>

            </div>
        </div>
    );
}
