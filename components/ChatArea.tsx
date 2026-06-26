"use client";

import { useEffect, useRef, useState } from "react";
import { Search, User, Settings } from "lucide-react";
import { Message, Chat } from "@/app/page";
import ChatBubble from "./ChatBubble";
import SuggestionChips from "./SuggestionChips";
import ChatInput from "./ChatInput";
import TypingDots from "./TypingDots";
import MobileHeader from "./MobileHeader";
import ChatDrawer from "./ChatDrawer";

interface Props {
  messages: Message[];
  onSend: (message: string) => void;
  isThinking: boolean;
  chats: Chat[];
  activeChatId: number | null;
  onSelectChat: (id: number) => void;
  onNewChat: () => void;
  onRenameChat: (id: number, newTitle: string) => void;
  onDeleteChat: (id: number) => void;
  onEvaluate?: (question: string, answer: string) => void;
}

export default function ChatArea({
  messages,
  onSend,
  isThinking,
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onRenameChat,
  onDeleteChat,
  onEvaluate,
}: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-dvh flex-1 bg-chat-bg">
      <MobileHeader onToggleDrawer={() => setDrawerOpen(true)} />

      <ChatDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={onSelectChat}
        onNewChat={onNewChat}
        onRenameChat={onRenameChat}
        onDeleteChat={onDeleteChat}
      />

      {hasMessages ? (
        <ChatLayout
          messages={messages}
          onSend={onSend}
          isThinking={isThinking}
          bottomRef={bottomRef}
          onEvaluate={onEvaluate}
        />
      ) : (
        <CenteredLayout onSend={onSend} isThinking={isThinking} />
      )}
    </div>
  );
}

function CenteredLayout({
  onSend,
  isThinking,
}: {
  onSend: (message: string) => void;
  isThinking: boolean;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 md:pb-12 overflow-y-auto">
      <div className="hidden md:flex size-16 rounded-xl bg-blue-600 text-white items-center justify-center font-bold text-4xl">
        N
      </div>

      <h1 className="text-xl md:text-4xl font-bold text-blue-700 mt-0 md:mt-6 text-balance">
        NutriAI
      </h1>

      <p className="text-gray-500 mt-0.5 md:mt-2 text-xs md:text-lg text-pretty">
        Your AI Nutrition Assistant
      </p>

      <div className="w-full max-w-xs md:max-w-3xl mt-4 md:mt-8">
        <div className="flex flex-col gap-3 md:gap-4">
          <SuggestionChips onSend={onSend} />

          <ChatInput onSend={onSend} disabled={isThinking} />
        </div>
      </div>
    </div>
  );
}

function ChatLayout({
  messages,
  onSend,
  isThinking,
  bottomRef,
  onEvaluate,
}: {
  messages: Message[];
  onSend: (message: string) => void;
  isThinking: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  onEvaluate?: (question: string, answer: string) => void;
}) {
  return (
    <>
      {/* HEADER DESKTOP */}
      <div className="hidden md:flex h-20 bg-white border-b items-center justify-between px-12 shrink-0">
        <h1 className="text-4xl font-bold text-blue-700 text-balance">NutriAI</h1>

        <div className="flex items-center gap-8">
          <Search size={20} className="text-gray-500" />
          <User size={20} className="text-gray-500" />
          <Settings size={20} className="text-gray-500" />
        </div>
      </div>

      {/* CHAT SCROLL */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-3 md:px-10 py-4 md:py-6">
          <div className="space-y-3 md:space-y-6">
            {messages.map((message, index) => (
              <ChatBubble
                key={`msg-${index}-${message.sender}`}
                sender={message.sender}
                text={message.text}
                question={message.question}
                onEvaluate={onEvaluate}
              />
            ))}

            {isThinking && <TypingDots />}
          </div>

          <div ref={bottomRef} />
        </div>
      </div>

      {/* FOOTER */}
      <div className="shrink-0 px-3 md:px-4 pb-2 md:pb-4 pt-1 md:pt-2">
        <div className="max-w-5xl mx-auto">
          <ChatInput onSend={onSend} disabled={isThinking} />
        </div>
      </div>
    </>
  );
}
