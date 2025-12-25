"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabase";
import { Trash2, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";

export default function MediaPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchMedia = async () => {
    const { data, error } = await supabase
      .from("media_gallery")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setMediaList(data);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi sederhana
    if (!title) return alert("Isi judul kegiatan dulu bro!");
    if (!file) return alert("Pilih foto dulu bro!");

    setLoading(true);
    try {
      // 1. PROSES UPLOAD FOTO KE STORAGE
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("alumni-photos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. AMBIL PUBLIC URL
      const { data: { publicUrl } } = supabase.storage
        .from("alumni-photos")
        .getPublicUrl(filePath);

      // 3. SIMPAN DATA KE DATABASE (INSERT ONLY)
      const { error: insertError } = await supabase
        .from("media_gallery")
        .insert([{ 
            title, 
            description, 
            image_url: publicUrl 
        }]);

      if (insertError) throw insertError;

      alert("Foto & Cerita berhasil dipublikasikan!");
      
      // Reset Form
      setTitle("");
      setDescription("");
      setFile(null);
      
      // Refresh Data
      fetchMedia();
      
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    const confirmDelete = confirm("Yakin mau hapus foto ini dari galeri?");
    if (!confirmDelete) return;

    try {
      // 1. Hapus file dari Storage dulu
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from("alumni-photos")
          .remove([`gallery/${fileName}`]);
      }

      // 2. Hapus data dari Database
      const { error: dbError } = await supabase
        .from("media_gallery")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      alert("Foto berhasil dihapus!");
      fetchMedia();
    } catch (err: any) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  // Logika Pagination
  const totalPages = Math.ceil(mediaList.length / itemsPerPage);
  const currentMedia = mediaList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-black mb-8 text-slate-800 flex items-center gap-3">
        <ImageIcon className="text-red-600" /> MANAGEMENT GALERI
      </h1>

      {/* FORM UPLOAD */}
      <div className="bg-white p-4 md:p-6 rounded-3xl shadow-xl shadow-slate-200/50 mb-10 border border-slate-100">
        <h2 className="text-xl font-bold mb-6 text-slate-700">Tambah Foto & Cerita Baru</h2>
        <form onSubmit={handleUpload} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-600">Judul Kegiatan</label>
                <input
                  type="text"
                  className="w-full border border-slate-200 p-3 rounded-2xl outline-none focus:ring-2 focus:ring-red-500 transition"
                  placeholder="Misal: Sesi Belajar N3 Batch Oktober"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-600">File Foto</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-sm file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition cursor-pointer"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-600">Deskripsi / Penjelasan</label>
              <textarea
                className="w-full border border-slate-200 p-3 rounded-2xl outline-none focus:ring-2 focus:ring-red-500 h-[130px] resize-none transition"
                placeholder="Tulis cerita singkat kegiatan di sini..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black transition-all shadow-lg disabled:opacity-50 active:scale-95 uppercase tracking-wider"
          >
            {loading ? "SEDANG MENGUPLOAD..." : "PUBLIKASIKAN KE WEB UTAMA"}
          </button>
        </form>
      </div>

      {/* LIST PREVIEW */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Foto Terpublikasi</h2>
        <span className="bg-slate-100 text-slate-500 px-4 py-1 rounded-full text-sm font-bold">
          {mediaList.length} Items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentMedia.map((item) => (
          <div key={item.id} className="group bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden relative">
            
            {/* TOMBOL HAPUS */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all z-10">
              <button
                onClick={() => handleDelete(item.id, item.image_url)}
                className="bg-white/90 backdrop-blur-sm text-red-600 p-3 rounded-2xl shadow-xl hover:bg-red-600 hover:text-white transition"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="relative h-48 w-full">
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
            </div>

            <div className="p-5">
              <h3 className="font-black text-slate-800 uppercase text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {item.description || "Tidak ada deskripsi."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-between py-6 border-t border-slate-100">
          <button
            onClick={() => {
                setCurrentPage(p => Math.max(p - 1, 1));
                window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-5 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold disabled:opacity-30"
          >
            <ChevronLeft size={18} /> Prev
          </button>

          <div className="text-sm font-bold text-slate-400">
            Halaman {currentPage} dari {totalPages}
          </div>

          <button
            onClick={() => {
                setCurrentPage(p => Math.min(p + 1, totalPages));
                window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-5 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold disabled:opacity-30"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}