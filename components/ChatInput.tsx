"use client";

import { useState } from "react";
import { Plus, Send } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
}

export default function ChatInput({
  onSend,
}: Props) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div className="bg-white border rounded-full flex items-center px-4 py-3 shadow-sm">
      <button>
        <Plus size={24} />
      </button>

      <input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        placeholder="Apa yang ingin kamu tanyakan?"
        className="flex-1 px-3 outline-none"
      />

      <button
        onClick={handleSend}
        className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center"
      >
        <Send size={18} />
      </button>
    </div>
  );
}