"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabase";
import Image from "next/image";

interface Alumni {
  id: number;
  nama: string;
  img: string | null;
  alamat?: string;
  job?: string;
  perusahaan?: string;
  angkatan?: string;
  tanggalLahir?: string;
}

export default function AdminSuccessStory() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // State Form
  const [formData, setFormData] = useState({
    nama: "",
    angkatan: "",
    job: "",
    perusahaan: "",
    tanggalLahir: "",
    alamat: "",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchAlumni().catch((e) => console.error(e));
  }, []);

  const fetchAlumni = async () => {
    const { data } = await supabase
      .from("success_story")
      .select("*")
      .order("id", { ascending: false });
    if (data) setAlumni(data);
  };

  const handleSimpan = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let publicUrl = editingId ? (alumni.find(a => a.id === editingId)?.img || "") : "";

      // 1. PROSES UPLOAD FOTO (Hanya jika ada file baru)
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          throw new Error("Ukuran foto terlalu besar! Maksimal 2MB bro.");
        }

        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `alumni/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("alumni-photos")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("alumni-photos")
          .getPublicUrl(filePath);
        publicUrl = urlData.publicUrl;
      }

      // 2. SIMPAN KE DATABASE (Update atau Insert)
      const dataToSave = {
        nama: formData.nama,
        angkatan: formData.angkatan,
        job: formData.job,
        perusahaan: formData.perusahaan,
        tanggalLahir: formData.tanggalLahir || new Date().toISOString().split('T')[0],
        alamat: formData.alamat,
        img: publicUrl,
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from("success_story")
          .update(dataToSave)
          .eq("id", editingId);

        if (updateError) throw updateError;
        alert("Data berhasil diperbarui!");
      } else {
        const { error: insertError } = await supabase
          .from("success_story")
          .insert([dataToSave]);

        if (insertError) throw insertError;
        alert("Data berhasil ditambahkan!");
      }

      setShowModal(false);
      setEditingId(null);
      setFormData({ nama: "", angkatan: "", job: "", perusahaan: "", tanggalLahir: "", alamat: "" });
      setFile(null);
      await fetchAlumni();
    } catch (error: any) {
      alert("Waduh Error: " + (error.message ?? "Koneksi bermasalah"));
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item: Alumni) => {
    setEditingId(item.id);
    setFormData({
      nama: item.nama,
      angkatan: item.angkatan || "",
      job: item.job || "",
      perusahaan: item.perusahaan || "",
      tanggalLahir: item.tanggalLahir || "",
      alamat: item.alamat || "",
    });
    setFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id: number, imgUrl: string | null) => {
    if (!confirm("Yakin mau hapus data dan foto ini secara permanen?")) return;

    try {
      // 1. HAPUS FOTO DI STORAGE (Jika ada)
      if (imgUrl) {
        // Ambil path setelah nama bucket
        const pathAfterBucket = imgUrl.split("/alumni-photos/")[1];
        if (pathAfterBucket) {
          const { error: storageError } = await supabase.storage
            .from("alumni-photos")
            .remove([pathAfterBucket]);

          if (storageError) {
            console.error("Storage Error:", storageError.message);
          }
        }
      }

      // 2. HAPUS DATA DI TABEL
      const { error: dbError } = await supabase
        .from("success_story")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      await fetchAlumni();
      alert("Data dan foto berhasil dihapus!");
    } catch (error: any) {
      alert("Gagal hapus: " + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Kelola Alumni Card</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ nama: "", angkatan: "", job: "", perusahaan: "", tanggalLahir: "", alamat: "" });
            setFile(null);
            setShowModal(true);
          }}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-red-200 active:scale-95 text-center"
        >
          + Tambah Alumni
        </button>
      </div>

      {/* DATA LIST (Table desktop, Cards mobile) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Foto</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Nama & Alamat</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Job & Perusahaan</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {alumni.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 border">
                      {item.img ? (
                        <Image src={item.img} alt={item.nama} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[10px] text-gray-400 font-bold">No Img</div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{item.nama}</p>
                    <p className="text-xs text-slate-500">{item.alamat ?? "Alamat belum diisi"}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">{item.job}</span> <br />
                    <span className="text-xs text-slate-500 italic">{item.perusahaan}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-500 hover:text-blue-700 font-bold text-sm bg-blue-50 px-3 py-1 rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.img)}
                        className="text-red-500 hover:text-red-700 font-bold text-sm bg-red-50 px-3 py-1 rounded-lg transition"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden divide-y divide-slate-100">
          {alumni.map((item) => (
            <div key={item.id} className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-gray-200 border shrink-0">
                  {item.img ? (
                    <Image src={item.img} alt={item.nama} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-[10px] text-gray-400 font-bold">No Img</div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{item.nama}</h3>
                  <p className="text-xs text-slate-500">{item.alamat || "Alamat belum diisi"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-50 p-2 rounded-xl">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Pekerjaan</p>
                  <p className="font-semibold text-slate-700">{item.job || "-"}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Angkatan</p>
                  <p className="font-semibold text-slate-700">{item.angkatan || "-"}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-blue-50 text-blue-600 py-3 rounded-xl font-bold text-sm active:scale-95 transition"
                >
                  Edit Data
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.img)}
                  className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl font-bold text-sm active:scale-95 transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[999]">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Data Alumni" : "Tambah Data Alumni"}</h2>
            <form onSubmit={handleSimpan} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input
                    className="w-full border p-2 rounded-lg text-sm"
                    placeholder="Budi"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Tgl Lahir</label>
                  <input
                    type="date"
                    className="w-full border p-2 rounded-lg text-sm"
                    value={formData.tanggalLahir}
                    onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Alamat Asal</label>
                <input
                  className="w-full border p-2 rounded-lg text-sm"
                  placeholder="Semarang, Jawa Tengah"
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Angkatan</label>
                  <input
                    className="w-full border p-2 rounded-lg text-sm"
                    placeholder="Angkatan 2"
                    value={formData.angkatan}
                    onChange={(e) => setFormData({ ...formData, angkatan: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Job</label>
                  <input
                    className="w-full border p-2 rounded-lg text-sm"
                    placeholder="Kaigo"
                    value={formData.job}
                    onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Perusahaan di Jepang</label>
                <input
                  className="w-full border p-2 rounded-lg text-sm"
                  placeholder="Yamaha Japan"
                  value={formData.perusahaan}
                  onChange={(e) => setFormData({ ...formData, perusahaan: e.target.value })}
                />
              </div>

              <div className="border-2 border-dashed p-4 rounded-lg text-center bg-slate-50">
                <p className="text-[10px] text-slate-400 mb-2 uppercase font-bold text-left">Upload Foto (Max 2MB):</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="text-xs w-full cursor-pointer"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 transition"
                >
                  {uploading ? "Sedang Proses..." : "Simpan Data"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}