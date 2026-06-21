"use client";

import { useState } from "react";
import { Plus, Send } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  disabled,
}: Props) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div className="bg-white border rounded-full flex items-center px-2 md:px-4 py-1.5 md:py-3 shadow-sm">
      <button>
        <Plus size={18} className="md:size-[24px]" />
      </button>

      <input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled) {
            handleSend();
          }
        }}
        placeholder="Apa yang ingin kamu tanyakan?"
        className="flex-1 px-1 md:px-3 text-sm md:text-base outline-none placeholder:text-xs md:placeholder:text-sm disabled:opacity-50"
      />

      <button
        disabled={disabled}
        onClick={handleSend}
        className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-blue-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={14} className="md:size-[18px]" />
      </button>
    </div>
  );
}