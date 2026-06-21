export default function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-white text-gray-700 px-5 py-4 rounded-3xl shadow-sm max-w-[85%] md:max-w-[500px]">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
