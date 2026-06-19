"use client";

import { Chat } from "@/app/page";

interface Props {
  chats: Chat[];
  activeChatId: number;
  onSelectChat: (id: number) => void;
  onNewChat: () => void;
}

export default function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
}: Props) {
  return (
    <aside className="w-72 bg-white border-r flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600">
          NutriAI
        </h1>

        <button
          onClick={onNewChat}
          className="mt-4 w-full bg-green-500 text-white py-3 rounded-lg"
        >
          + New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full text-left p-3 rounded-lg mb-2 ${
              activeChatId === chat.id
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
          >
            {chat.title}
          </button>
        ))}
      </div>
    </aside>
  );
}