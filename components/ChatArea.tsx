"use client";

import { Message } from "@/app/page";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

interface Props {
  messages: Message[];
  onSend: (message: string) => void;
}

export default function ChatArea({
  messages,
  onSend,
}: Props) {
  return (
    <section className="flex-1 flex flex-col">
      <header className="h-16 bg-white border-b flex items-center px-8">
        <h2 className="text-xl font-bold">
          NutriAI Assistant
        </h2>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            Mulai percakapan baru 🚀
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble
              key={index}
              sender={message.sender}
              text={message.text}
            />
          ))
        )}
      </div>

      <ChatInput onSend={onSend} />
    </section>
  );
}