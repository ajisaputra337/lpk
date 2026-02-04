"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabase";
import { Trash2, Image as ImageIcon, ChevronLeft, ChevronRight, Languages } from "lucide-react";
import { translateContent } from "../../../actions";

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
    if (!title) return alert("Isi judul terlebih dahulu!");
    if (!file) return alert("Pilih foto terlebih dahulu!");

    setLoading(true);
    try {
      let publicUrl = "";

      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("alumni-photos")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl: newUrl } } = supabase.storage
          .from("alumni-photos")
          .getPublicUrl(filePath);

        publicUrl = newUrl;
      }

      // 1.5 OTOMATIS TRANSLATE
      let translated = { title_en: "", title_jp: "", description_en: "", description_jp: "" };
      try {
        const transResult = await translateContent({ title, description });
        if (transResult.success) {
          translated = transResult.data;
        }
      } catch (e) {
        console.error("Translation fail:", e);
      }

      const { error: insertError } = await supabase
        .from("media_gallery")
        .insert([{
          title,
          description,
          image_url: publicUrl,
          title_en: translated.title_en,
          title_jp: translated.title_jp,
          description_en: translated.description_en,
          description_jp: translated.description_jp
        }]);

      if (insertError) throw insertError;
      alert("Foto & Deskripsi berhasil diupload!");

      setTitle("");
      setDescription("");
      setFile(null);
      fetchMedia();
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    const confirmDelete = confirm("Yakin ingin menghapus foto ini dari galeri?");
    if (!confirmDelete) return;

    try {
      // 1. Hapus data dari Database
      const { error: dbError } = await supabase
        .from("media_gallery")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      // 2. Hapus file dari Storage (Opsional tapi disarankan)
      // Mengambil nama file dari URL publik
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from("alumni-photos")
          .remove([`gallery/${fileName}`]);
      }

      alert("Foto berhasil dihapus!");
      fetchMedia();
    } catch (err: any) {
      alert("Gagal menghapus: " + err.message);
    }
  };

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
        <h2 className="text-xl font-bold mb-6 text-slate-700">
          Tambah Foto & Cerita Baru
        </h2>
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
              <label className="block text-sm font-bold mb-2 text-slate-600">Deskripsi / Penjelasan Cerita</label>
              <textarea
                className="w-full border border-slate-200 p-3 rounded-2xl outline-none focus:ring-2 focus:ring-red-500 h-[130px] resize-none transition"
                placeholder="Tulis cerita singkat atau detail kegiatan di sini agar pengunjung web bisa membacanya..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black transition-all shadow-lg disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>PROSES...</>
              ) : (
                <>
                  PUBLIKASIKAN KE WEB UTAMA
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* LIST PREVIEW */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Foto Terpublikasi</h2>
        <span className="bg-slate-100 text-slate-500 px-4 py-1 rounded-full text-sm font-bold">
          {mediaList.length} Items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {currentMedia.map((item) => (
          <div key={item.id} className="group bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden relative hover:shadow-2xl transition-all duration-300">

            {/* TOMBOL AKSI */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-10">
              <button
                onClick={() => handleDelete(item.id, item.image_url)}
                className="bg-white/90 backdrop-blur-sm text-red-600 p-3 rounded-2xl shadow-xl hover:bg-red-600 hover:text-white transition"
                title="Hapus"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="relative h-48 w-full overflow-hidden">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>

            <div className="p-5">
              <h3 className="font-black text-slate-800 line-clamp-1 uppercase text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {item.description || "Tidak ada deskripsi."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="mt-10 mb-6 flex items-center justify-between gap-4 py-6 border-t border-slate-100">
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md active:scale-95"
          >
            <ChevronLeft size={20} /> Prev
          </button>

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className={`min-w-[44px] h-11 rounded-2xl font-bold text-sm transition ${currentPage === page
                  ? "bg-red-600 text-white shadow-lg shadow-red-200"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md active:scale-95"
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}