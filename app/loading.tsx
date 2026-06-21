export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-dvh bg-chat-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
          N
        </div>
        <div className="text-blue-700 font-bold text-xl">NutriAI</div>
        <div className="size-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
