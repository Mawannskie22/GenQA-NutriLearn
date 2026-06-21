import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  sender: "user" | "bot";
  text: string;
}

export default function ChatBubble({
  sender,
  text,
}: Props) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          px-4 md:px-6
          py-3 md:py-4
          rounded-3xl
          shadow-sm
          max-w-[88%] md:max-w-[500px]
          leading-relaxed
          text-sm md:text-base
          ${isUser ? "bg-blue-100 text-blue-900 whitespace-pre-line" : "bg-white text-gray-700"}
        `}
      >
        {isUser ? (
          text
        ) : (
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {text}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
