"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl"; // Tambah useLocale
import { MessageCircle, X, Send, Bot } from "lucide-react";
// IMPORT SERVER ACTION TADI
import { chatWithAishi } from "../../app/actions"; 

export default function FloatingChat() {
  const t = useTranslations("Chat");
  const locale = useLocale(); // Ambil bahasa aktif (id, jp, atau en)
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Pesan awal diambil dari JSON
  const [messages, setMessages] = useState([
    { role: "ai", text: t("welcome") }
  ]);
  
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (pathname.includes("/admin") || pathname.includes("/login")) return null;

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      // PANGGIL SERVER ACTION
      // Tips: Kirim locale ke AI biar dia tau harus jawab pake bahasa apa
      const response = await chatWithAishi(userMsg + ` (respond in ${locale} language)`);

      if (response.success) {
        setMessages((prev) => [...prev, { role: "ai", text: response.message }]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", text: response.message }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: t("error") }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl transition-all active:scale-95 flex items-center justify-center border-2 border-white"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[380px] h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-red-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full"><Bot size={20} /></div>
              <div>
                <p className="text-sm font-bold leading-tight">Aishi AI Support</p>
                <p className="text-[10px] opacity-80">{t("status")}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={18}/></button>
          </div>

          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                  msg.role === "user" ? "bg-red-600 text-white rounded-tr-none" : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <p className="text-xs text-slate-400 animate-pulse ml-2 flex items-center gap-1">
                <Bot size={12}/> {t("typing")}
              </p>
            )}
          </div>

          <form onSubmit={handleChat} className="p-4 bg-white border-t flex gap-2">
            <input
              type="text"
              className="flex-1 bg-slate-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder={t("placeholder")}
            />
            <button disabled={loading || !input.trim()} className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 disabled:opacity-50">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}