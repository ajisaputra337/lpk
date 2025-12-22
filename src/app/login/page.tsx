"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Pastikan komponen sudah mount di client untuk menghindari mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Proses Login ke Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Gagal Login: " + error.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        // 2. Jika berhasil, paksa browser refresh total ke halaman admin
        // window.location.href lebih ampuh daripada router.push untuk urusan middleware/cookies
        alert("Login Berhasil! Mengarahkan ke Dashboard...");
        window.location.href = "/admin-lpkaishiro";
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem.");
      setLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-800">LPK AISHIRO</h1>
          <p className="text-slate-500 text-sm mt-2">Admin Panel Authentication</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email Admin</label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 active:scale-95 transition disabled:opacity-50 disabled:active:scale-100 mt-4 shadow-lg shadow-red-200"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                MENGECEK...
              </span>
            ) : (
              "MASUK KE DASHBOARD"
            )}
          </button>
        </form>

        <p className="text-center text-slate-400 text-xs mt-8">
          &copy; {new Date().getFullYear()} LPK Aishiro Admin System
        </p>
      </div>
    </div>
  );
}