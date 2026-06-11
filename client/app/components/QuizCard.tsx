"use client";

import { useState } from "react";

type QuizQuestion = {
  id: number;
  type: string;
  question: string;
  answer: string;
};

export default function QuizCard() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [openAnswer, setOpenAnswer] = useState<number | null>(null);

  const generateQuiz = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/quiz"
      );

      const data = await response.json();

      setQuestions(data.data.questions);
    } catch {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-950">
        Quiz Generator
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Generate short-answer questions from your uploaded material.
      </p>

      <button
        onClick={generateQuiz}
        disabled={loading}
        className="mt-5 w-full rounded-2xl bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700 disabled:bg-slate-400"
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      <div className="mt-5 space-y-4">
        {questions.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-orange-100 bg-orange-50 p-4"
          >
            <p className="text-xs font-semibold uppercase text-orange-600">
              Question {item.id}
            </p>

            <h4 className="mt-2 font-semibold text-slate-900">
              {item.question}
            </h4>

            <button
              onClick={() =>
                setOpenAnswer(
                  openAnswer === item.id ? null : item.id
                )
              }
              className="mt-3 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm"
            >
              {openAnswer === item.id ? "Hide Answer" : "Show Answer"}
            </button>

            {openAnswer === item.id && (
              <p className="mt-3 rounded-xl bg-white p-3 text-sm text-slate-700">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}