import { useEffect, useRef } from "react";
import { Message } from "@/app/page";
import ChatBubble from "./ChatBubble";
import SuggestionChips from "./SuggestionChips";
import ChatInput from "./ChatInput";

interface Props {
  messages: Message[];
  onSend: (message: string) => void;
}

export default function ChatArea({
  messages,
  onSend,
}: Props) {
    const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <div className="flex flex-col h-screen flex-1 bg-[#F7F8FC]">

      {/* HEADER MOBILE */}
      <div className="md:hidden h-16 bg-white border-b flex items-center justify-between px-4 shrink-0">
        <button className="text-2xl">☰</button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
            N
          </div>

          <span className="font-bold text-blue-700 text-xl">
            NutriAI
          </span>
        </div>

        <div className="w-6" />
      </div>

      {/* HEADER DESKTOP */}
      <div className="hidden md:flex h-20 bg-white border-b items-center justify-between px-12 shrink-0">
        <h1 className="text-4xl font-bold text-blue-700">
          NutriAI
        </h1>

        <div className="flex items-center gap-8">
          <span>🔍</span>
          <span>👤</span>
          <span>⚙️</span>
        </div>
      </div>

      {/* CHAT SCROLL */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">

        <div className="max-w-5xl mx-auto px-4 md:px-10 py-6">

          {messages.length > 0 && (
            <div className="flex justify-center mb-6">
              <span className="bg-gray-200 text-xs text-gray-600 px-4 py-1 rounded-full">
                Today
              </span>
            </div>
          )}

          <div className="space-y-6">
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                sender={message.sender}
                text={message.text}
              />
            ))}
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="shrink-0 border-t bg-white">

        <div className="max-w-5xl mx-auto p-4">

          <SuggestionChips
            onSend={onSend}
          />

          <ChatInput
            onSend={onSend}
          />

        </div>

      </div>

    </div>
  );
}