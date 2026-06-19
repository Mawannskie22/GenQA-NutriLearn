interface Props {
  sender: "user" | "bot";
  text: string;
}

export default function ChatBubble({
  sender,
  text,
}: Props) {
  return (
    <div
      className={`flex ${
        sender === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`whitespace-pre-line px-5 py-4 rounded-[24px] shadow-sm max-w-[85%]
        ${
          sender === "user"
            ? "bg-blue-100 text-blue-900"
            : "bg-white text-gray-700"
        }`}
      >
        {text}
      </div>
    </div>
  );
}