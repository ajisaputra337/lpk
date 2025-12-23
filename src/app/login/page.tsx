"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase"; // Pastikan path ke supabase client benar
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Login Gagal: " + error.message);
      } else if (data.session) {
        // --- KUNCINYA DI SINI ---
        // Menggunakan window.location.href agar middleware langsung mendeteksi cookie baru
        window.location.href = "/admin-lpkaishiro";
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-red-600 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
            Admin Login
          </h1>
          <p className="text-slate-500 text-sm mt-1">LPK Aishiro Gakuen Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-red-500 transition-all text-slate-700"
                placeholder="admin@aishiro.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-red-500 transition-all text-slate-700"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-red-100 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "MASUK KE DASHBOARD"
            )}
          </button>
        </form>

        <p className="text-center text-[10px] text-slate-400 mt-8 uppercase tracking-widest">
          Secure Access Only • Aishiro Gakuen System
        </p>
      </div>
    </main>
  );
}