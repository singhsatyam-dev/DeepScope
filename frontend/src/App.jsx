import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Menu, Bell } from "lucide-react";

import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import ReportPage from "./pages/ReportPage";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = () => setSidebarOpen(false);

  // Close sidebar when navigating to another route.
  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  // Prevent background scrolling while mobile sidebar is open.
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Close sidebar using Escape key.
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Handle scroll requests coming from the sidebar.
  useEffect(() => {
    const target = location.state?.scrollTo;

    if (!target || location.pathname !== "/") return;

    const firstFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });

    return () => cancelAnimationFrame(firstFrame);
  }, [location.key, location.pathname, location.state]);

  // Dynamic breadcrumb.
  const isReportPage = location.pathname.startsWith("/research/");

  return (
    <div className="min-h-screen bg-[#101010]">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      <div className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/[0.07] bg-[#101010]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            aria-expanded={sidebarOpen}
            aria-controls="main-sidebar"
            className="rounded-lg p-2 text-neutral-300 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E50914] lg:hidden"
          >
            <Menu size={22} />
          </button>

          {/* Breadcrumb */}
          <div className="hidden items-center gap-2 text-sm text-neutral-500 lg:flex">
            <span>Discover</span>

            <span>/</span>

            <span className="text-white">
              {isReportPage ? "Research Report" : "Home"}
            </span>
          </div>

          {/* Header Actions */}
          <div className="ml-auto flex items-center gap-5">
            <button
              type="button"
              aria-label="Notifications"
              className="rounded-lg p-2 text-neutral-400 transition hover:bg-white/[0.06] hover:text-white"
            >
              <Bell size={19} />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#242424] text-xs font-bold text-white">
              DS
            </div>
          </div>
        </header>

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/research/:id" element={<ReportPage />} />

          <Route
            path="*"
            element={
              <div className="p-10 text-center text-neutral-400">
                Page not found.
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
