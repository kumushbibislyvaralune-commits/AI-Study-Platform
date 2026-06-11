"use client";

import { useEffect, useState } from "react";

type Stats = {
  documents: number;
  chunks: number;
  quiz_items: number;
  flashcards: number;
};

export default function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/stats"
        );

        const data = await response.json();

        setStats(data.data);
      } catch {
        setStats(null);
      }
    };

    fetchStats();
  }, []);

  const items = [
    {
      label: "Documents",
      value: stats?.documents ?? 0,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Chunks",
      value: stats?.chunks ?? 0,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Quiz Items",
      value: stats?.quiz_items ?? 0,
      color: "bg-orange-50 text-orange-700",
    },
    {
      label: "Flashcards",
      value: stats?.flashcards ?? 0,
      color: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">
            {item.label}
          </p>

          <div
            className={`mt-4 inline-flex rounded-2xl px-4 py-2 text-2xl font-bold ${item.color}`}
          >
            {item.value}
          </div>
        </div>
      ))}
    </section>
  );
}