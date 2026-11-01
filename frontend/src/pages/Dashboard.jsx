import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createResearch,
  fetchResearches,
  deleteResearch,
} from "../features/research/researchSlice";

import { topics } from "../data/topics";

import WelcomeSection from "../components/dashboard/WelcomeSection";
import FeaturedHero from "../components/dashboard/FeaturedHero";
import ResearchInput from "../components/dashboard/ResearchInput";
import LatestResearch from "../components/dashboard/LatestResearch";
import TrendingResearch from "../components/dashboard/TrendingResearch";
import ResearchHistory from "../components/dashboard/ResearchHistory";

function Dashboard() {
  const dispatch = useDispatch();

  const {
    researches,
    currentResearch,
    loading,
    creating,
    deleting,
    error,
    createError,
  } = useSelector((state) => state.research);

  const [question, setQuestion] = useState("");
  const [deleteError, setDeleteError] = useState("");

  // Fetch previous research when dashboard opens.
  useEffect(() => {
    dispatch(fetchResearches());
  }, [dispatch]);

  // Create research.
  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || creating) return;

    try {
      await dispatch(createResearch(trimmedQuestion)).unwrap();
      setQuestion("");
    } catch (error) {
      console.error("Research generation failed:", error);
    }
  };

  // Delete research.
  const handleDeleteResearch = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this research? This action cannot be undone.",
    );

    if (!confirmed) return;

    setDeleteError("");

    try {
      await dispatch(deleteResearch(id)).unwrap();
    } catch (error) {
      setDeleteError(
        typeof error === "string"
          ? error
          : "Unable to delete research. Please try again.",
      );
    }
  };

  // Use a trending topic as the research question.
  const handleTopicClick = (title) => {
    setQuestion(`Research this topic in detail: ${title}`);

    document.getElementById("research-input")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-[#101010] px-5 pb-16 pt-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <WelcomeSection />

        <FeaturedHero />

        <ResearchInput
          question={question}
          setQuestion={setQuestion}
          creating={creating}
          createError={createError}
          onSubmit={handleSubmit}
        />

        <LatestResearch research={currentResearch} />

        <TrendingResearch topics={topics} onTopicClick={handleTopicClick} />

        <ResearchHistory
          researches={researches}
          loading={loading}
          error={error}
          deleting={deleting}
          deleteError={deleteError}
          onDelete={handleDeleteResearch}
        />

        <footer className="mt-16 border-t border-white/[0.07] pt-6 text-center text-xs text-neutral-600">
          DeepScope · Go beyond the surface.
        </footer>
      </div>
    </main>
  );
}

export default Dashboard;
