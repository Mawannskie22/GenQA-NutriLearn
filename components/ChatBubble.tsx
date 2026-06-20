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
        className={`
          whitespace-pre-line
          px-4 md:px-6
          py-3 md:py-4
          rounded-3xl
          shadow-sm
          max-w-[85%]
          md:max-w-[500px]
          leading-relaxed
          text-sm md:text-base
          ${
            sender === "user"
              ? "bg-blue-100 text-blue-900"
              : "bg-white text-gray-700"
          }
        `}
      >
        {text}
      </div>
    </div>
  );
}