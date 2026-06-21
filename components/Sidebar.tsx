"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Chat } from "@/app/page";
import ConfirmDialog from "./ConfirmDialog";

interface Props {
  chats: Chat[];
  activeChatId: number | null;
  onSelectChat: (id: number) => void;
  onNewChat: () => void;
  onRenameChat: (id: number, newTitle: string) => void;
  onDeleteChat: (id: number) => void;
}

export default function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onRenameChat,
  onDeleteChat,
}: Props) {
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [renamingId, setRenamingId] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renamingId !== null) {
      renameInputRef.current?.focus();
      renameInputRef.current?.select();
    }
  }, [renamingId]);

  useEffect(() => {
    if (menuOpenId === null) return;
    const close = () => setMenuOpenId(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpenId]);

  return (
    <aside className="w-72 bg-white border-r flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600 text-balance">
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
          <div key={chat.id} className="group relative mb-2">
            {renamingId === chat.id ? (
              <input
                ref={renameInputRef}
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onBlur={() => {
                  if (renameValue.trim()) {
                    onRenameChat(chat.id, renameValue.trim());
                  }
                  setRenamingId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur();
                  } else if (e.key === "Escape") {
                    setRenamingId(null);
                  }
                }}
                className="w-full p-2 rounded-lg border border-blue-400 outline-none text-sm"
              />
            ) : (
              <button
                onClick={() => onSelectChat(chat.id)}
                className={`w-full text-left p-3 rounded-lg pr-8 ${
                  activeChatId === chat.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="block truncate text-sm">{chat.title}</span>
              </button>
            )}

            {renamingId !== chat.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpenId(menuOpenId === chat.id ? null : chat.id);
                }}
                aria-label="Chat options"
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-opacity"
              >
                <MoreHorizontal size={16} />
              </button>
            )}

            {menuOpenId === chat.id && (
              <div className="absolute right-1 top-9 z-10 bg-white border rounded-lg shadow-lg py-1 w-36">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setRenameValue(chat.title);
                    setRenamingId(chat.id);
                    setMenuOpenId(null);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 text-left"
                >
                  <Pencil size={14} />
                  Rename
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDeleteId(chat.id);
                    setMenuOpenId(null);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 text-left text-red-600"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={confirmDeleteId !== null}
        onOpenChange={(open) => { if (!open) setConfirmDeleteId(null); }}
        onConfirm={() => {
          if (confirmDeleteId !== null) onDeleteChat(confirmDeleteId);
          setConfirmDeleteId(null);
        }}
        title="Delete chat?"
        description="This action cannot be undone. The chat and all its messages will be permanently deleted."
      />
    </aside>
  );
}
