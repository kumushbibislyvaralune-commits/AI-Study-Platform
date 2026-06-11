"use client";

import { useState } from "react";

type Flashcard = {
  id: number;
  front: string;
  back: string;
};

export default function FlashcardsCard() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const generateFlashcards = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/flashcards"
      );

      const data = await response.json();

      setFlashcards(data.data.flashcards);
    } catch {
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-950">
            Flashcards
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Click each card to flip and revise key ideas.
          </p>
        </div>

        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">
          {flashcards.length} cards
        </span>
      </div>

      <button
        onClick={generateFlashcards}
        disabled={loading}
        className="mt-5 w-full rounded-2xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700 disabled:bg-slate-400"
      >
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {flashcards.map((card) => {
          const isFlipped = flippedCard === card.id;

          return (
            <button
              key={card.id}
              onClick={() =>
                setFlippedCard(isFlipped ? null : card.id)
              }
              className="group min-h-56 rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-1 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-full flex-col justify-between rounded-[1.35rem] bg-white p-5">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                        isFlipped
                          ? "bg-purple-600 text-white"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {isFlipped ? "Back" : "Front"}
                    </span>

                    <span className="text-xs font-semibold text-slate-400">
                      Click to flip
                    </span>
                  </div>

                  <p className="text-sm font-medium leading-6 text-slate-800">
                    {isFlipped ? card.back : card.front}
                  </p>
                </div>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-purple-100">
                  <div
                    className={`h-full rounded-full bg-purple-600 transition-all ${
                      isFlipped ? "w-full" : "w-1/2"
                    }`}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}