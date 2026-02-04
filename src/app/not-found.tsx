import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
            <h1 className="mb-4 text-9xl font-extrabold text-red-600">404</h1>
            <h2 className="mb-8 text-3xl font-bold text-gray-800">Halaman Tidak Ditemukan</h2>
            <p className="mb-12 max-w-md text-lg text-gray-600">
                Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
            </p>
            <Link
                href="/id"
                className="rounded-full bg-red-600 px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl"
            >
                Kembali ke Beranda
            </Link>

            <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Link href="/id/program/magang-jepang" className="text-sm font-medium text-gray-500 hover:text-red-600">
                    Program Magang
                </Link>
                <Link href="/id/profil/company-profile" className="text-sm font-medium text-gray-500 hover:text-red-600">
                    Profil Lembaga
                </Link>
                <Link href="/id/media/galeri" className="text-sm font-medium text-gray-500 hover:text-red-600">
                    Galeri Kegiatan
                </Link>
            </div>
        </div>
    );
}
