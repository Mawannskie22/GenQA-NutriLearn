interface Props {
  sender: "user" | "bot";
  text: string;
}

export default function MessageBubble({
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
        className={`max-w-lg px-4 py-3 rounded-2xl ${
          sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-white border"
        }`}
      >
        {text}
      </div>
    </div>
  );
}