"use client";

import { useState } from "react";
import ChatArea from "@/components/ChatArea";
import Sidebar from "@/components/Sidebar";
import EvalMetricsDialog from "@/components/EvalMetricsDialog";

export interface Message {
  sender: "user" | "bot";
  text: string;
  question?: string;
}

export interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const [evalOpen, setEvalOpen] = useState(false);
  const [evalLoading, setEvalLoading] = useState(false);
  const [evalMetrics, setEvalMetrics] = useState(null);

  const activeChat = activeChatId
    ? chats.find((chat) => chat.id === activeChatId)
    : undefined;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message }),
      });

      const data = await response.json();

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id !== chatId) return chat;
          return {
            ...chat,
            messages: [
              ...chat.messages,
              { sender: "bot" as const, text: data.answer ?? "Tidak ada respon.", question: message },
            ],
          };
        })
      );
    } catch (error) {
      console.error(error);
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id !== chatId) return chat;
          return {
            ...chat,
            messages: [
              ...chat.messages,
              { sender: "bot" as const, text: "Terjadi kesalahan.", question: message },
            ],
          };
        })
      );
    } finally {
      setIsThinking(false);
    }
  };

  const handleEvaluate = async (question: string, answer: string) => {
    setEvalLoading(true);
    setEvalOpen(true);
    setEvalMetrics(null);

    try {
      const response = await fetch(`${API_URL}/evaluate/rag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });

      const data = await response.json();
      setEvalMetrics(data.metrics);
    } catch {
      setEvalMetrics(null);
    } finally {
      setEvalLoading(false);
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
    <main className="flex h-dvh overflow-hidden bg-chat-bg">
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
        messages={activeChat?.messages || []}
        onSend={sendMessage}
        isThinking={isThinking}
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
        onEvaluate={handleEvaluate}
      />

      <EvalMetricsDialog
        open={evalOpen}
        onOpenChange={setEvalOpen}
        metrics={evalMetrics}
        loading={evalLoading}
      />
    </main>
  );
}