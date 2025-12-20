"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalAlumni: 0,
    totalMedia: 0,
  });

  useEffect(() => {
    async function getStats() {
      // Hitung total alumni dari tabel success_story
      const { count: alumniCount } = await supabase
        .from("success_story")
        .select("*", { count: "exact", head: true });

      // Hitung total media dari tabel media_gallery
      const { count: mediaCount } = await supabase
        .from("media_gallery")
        .select("*", { count: "exact", head: true });

      setStats({
        totalAlumni: alumniCount || 0,
        totalMedia: mediaCount || 0,
      });
    }
    getStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-slate-500 text-sm font-bold uppercase">Total Alumni Sukses</h3>
        <p className="text-4xl font-black text-red-600">{stats.totalAlumni}</p>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-slate-500 text-sm font-bold uppercase">Total Galeri Foto</h3>
        <p className="text-4xl font-black text-blue-600">{stats.totalMedia}</p>
      </div>
    </div>
  );
}