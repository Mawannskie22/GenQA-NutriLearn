import type { Metadata } from "next";
import { Carlito } from "next/font/google";
import "./globals.css";

const carlito = Carlito({
  variable: "--font-calibri",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: { default: "NutriAI", template: "%s | NutriAI" },
  description:
    "AI Nutrition Assistant — Tanya tentang gizi, BMI, protein, dan pola makan sehat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${carlito.variable} h-full antialiased`}>
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
