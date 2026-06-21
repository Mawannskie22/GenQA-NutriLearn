export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F8FC] px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          Page not found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
