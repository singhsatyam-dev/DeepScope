import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const { isAuthenticated, initializing } = useSelector((state) => state.auth);

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101010]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#E50914]" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
