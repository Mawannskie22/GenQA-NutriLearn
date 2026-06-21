export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F7F8FC]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
          N
        </div>
        <div className="text-blue-700 font-bold text-xl">NutriAI</div>
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
