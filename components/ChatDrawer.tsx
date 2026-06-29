"use client";

import { useState, useRef, useEffect } from "react";
import { X, Search, Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Chat } from "@/lib/types";
import ConfirmDialog from "./ConfirmDialog";

interface Props {
  open: boolean;
  onClose: () => void;
  chats: Chat[];
  activeChatId: number | null;
  onSelectChat: (id: number) => void;
  onNewChat: () => void;
  onRenameChat: (id: number, newTitle: string) => void;
  onDeleteChat: (id: number) => void;
}

export default function ChatDrawer({
  open,
  onClose,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renamingId !== null) {
      renameInputRef.current?.focus();
      renameInputRef.current?.select();
    }
  }, [renamingId]);

  const filteredChats = searchQuery
    ? chats.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chats;

  const resetState = () => {
    setMenuOpenId(null);
    setRenamingId(null);
    setSearchQuery("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSelect = (id: number) => {
    onSelectChat(id);
    handleClose();
  };

  const handleNewAndClose = () => {
    onNewChat();
    handleClose();
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={handleClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-dvh w-72 bg-white shadow-xl transition-transform duration-200 ease-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-2xl font-bold text-blue-600 text-balance">NutriAI</h1>
            <button onClick={handleClose} aria-label="Close drawer">
              <X size={22} />
            </button>
          </div>

          {/* SEARCH */}
          <div className="px-4 pt-3 pb-2">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search history..."
                className="flex-1 outline-none bg-transparent text-sm"
              />
            </div>
          </div>

          {/* NEW CHAT */}
          <div className="px-4 pb-2">
            <button
              onClick={handleNewAndClose}
              className="w-full bg-green-500 text-white py-2.5 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              New Chat
            </button>
          </div>

          {/* CHAT LIST */}
          <div className="flex-1 overflow-y-auto px-3 pb-4">
            {filteredChats.length === 0 ? (
              <p className="text-gray-400 text-sm text-center mt-8">
                {searchQuery ? "No results found" : "No chat history"}
              </p>
            ) : (
              filteredChats.map((chat) => (
                <div key={chat.id} className="group relative mb-1.5">
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
                        if (e.key === "Enter") e.currentTarget.blur();
                        else if (e.key === "Escape") setRenamingId(null);
                      }}
                      className="w-full p-2 rounded-lg border border-blue-400 outline-none text-sm"
                    />
                  ) : (
                    <button
                      onClick={() => handleSelect(chat.id)}
                      className={`w-full text-left p-3 rounded-lg pr-8 text-sm ${
                        activeChatId === chat.id
                          ? "bg-blue-100"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <span className="block truncate">{chat.title}</span>
                    </button>
                  )}

                  {renamingId !== chat.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(
                          menuOpenId === chat.id ? null : chat.id
                        );
                      }}
                      aria-label="Chat options"
                      className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-opacity"
                    >
                      <MoreHorizontal size={15} />
                    </button>
                  )}

                  {menuOpenId === chat.id && (
                    <div
                      className="absolute right-1 top-9 z-10 bg-white border rounded-lg shadow-lg py-1 w-36"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
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
                        onClick={() => {
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
              ))
            )}
          </div>
        </div>
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
    </>
  );
}
