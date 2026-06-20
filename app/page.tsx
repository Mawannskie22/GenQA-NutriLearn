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
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: "Chat 1",
      messages: [],
    },
    {
      id: 2,
      title: "Chat 2",
      messages: [],
    },
    {
      id: 3,
      title: "Chat 3",
      messages: [],
    },
    {
      id: 4,
      title: "Chat 4",
      messages: [],
    },
  ]);

  const [activeChatId, setActiveChatId] =
    useState(1);

  const activeChat = chats.find(
    (chat) => chat.id === activeChatId
  );

  const sendMessage = async (
    message: string
  ) => {
    if (!message.trim()) return;

    // simpan pesan user
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id !== activeChatId)
          return chat;

        return {
          ...chat,
          messages: [
            ...chat.messages,
            {
              sender: "user",
              text: message,
            },
          ],
        };
      })
    );

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await response.json();

      // simpan balasan AI
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (
            chat.id !== activeChatId
          )
            return chat;

          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                sender: "bot",
                text:
                  data.reply ??
                  "Tidak ada respon.",
              },
            ],
          };
        })
      );
    } catch (error) {
      console.error(error);

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (
            chat.id !== activeChatId
          )
            return chat;

          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                sender: "bot",
                text:
                  "Terjadi kesalahan.",
              },
            ],
          };
        })
      );
    }
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: `Chat ${
        chats.length + 1
      }`,
      messages: [],
    };

    setChats((prev) => [
      ...prev,
      newChat,
    ]);

    setActiveChatId(newChat.id);
  };

  return (
    <main className="flex h-screen overflow-hidden bg-[#F7F8FC]">
      <div className="hidden md:flex">
        <Sidebar
          chats={chats}
          activeChatId={
            activeChatId
          }
          onSelectChat={
            setActiveChatId
          }
          onNewChat={
            handleNewChat
          }
        />
      </div>

      <ChatArea
        messages={
          activeChat?.messages ||
          []
        }
        onSend={sendMessage}
      />
    </main>
  );
}