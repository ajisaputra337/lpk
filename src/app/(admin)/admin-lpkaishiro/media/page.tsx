"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { supabase } from "../../../../lib/supabase";
import { Trash2, Image as ImageIcon, ChevronLeft, ChevronRight, Languages, Plus, Pencil, X } from "lucide-react";
import { translateContent } from "../../../actions";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), { ssr: false });

export default function MediaPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const quillRef = useRef<any>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const stripHtml = (html: string) => {
    if (!html) return "";
    // Ganti tag dengan spasi + decode entities
    return html
      .replace(/<[^>]*>?/gm, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  };

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

  const editItem = (item: any) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setFile(null);
  };

  // Custom Image Handler for Quill
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      setLoading(true);
      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `gallery/details/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("alumni-photos")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl: newUrl } } = supabase.storage
          .from("alumni-photos")
          .getPublicUrl(filePath);

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", newUrl);
      } catch (err: any) {
        alert("Gagal upload gambar ke editor: " + err.message);
      } finally {
        setLoading(false);
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert("Isi judul terlebih dahulu!");
    if (!editingId && !file) return alert("Pilih foto terlebih dahulu!");

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

      const dataToSave: any = {
        title,
        description,
        ...(translated.title_en && { title_en: translated.title_en }),
        ...(translated.title_jp && { title_jp: translated.title_jp }),
        ...(translated.description_en && { description_en: translated.description_en }),
        ...(translated.description_jp && { description_jp: translated.description_jp })
      };

      if (editingId) {
        // Jika ada foto baru, kita hapus foto lama dari storage biar gak numpuk
        if (publicUrl) {
          const oldItem = mediaList.find(m => m.id === editingId);
          if (oldItem?.image_url) {
            const oldPath = oldItem.image_url.split('/alumni-photos/')[1];
            if (oldPath) {
              await supabase.storage.from("alumni-photos").remove([oldPath]);
            }
          }
          dataToSave.image_url = publicUrl;
        }

        const { error: updateError } = await supabase
          .from("media_gallery")
          .update(dataToSave)
          .eq("id", editingId);

        if (updateError) throw updateError;
        alert("Data berhasil diperbarui!");
      } else {
        dataToSave.image_url = publicUrl;
        const { error: insertError } = await supabase
          .from("media_gallery")
          .insert([dataToSave]);

        if (insertError) throw insertError;
        alert("Foto & Deskripsi berhasil diupload!");
      }

      setTitle("");
      setDescription("");
      setFile(null);
      setEditingId(null);
      fetchMedia();
    } catch (error: any) {
      console.error("SUBMIT ERROR:", error);
      alert("Error: " + (error.message || "Gagal menyimpan data. Cek koneksi atau coba lagi."));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    const confirmDelete = confirm("Yakin ingin menghapus foto ini dari galeri?");
    if (!confirmDelete) return;

    try {
      // Cari data lengkap untuk ambil deskripsi (buat hapus foto dalemnya)
      const itemToDelete = mediaList.find(m => m.id === id);

      // 1. Hapus data dari Database
      const { error: dbError } = await supabase
        .from("media_gallery")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      // 2. Kumpulkan semua path file yang perlu dihapus
      const filesToDelete: string[] = [];

      // Path Cover
      const coverPath = imageUrl.split('/alumni-photos/')[1];
      if (coverPath) filesToDelete.push(coverPath);

      // Path hfoto-foto di dalam deskripsi (Rich Text)
      const extractPaths = (html: string) => {
        const paths: string[] = [];
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        let match;
        while ((match = imgRegex.exec(html)) !== null) {
          const path = match[1].split('/alumni-photos/')[1];
          if (path) paths.push(path);
        }
        return paths;
      };

      if (itemToDelete) {
        const descPaths = [
          ...extractPaths(itemToDelete.description || ""),
          ...extractPaths(itemToDelete.description_en || ""),
          ...extractPaths(itemToDelete.description_jp || ""),
        ];
        // Hilangkan duplikat
        const uniqueDescPaths = Array.from(new Set(descPaths));
        filesToDelete.push(...uniqueDescPaths);
      }

      // 3. Hapus semua file dari Storage
      if (filesToDelete.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("alumni-photos")
          .remove(filesToDelete);
        if (storageError) console.error("Storage cleanup error:", storageError);
      }

      alert("Data & Semua Foto berhasil dihapus!");
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
          {editingId ? "Edit Cerita Galeri" : "Tambah Foto & Cerita Baru"}
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
                <label className="block text-sm font-bold mb-2 text-slate-600">
                  {editingId ? "Ganti Foto (Kosongkan jika tetap)" : "File Foto (Sebagai foto Utama/Cover pada gallery)"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-sm file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition cursor-pointer"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
                <RichTextEditor
                  value={description}
                  onChange={setDescription}
                  modules={modules}
                  ref={quillRef}
                  className="h-[300px] mb-12"
                  placeholder="Isi Deskripsi..."
                />
              </div>
            </div>
          </div>

          <style jsx global>{`
            .ql-editor img {
              max-width: 300px;
              height: auto;
              border-radius: 12px;
              margin: 10px 0;
              display: block;
            }
            .ql-editor {
              min-height: 300px;
              font-size: 16px;
            }
          `}</style>

          <div className="flex gap-3">
            <button
              disabled={loading}
              className={`flex-1 ${editingId ? 'bg-orange-600 hover:bg-orange-700' : 'bg-red-600 hover:bg-red-700'} text-white py-4 rounded-2xl font-black transition-all shadow-lg disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>PROSES...</>
              ) : (
                <>{editingId ? "SIMPAN PERUBAHAN" : "PUBLIKASIKAN KE WEB UTAMA"}</>
              )}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-8 bg-slate-100 hover:bg-slate-200 text-slate-600 py-4 rounded-2xl font-bold transition-all active:scale-95 flex items-center gap-2"
              >
                <X size={20} /> BATAL
              </button>
            )}
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
                onClick={() => editItem(item)}
                className="bg-white/90 backdrop-blur-sm text-orange-600 p-3 rounded-2xl shadow-xl hover:bg-orange-600 hover:text-white transition"
                title="Edit"
              >
                <Pencil size={20} />
              </button>
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
                {stripHtml(item.description) || "Tidak ada deskripsi."}
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