"use client";

import { useState } from "react";
import ChatArea from "@/components/ChatArea";
import Sidebar from "@/components/Sidebar";

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
  const [chats, setChats] = useState<Chat[]>([]);

  const [activeChatId, setActiveChatId] =
    useState<number | null>(null);

  const [isThinking, setIsThinking] = useState(false);

  const activeChat = activeChatId
    ? chats.find((chat) => chat.id === activeChatId)
    : undefined;

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    let chatId = activeChatId;

    if (chatId === null) {
      chatId = Date.now();
      const newChat: Chat = { id: chatId, title: message.slice(0, 30) || "New Chat", messages: [] };
      setChats((prev) => [...prev, newChat]);
      setActiveChatId(chatId);
    }

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id !== chatId) return chat;
        return { ...chat, messages: [...chat.messages, { sender: "user" as const, text: message }] };
      })
    );

    setIsThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id !== chatId) return chat;
          return { ...chat, messages: [...chat.messages, { sender: "bot" as const, text: data.reply ?? "Tidak ada respon." }] };
        })
      );
    } catch (error) {
      console.error(error);

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id !== chatId) return chat;
          return { ...chat, messages: [...chat.messages, { sender: "bot" as const, text: "Terjadi kesalahan." }] };
        })
      );
    } finally {
      setIsThinking(false);
    }
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [
      ...prev,
      newChat,
    ]);

    setActiveChatId(newChat.id);
  };

  const handleRenameChat = (id: number, newTitle: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, title: newTitle } : chat
      )
    );
  };

  const handleDeleteChat = (id: number) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
    }
  };

  return (
    <main className="flex h-screen overflow-hidden bg-[#F7F8FC]">
      <div className="hidden md:flex">
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
          onNewChat={handleNewChat}
          onRenameChat={handleRenameChat}
          onDeleteChat={handleDeleteChat}
        />
      </div>

      <ChatArea
        messages={
          activeChat?.messages ||
          []
        }
        onSend={sendMessage}
        isThinking={isThinking}
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
      />
    </main>
  );
}