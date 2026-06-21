"use client";

import { Menu } from "lucide-react";

interface Props {
  onToggleDrawer: () => void;
}

export default function MobileHeader({ onToggleDrawer }: Props) {
  return (
    <div className="md:hidden h-12 bg-white border-b flex items-center justify-between px-4 shrink-0">
      <button onClick={onToggleDrawer}>
        <Menu size={22} />
      </button>

      <span className="font-bold text-blue-700 text-lg">
        NutriAI
      </span>
    </div>
  );
}
