"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Users, Images, HardDrive } from "lucide-react";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalAlumni: 0,
    totalMedia: 0,
  });
  const [storageUsage, setStorageUsage] = useState(0); // Dalam MB
  const MAX_STORAGE = 1024; // Limit 1GB Supabase

  useEffect(() => {
    async function getStats() {
      // 1. Hitung total alumni
      const { count: alumniCount } = await supabase
        .from("success_story")
        .select("*", { count: "exact", head: true });

      // 2. Hitung total media
      const { count: mediaCount } = await supabase
        .from("media_gallery")
        .select("*", { count: "exact", head: true });

      setStats({
        totalAlumni: alumniCount ?? 0,
        totalMedia: mediaCount ?? 0,
      });

      // 3. Hitung Estimasi Storage (dari bucket alumni-photos)
      const folders = ["gallery", "alumni", ""];
      let totalBytes = 0;

      for (const folder of folders) {
        const { data: files, error: storageError } = await supabase.storage
          .from("alumni-photos")
          .list(folder, { limit: 100 });

        if (!storageError && files) {
          totalBytes += files.reduce((acc, file) => acc + (file.metadata?.size || 0), 0);
        }
      }

      const totalMB = totalBytes / (1024 * 1024);
      setStorageUsage(totalMB);
    }

    getStats().catch((error) => console.error("Error fetching stats:", error));
  }, []);

  // Hitung persentase storage
  const storagePercentage = Math.min((storageUsage / MAX_STORAGE) * 100, 100);

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Alumni */}
        <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Alumni</h3>
            <Users className="text-red-600 h-5 w-5" />
          </div>
          <p className="text-5xl font-black text-slate-900">{stats.totalAlumni}</p>
          <p className="text-xs text-slate-400 mt-2 italic">Siswa yang sudah terbang ke Jepang</p>
        </div>

        {/* Card Galeri */}
        <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Galeri Foto</h3>
            <Images className="text-blue-600 h-5 w-5" />
          </div>
          <p className="text-5xl font-black text-slate-900">{stats.totalMedia}</p>
          <p className="text-xs text-slate-400 mt-2 italic">Total dokumentasi kegiatan</p>
        </div>

        {/* Card Storage Usage (Paling Penting buat Pantau Gratisan) */}
        <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Storage (Limit 1GB)</h3>
            <HardDrive className={`${storagePercentage > 80 ? 'text-red-600 animate-pulse' : 'text-green-600'} h-5 w-5`} />
          </div>

          <div className="flex items-baseline gap-1">
            <p className="text-4xl font-black text-slate-900">{storageUsage.toFixed(1)}</p>
            <p className="text-slate-400 font-bold">MB</p>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${storagePercentage > 80 ? 'bg-red-600' : 'bg-green-500'}`}
                style={{ width: `${storagePercentage}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 font-medium">
              {storagePercentage.toFixed(1)}% terpakai di bucket alumni-photos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}