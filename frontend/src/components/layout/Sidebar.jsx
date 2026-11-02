import {
  Compass,
  Plus,
  Clock3,
  Bookmark,
  Settings,
  Search,
  X,
  LogOut,
} from "lucide-react";

import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import ConfirmDialog from "../dashboard/ConfirmDIalog";

function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigation = [{ label: "Discover", icon: Compass, to: "/dashboard" }];

  const getInitials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  const scrollToSection = (sectionId) => {
    onClose?.();

    if (location.pathname === "/dashboard") {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      navigate("/dashboard", {
        state: { scrollTo: sectionId },
      });
    }
  };

  const handleMyResearch = () => {
    scrollToSection("research-history");
  };

  const handleNewResearch = () => {
    scrollToSection("research-input");
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await dispatch(logoutUser()).unwrap();
      setShowLogoutDialog(false);
      onClose?.();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
        />
      )}

      <aside
        id="main-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col border-r border-white/[0.07] bg-[#141414] transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[76px] items-center justify-between px-6">
          <Link
            to="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E50914]">
              <Search size={21} className="text-white" />
            </div>

            <span className="text-xl font-bold tracking-tight text-white">
              Deep<span className="text-[#E50914]">Scope</span>
            </span>
          </Link>

          <button
            onClick={onClose}
            className="text-neutral-400 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* New Research */}
        <div className="px-4 pt-6">
          <button
            onClick={handleNewResearch}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#E50914] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c90812]"
          >
            <Plus size={18} />
            New Research
          </button>
        </div>

        {/* Navigation */}
        <div className="mt-9 px-5">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[2px] text-neutral-500">
            Workspace
          </p>

          <nav className="space-y-2">
            {navigation.map(({ label, icon: Icon, to }) => (
              <NavLink
                key={label}
                to={to}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-neutral-400 hover:bg-white/[0.05] hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}

            <button
              onClick={handleMyResearch}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-neutral-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              <Clock3 size={18} />
              My Research
            </button>

            <button
              disabled
              title="Saved Research is coming soon"
              className="flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-3 py-3 text-sm text-neutral-600"
            >
              <Bookmark size={18} />
              Saved Research
            </button>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto border-t border-white/[0.07] p-4">
          <button
            disabled
            title="Settings are coming soon"
            className="flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-3 py-3 text-sm text-neutral-600"
          >
            <Settings size={18} />
            Settings
          </button>

          {/* User Profile */}
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-white/[0.04] p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#303030] text-sm font-bold text-white">
              {getInitials(user?.name)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user?.name || "Researcher"}
              </p>
              <p className="truncate text-xs text-neutral-500">
                {user?.email || "Personal workspace"}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => setShowLogoutDialog(true)}
            disabled={loggingOut}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={18} />
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      </aside>
      <ConfirmDialog
        open={showLogoutDialog}
        title="Log out of DeepScope?"
        message="Are you sure you want to log out? You'll need to sign in again to access your research."
        confirmLabel="Log out"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutDialog(false)}
        loading={loggingOut}
      />
    </>
  );
}

export default Sidebar;
