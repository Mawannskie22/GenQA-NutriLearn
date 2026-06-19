"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";

export interface Message {
  sender: "user" | "bot";
  text: string;
}

export interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: "Chat 1",
      messages: [],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState(1);

  const activeChat = chats.find(
    (chat) => chat.id === activeChatId
  );

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `Chat ${chats.length + 1}`,
      messages: [],
    };

    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    const updatedChats = chats.map((chat) => {
      if (chat.id !== activeChatId) return chat;

      return {
        ...chat,
        messages: [
          ...chat.messages,
          {
            sender: "user",
            text: message,
          },
          {
            sender: "bot",
            text: `${message}`,
          },
        ],
      };
    });

    setChats(updatedChats);
  };

  return (
    <main className="flex h-screen bg-gray-100">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
      />

      <ChatArea
        messages={activeChat?.messages || []}
        onSend={handleSendMessage}
      />
    </main>
  );
}