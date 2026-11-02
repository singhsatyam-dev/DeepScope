import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Menu, Bell } from "lucide-react";

import Sidebar from "./components/layout/Sidebar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthInitializer from "./components/auth/AuthInitializer";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ReportPage from "./pages/ReportPage";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = () => setSidebarOpen(false);

  const { user } = useSelector((state) => state.auth);

  const userInitials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") closeSidebar();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const target = location.state?.scrollTo;

    if (!target || location.pathname !== "/dashboard") return;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [location.key, location.pathname, location.state]);

  const isReportPage = location.pathname.startsWith("/research/");

  return (
    <div className="min-h-screen bg-[#101010]">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      <div className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/[0.07] bg-[#101010]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
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

          <div className="hidden items-center gap-2 text-sm text-neutral-500 lg:flex">
            <span>Discover</span>
            <span>/</span>
            <span className="text-white">
              {isReportPage ? "Research Report" : "Home"}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-5">
            <button
              type="button"
              aria-label="Notifications"
              className="rounded-lg p-2 text-neutral-400 transition hover:bg-white/[0.06] hover:text-white"
            >
              <Bell size={19} />
            </button>

            <div
              title={user?.name || "User"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#303030] text-xs font-bold text-white"
            >
              {userInitials}
            </div>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthInitializer>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/research/:id" element={<ReportPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthInitializer>
    </BrowserRouter>
  );
}

export default App;
