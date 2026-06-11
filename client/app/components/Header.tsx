export default function Header() {
  return (
    <section className="mb-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
      <div className="relative px-10 py-9">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute bottom-0 right-20 h-40 w-40 rounded-full bg-indigo-100 blur-3xl" />

        <div className="relative z-10">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-700">
            AI Learning Platform
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-slate-950">
            AI-Powered Study Platform
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Upload documents, generate summaries, create quizzes,
            build flashcards and chat with your study materials using AI.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {[
              "PDF Processing",
              "AI Tutor",
              "Smart Summary",
              "Quiz Builder",
              "Flashcards",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}