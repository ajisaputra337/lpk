// src/components/Profile.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Profile: React.FC = () => {
  return (
    // Bagian ini akan berada tepat di bawah Hero Section
    <section className="py-16 bg-gray-50"> 
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Mengenal LPK Aishiro Gakuen
            </h2>
            <div className="h-1 w-20 bg-red-700 rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-center">
            
            

            {/* Konten Pendahuluan (Main) */}
            <div className="flex-grow text-gray-700 space-y-4 md:w-2/3">
                <p className="text-xl font-medium">
                    LPK Aishiro Gakuen, yang berdiri sejak tahun 2009 di wilayah Semarang, Jawa Tengah, bergerak di bidang pendidikan dan pelatihan sesuai izin Dinas Tenaga Kerja dan Dinas Pendidikan. Tujuannya adalah membantu mengurangi kemiskinan dan pengangguran dengan meningkatkan kualitas dan keterampilan usia kerja agar dapat bersaing di dunia kerja lokal maupun internasional. Lembaga ini mendapat kepercayaan dari pemerintah sebagai penyelenggara kegiatan subsidi program gratis dan juga ditetapkan sebagai pendamping Lembaga Penempatan Kerja Swasta (LPTKS) oleh Dinas Tenaga Kerja Provinsi Jawa Tengah. Kepercayaan ini menjadi tolok ukur kualitas pelatihan yang dijamin oleh lembaga.
                </p>
                <p className="text-xl ">
                    LPK Aishiro Gakuen didukung oleh tenaga profesional dan berfokus pada pelatihan Bahasa Asing berbasis penempatan kerja, khususnya di Jepang dan Korea. Siswa dapat mengikuti program magang teknis di Jepang selama 3 tahun, atau bekerja di Korea hingga 5 tahun, dengan tunjangan/gaji yang kompetitif (mencapai 10 bulan setelah dipotong biaya hidup). Setelah kembali, lulusan diharapkan dapat menularkan ilmu dan menciptakan lapangan pekerjaan baru. Negara-negara ini, yang menjadi tolok ukur teknologi dunia, menekankan kunci keberhasilan: disiplin (kibishii).
                </p>
                <p className="text-xl ">
                    Tujuan utama lembaga adalah menyiapkan generasi muda yang siap kerja, khususnya di Jepang dan Korea, dengan mengedepankan peraturan kedisiplinan (kokoro gamai). Siswa dilatih sejak dini untuk hidup mandiri, disiplin, dan peduli (care) terhadap lingkungan. Dengan sistem pendidikan yang ketat ini, Aishiro Gakuen yakin lulusan mereka akan memiliki mental yang kuat (tidak canggung) dan berguna bagi masa depan mereka di dunia kerja.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;