"use client";

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-chat-bg px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-balance">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6 text-pretty">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
