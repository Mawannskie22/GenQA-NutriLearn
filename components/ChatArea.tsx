import { Message } from "@/app/page";
import MobileHeader from "./MobileHeader";
import ChatBubble from "./ChatBubble";
import SuggestionChips from "./SuggestionChips";
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
    <div className="flex flex-col h-screen">
      <MobileHeader />

      <div className="flex-1 overflow-y-auto px-5 py-8 space-y-6">
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            sender={message.sender}
            text={message.text}
          />
        ))}
      </div>

      <div className="p-4 border-t bg-[#F7F8FC]">
        <SuggestionChips />
        <ChatInput onSend={onSend} />
      </div>
    </div>
  );
}