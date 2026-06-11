"use client";

import { useState } from "react";

export default function SummaryCard() {
  const [points, setPoints] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getSummary = async () => {
    try {
      setLoading(true);
      setPoints(["Generating summary..."]);

      const response = await fetch(
        "http://127.0.0.1:8000/api/summary"
      );

      const data = await response.json();

      const text = data.data.summary as string;

      const cleanedPoints = text
        .split(/\n|•|-/)
        .map((item) => item.trim())
        .filter((item) => item.length > 40)
        .slice(0, 6);

      setPoints(
        cleanedPoints.length > 0
          ? cleanedPoints
          : [text.slice(0, 500)]
      );
    } catch {
      setPoints(["Summary failed. Please check Server-2."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-950">
        Summary Generator
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Turn your uploaded document into clear study points.
      </p>

      <button
        onClick={getSummary}
        disabled={loading}
        className="mt-5 w-full rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 disabled:bg-slate-400"
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {points.length > 0 && (
        <div className="mt-5 rounded-3xl bg-emerald-50 p-5">
          <p className="mb-4 text-sm font-bold uppercase text-emerald-700">
            Key Points
          </p>

          <ul className="space-y-3">
            {points.map((point, index) => (
              <li
                key={index}
                className="flex gap-3 rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                  {index + 1}
                </span>

                <span>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}