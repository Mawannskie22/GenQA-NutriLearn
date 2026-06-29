"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Leaf,
  Flame,
  BarChart3,
  Heart,
  MessageCircleMore,
  Shield,
  Drumstick,
  Apple,
} from "lucide-react";

const sampleQuestions = [
  { icon: Flame, color: "#F97316", label: "Berapa kalori\nnasi goreng?" },
  {
    icon: Drumstick,
    color: "#2563EB",
    label: "Berapa protein\ndada ayam 100 gram?",
  },
  { icon: Leaf, color: "#2563EB", label: "Apa manfaat\nbrokoli?" },
  { icon: Apple, color: "#2563EB", label: "Makanan yang\ntinggi vitamin C?" },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center bg-white px-4 py-8 md:py-12">
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto gap-8 md:gap-10">
        {/* ── HERO ── */}
        <section className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
          {/* blob */}
          <div className="absolute w-60 h-60 md:w-68 md:h-68 rounded-full bg-[#DBEAFE] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* floating icons */}
          <div className="absolute -top-1 left-4 size-10 flex items-center justify-center rounded-full border border-blue-200 bg-white">
            <Leaf size={18} className="text-[#2563EB]" />
          </div>
          <div className="absolute -top-1 right-4 size-10 flex items-center justify-center rounded-full border border-blue-200 bg-white">
            <Flame size={18} className="text-[#F97316]" />
          </div>
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 size-10 flex items-center justify-center rounded-full border border-blue-200 bg-white">
            <BarChart3 size={18} className="text-[#2563EB]" />
          </div>
          <div className="absolute top-1/2 -right-6 -translate-y-1/2 size-10 flex items-center justify-center rounded-full border border-blue-200 bg-white">
            <Heart size={18} className="text-[#2563EB]" />
          </div>

          {/* salad bowl image */}
          <Image
            src="/hero-illustration.png"
            alt="Ilustrasi mangkuk salad NutriLearn"
            width={240}
            height={240}
            className="w-52 h-52 md:w-60 md:h-60 relative z-10 object-contain"
            priority
          />
        </section>

        {/* ── HEADING ── */}
        <section className="text-center space-y-1 md:space-y-2">
          <p className="text-lg md:text-xl text-gray-700">Selamat Datang di</p>
          <h1 className="text-[40px] md:text-5xl font-extrabold text-[#2563EB] leading-tight inline-flex items-center gap-1.5">
            NutriLearn
            <Leaf size={24} className="text-[#2563EB] -mt-3" />
          </h1>
          <p className="text-sm md:text-[15px] text-[#6B7280] leading-relaxed max-w-md mx-auto">
            Asisten virtual yang membantu Anda mendapatkan
            <br />
            informasi nutrisi makanan berdasarkan data terpercaya.
          </p>
        </section>

        {/* ── CTA ── */}
        <button
          onClick={() => router.push("/chat")}
          className="inline-flex items-center gap-2.5 bg-[#2563EB] text-white font-bold text-base px-8 py-3.5 rounded-full shadow-lg shadow-blue-900/20 hover:bg-[#1D4ED8] transition-colors cursor-pointer"
        >
          <MessageCircleMore size={20} />
          Chat Sekarang
        </button>

        {/* ── SAMPLE QUESTIONS ── */}
        <section className="w-full space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-[#9CA3AF] font-medium shrink-0">
              Contoh pertanyaan
            </span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sampleQuestions.map((q, i) => {
              const Icon = q.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white border border-[#E5E7EB] rounded-xl p-3 min-h-[72px]"
                >
                  <div className="shrink-0 mt-0.5">
                    <Icon size={20} color={q.color} />
                  </div>
                  <p className="text-sm text-[#374151] leading-tight whitespace-pre-line">
                    {q.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── DISCLAIMER ── */}
        <footer className="flex items-start gap-1.5 max-w-sm text-center">
          <Shield size={14} className="text-[#9CA3AF] shrink-0 mt-0.5" />
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            Informasi yang diberikan bersifat edukatif dan tidak menggantikan
            konsultasi dengan tenaga kesehatan profesional.
          </p>
        </footer>
      </div>
    </main>
  );
}
