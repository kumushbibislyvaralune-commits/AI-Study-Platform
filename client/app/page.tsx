import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import UploadCard from "./components/UploadCard";
import TutorCard from "./components/TutorCard";
import SummaryCard from "./components/SummaryCard";
import QuizCard from "./components/QuizCard";
import FlashcardsCard from "./components/FlashcardsCard";

export default function HomePage() {
  return (
    <main id="top" className="min-h-screen bg-[#F6F8FB]">
      <div className="flex">
        <Sidebar />

        <section className="flex-1 px-8 py-8">
          <Header />

          <StatsCards />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div id="upload" className="scroll-mt-8">
              <UploadCard />
            </div>

            <div id="tutor" className="scroll-mt-8">
              <TutorCard />
            </div>

            <div id="summary" className="scroll-mt-8">
              <SummaryCard />
            </div>

            <div id="quiz" className="scroll-mt-8">
              <QuizCard />
            </div>

            <div id="flashcards" className="scroll-mt-8 xl:col-span-2">
              <FlashcardsCard />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}