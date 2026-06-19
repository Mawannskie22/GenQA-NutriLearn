export default function SuggestionChips() {
  const chips = [
    "Berapa banyak protein?",
    "Apa itu gizi seimbang?",
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-3">
      {chips.map((chip) => (
        <button
          key={chip}
          className="whitespace-nowrap border rounded-full px-4 py-2 text-sm bg-white"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}