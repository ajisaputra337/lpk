// src/components/Profile.tsx

import React from 'react';
import Link from 'next/link';
import { Landmark, Briefcase, Smile } from 'lucide-react';

const Profile: React.FC = () => {
    return (
        <section id="Profile" className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header Section dengan Aksen Merah */}
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-800 tracking-wider">
                        Mengenal <span className="text-red-700">Aishiro Gakuen</span>
                    </h2>
                    <p className="text-xl text-gray-600 mt-2 italic">Membangun Disiplin, Meraih Masa Depan</p>
                    <div className="h-1.5 w-32 bg-red-700 rounded-full mt-4"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Kolom Kiri: VIDEO YOUTUBE dan Poin Utama (Lebar 1/3) */}
                    <div className="lg:w-1/3 w-full relative">

                        {/* START MODIFIKASI: Menggunakan Aspect Ratio 16:9 */}
                        <div className="relative pt-[56.25%] w-full rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 border-4 border-red-700">
                            <iframe
                                // iframe harus absolut agar mengisi div rasio (pt-[56.25%])
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/moYG25nBxNg"
                                title="Video Profil LPK Aishiro Gakuen"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        {/* END MODIFIKASI */}

                        {/* Kartu Poin Keunggulan */}
                        <div className="mt-8 space-y-4">
                            <div className="flex items-start p-4 bg-red-50 rounded-lg border-l-4 border-red-700 shadow-md">
                                <Landmark className="h-6 w-6 text-red-700 mr-1 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-gray-800">Legalitas & Kepercayaan</p>
                                    <p className="text-sm text-gray-600">Didirikan sejak 2009, dipercaya Disnaker dan menjadi pendamping LPTKS.</p>
                                </div>
                            </div>
                            <div className="flex items-start p-4 bg-red-50 rounded-lg border-l-4 border-red-700 shadow-md">
                                <Briefcase className="h-6 w-6 text-red-700 mr-1 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-gray-800">Fokus Penempatan Kerja</p>
                                    <p className="text-sm text-gray-600">Spesialisasi di Jepang (Magang Teknik).</p>
                                </div>
                            </div>
                            <div className="flex items-start p-4 bg-red-50 rounded-lg border-l-4 border-red-700 shadow-md">
                                <Smile className="h-6 w-6 text-red-700 mr-1 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-gray-800">Mental Disiplin (Kibishii)</p>
                                    <p className="text-sm text-gray-600">Menyiapkan siswa dengan etos kerja, kedisiplinan, dan kemandirian tinggi.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Konten Pendahuluan (Teks Utama) (Lebar 2/3) */}
                    <div className="lg:w-2/3 w-full text-gray-700 space-y-6">
                        {/* Paragraf 1 */}
                        <div className="p-6 bg-gray-50 rounded-lg border-t-4 border-red-700 shadow-inner">
                            <p className="text-lg leading-relaxed">
                                <span className="text-red-700 font-bold">LPK Aishiro Gakuen</span>, berdiri sejak tahun 2009 di Semarang, Jawa Tengah, berdedikasi dalam pendidikan dan pelatihan kerja. Dengan izin resmi dari Dinas Tenaga Kerja dan Dinas Pendidikan, misi utama kami adalah meningkatkan kualitas dan keterampilan usia kerja, bertujuan untuk mengurangi kemiskinan dan pengangguran. Kami mempersiapkan Anda untuk bersaing di pasar kerja lokal maupun internasional.
                            </p>
                            <p className="text-lg leading-relaxed mt-4">
                                Kepercayaan dari pemerintah tercermin melalui penetapan kami sebagai penyelenggara kegiatan subsidi program gratis dan sebagai pendamping Lembaga Penempatan Kerja Swasta (LPTKS) oleh Dinas Tenaga Kerja Provinsi Jawa Tengah. <span className="font-semibold italic">Ini adalah tolak ukur kualitas pelatihan yang kami jamin.</span>
                            </p>
                        </div>

                        {/* Paragraf 2 */}
                        {/* <div className="p-6 border-l-4 border-red-700">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Fokus Pelatihan</h3>
                    <p className="text-lg leading-relaxed">
                        Didukung oleh tenaga profesional, LPK Aishiro Gakuen berfokus pada pelatihan Bahasa Asing berbasis penempatan kerja, terutama di Jepang. Siswa kami berkesempatan mengikuti program magang teknis di Jepang selama 3 tahun, atau bekerja hingga 5 tahun, dengan tunjangan/gaji yang kompetitif (dapat mencapai 10 kali lipat gaji awal setelah dipotong biaya hidup).
                    </p>
                    <p className="text-lg leading-relaxed mt-3">
                        Kami percaya, kunci keberhasilan di negara maju seperti Jepang adalah disiplin (Kibishii). Setelah kembali, lulusan kami diharapkan dapat menularkan ilmu, keterampilan, dan etos kerja yang kuat, serta berpotensi menciptakan lapangan pekerjaan baru.
                    </p>
                </div> */}

                        {/* Paragraf 3: Kedisiplinan & Mindset */}
                        <div className="p-6 bg-red-50 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold text-red-700 mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 0012 21a12.001 12.001 0 008.618-4.016z" />
                                </svg>
                                Tujuan Kami: Kokoro Gamae (Mental Kuat)
                            </h3>
                            <p className="text-lg leading-relaxed">
                                Tujuan utama lembaga adalah menyiapkan generasi muda yang siap kerja dengan mengedepankan peraturan kedisiplinan (Kokoro Gamae - Mentalitas). Siswa dilatih sejak dini untuk hidup mandiri, disiplin, dan peduli (care) terhadap lingkungan. Dengan sistem pendidikan yang ketat ini, Aishiro Gakuen menjamin lulusan akan memiliki mental yang kuat (tidak canggung) dan menjadi aset berharga bagi masa depan mereka di dunia kerja global.
                            </p>
                        </div>

                        <div className="mt-8 text-center">
                            <Link
                                href="#Program"
                                className="inline-flex items-center justify-center rounded-md bg-red-700 px-8 py-3 text-lg font-bold text-white shadow-xl hover:bg-red-800 transition-colors">
                                Lihat Program Unggulan Kami
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;