"use client";

interface Props {
  onSend: (message: string) => void;
}

export default function SuggestionChips({ onSend }: Props) {
  const chips = [
    "Berapa banyak protein yang dibutuhkan tubuh setiap hari?",
    "Apa itu gizi seimbang?",
    "Cara Weight Cut Saat Tinju?",
  ];

  return (
    <div className="flex gap-2 md:gap-3 overflow-x-auto pb-3">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onSend(chip)}
          className="whitespace-nowrap border rounded-full px-2 md:px-4 py-1 md:py-2 text-[11px] md:text-sm bg-white hover:bg-gray-100 transition"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
