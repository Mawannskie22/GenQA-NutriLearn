"use client";

import { useState, useRef } from "react";
import { Chat } from "@/lib/types";
import ChatArea from "@/components/ChatArea";
import Sidebar from "@/components/Sidebar";
import EvalMetricsDialog from "@/components/EvalMetricsDialog";

export default function HomePage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const sessionMap = useRef<Record<number, string>>({});
  const abortRef = useRef<AbortController | null>(null);

  const [evalOpen, setEvalOpen] = useState(false);
  const [evalLoading, setEvalLoading] = useState(false);
  const [evalMetrics, setEvalMetrics] = useState(null);

  const activeChat = activeChatId
    ? chats.find((chat) => chat.id === activeChatId)
    : undefined;

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    let chatId = activeChatId;

    if (chatId === null) {
      chatId = Date.now();
      sessionMap.current[chatId] = crypto.randomUUID();
      const newChat: Chat = {
        id: chatId,
        title: message.slice(0, 30) || "New Chat",
        messages: [],
      };
      setChats((prev) => [...prev, newChat]);
      setActiveChatId(chatId);
    }

    const sessionId = sessionMap.current[chatId];

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id !== chatId) return chat;
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { sender: "user" as const, text: message },
          ],
        };
      })
    );

    setIsThinking(true);
    let botText = "";

    abortRef.current = new AbortController();
    const timeoutId = setTimeout(() => abortRef.current?.abort(), 120000);

    try {
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: message,
          session_id: sessionId,
        }),
        signal: abortRef.current.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        botText = errData?.detail || `Error ${response.status}`;
        setChats((prevChats) =>
          prevChats.map((chat) => {
            if (chat.id !== chatId) return chat;
            return {
              ...chat,
              messages: [
                ...chat.messages,
                { sender: "bot" as const, text: botText, question: message },
              ],
            };
          })
        );
        setIsThinking(false);
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        setChats((prevChats) =>
          prevChats.map((chat) => {
            if (chat.id !== chatId) return chat;
            return {
              ...chat,
              messages: [
                ...chat.messages,
                { sender: "bot" as const, text: "", question: message },
              ],
            };
          })
        );

        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n");
          buffer = parts.pop() || "";

          for (const line of parts) {
            if (!line.startsWith("data: ")) continue;
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === "token") {
                botText += data.content;
                updateBotMessage(chatId, botText);
              } else if (data.type === "error") {
                botText = data.message || "Terjadi kesalahan.";
                updateBotMessage(chatId, botText);
                return;
              }
            } catch {}
          }
        }
      }
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        botText = "Request timeout — server terlalu lambat merespon.";
      } else {
        botText = "Terjadi kesalahan koneksi.";
      }
      console.error(error);
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id !== chatId) return chat;
          return {
            ...chat,
            messages: [
              ...chat.messages,
              { sender: "bot" as const, text: botText, question: message },
            ],
          };
        })
      );
    } finally {
      setIsThinking(false);
    }
  };

  const updateBotMessage = (chatId: number, text: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id !== chatId) return chat;
        const messages = [...chat.messages];
        const lastMsg = messages[messages.length - 1];
        if (lastMsg && lastMsg.sender === "bot") {
          messages[messages.length - 1] = { ...lastMsg, text };
        }
        return { ...chat, messages };
      })
    );
  };

  const handleEvaluate = async (question: string, answer: string) => {
    setEvalLoading(true);
    setEvalOpen(true);
    setEvalMetrics(null);

    try {
      const response = await fetch("/api/evaluate", {
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

    setChats((prev) => [...prev, newChat]);
    setActiveChatId(newChat.id);
  };

  const handleRenameChat = (id: number, newTitle: string) => {
    setChats((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, title: newTitle } : chat))
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
