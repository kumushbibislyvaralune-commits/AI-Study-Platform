"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function TutorCard() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const askTutor = async () => {
    if (!message.trim()) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/tutor/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage.content,
          }),
        }
      );

      const data = await response.json();

      const aiMessage: Message = {
        role: "ai",
        content: data.data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "AI Tutor failed. Please check Server-2.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[520px] flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-xl font-bold text-slate-950">
          AI Tutor
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Chat with your uploaded study material.
        </p>
      </div>

      <div className="mt-5 flex-1 space-y-4 overflow-auto rounded-3xl bg-slate-50 p-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center text-sm text-slate-400">
            Ask a question about your uploaded PDF.
          </div>
        )}

        {messages.map((item, index) => (
          <div
            key={index}
            className={`flex ${
              item.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                item.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 shadow-sm"
              }`}
            >
              <p className="mb-1 text-xs font-bold uppercase opacity-70">
                {item.role === "user" ? "You" : "AI Tutor"}
              </p>

              <p className="whitespace-pre-wrap">
                {item.content}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
              AI Tutor is thinking...
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 flex gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askTutor();
            }
          }}
          placeholder="Ask something about your document..."
          className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
        />

        <button
          onClick={askTutor}
          disabled={loading}
          className="rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:bg-slate-400"
        >
          Send
        </button>
      </div>
    </section>
  );
}