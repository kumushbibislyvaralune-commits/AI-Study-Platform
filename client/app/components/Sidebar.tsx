"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileUp,
  Bot,
  NotebookText,
  CircleHelp,
  Layers,
  FileText,
  Server,
} from "lucide-react";

type RecentDocument = {
  id: string;
  name: string;
  size: number;
  created_at: string;
};

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "top",
  },
  {
    icon: FileUp,
    label: "Upload PDF",
    href: "upload",
  },
  {
    icon: Bot,
    label: "AI Tutor",
    href: "tutor",
  },
  {
    icon: NotebookText,
    label: "Summary",
    href: "summary",
  },
  {
    icon: CircleHelp,
    label: "Quiz",
    href: "quiz",
  },
  {
    icon: Layers,
    label: "Flashcards",
    href: "flashcards",
  },
];

export default function Sidebar() {
  const [recentDocuments, setRecentDocuments] = useState<RecentDocument[]>([]);
  const [activeItem, setActiveItem] = useState("Dashboard");

  useEffect(() => {
    const fetchRecentDocuments = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/recent-documents"
        );

        const data = await response.json();

        setRecentDocuments(data.data);
      } catch {
        setRecentDocuments([]);
      }
    };

    fetchRecentDocuments();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let current = "Dashboard";

      for (const item of menuItems) {
        const section = document.getElementById(item.href);

        if (section) {
          const rect = section.getBoundingClientRect();

          if (rect.top <= 180) {
            current = item.label;
          }
        }
      }

      setActiveItem(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, label: string) => {
    setActiveItem(label);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <aside className="sticky top-0 h-screen w-72 shrink-0 border-r border-slate-200 bg-white px-6 py-8 shadow-sm">
      <div className="mb-10">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow">
          AI
        </div>

        <h1 className="text-2xl font-bold text-slate-950">
          AI Study
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Smart learning dashboard
        </p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;

          return (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href, item.label)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-10 rounded-3xl bg-slate-50 p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
          Recent Documents
        </p>

        <div className="space-y-3">
          {recentDocuments.length === 0 && (
            <p className="text-xs text-slate-400">
              No recent uploads yet.
            </p>
          )}

          {recentDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-start gap-3 rounded-2xl bg-white p-3 text-xs shadow-sm"
            >
              <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                <FileText size={16} />
              </div>

              <div>
                <p className="font-semibold text-slate-700">
                  {doc.name}
                </p>

                <p className="mt-1 text-slate-400">
                  {(doc.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-blue-50 p-4">
        <div className="flex items-center gap-2">
          <Server size={17} className="text-blue-700" />

          <p className="text-sm font-bold text-blue-700">
            Server Status
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

          <span className="text-xs font-medium text-slate-600">
            Server-1 & Server-2 active
          </span>
        </div>
      </div>
    </aside>
  );
}