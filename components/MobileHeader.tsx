import { Menu } from "lucide-react";

export default function MobileHeader() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4">
      <button>
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
          N
        </div>

        <span className="font-bold text-blue-600 text-xl">
          NutriAI
        </span>
      </div>

      <div className="w-6" />
    </header>
  );
}