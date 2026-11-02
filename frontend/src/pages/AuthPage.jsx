import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

import {
  loginUser,
  registerUser,
  clearAuthError,
} from "../features/auth/authSlice";

function AuthPage({ mode = "login" }) {
  const isSignup = mode === "signup";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) dispatch(clearAuthError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      return;
    }

    try {
      if (isSignup) {
        await dispatch(
          registerUser({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        ).unwrap();

        navigate("/login", {
          replace: true,
          state: { registered: true },
        });
      } else {
        await dispatch(
          loginUser({
            email: formData.email,
            password: formData.password,
          }),
        ).unwrap();

        navigate("/dashboard", { replace: true });
      }
    } catch {
      // Redux stores the API error in auth.error.
    }
  };

  const passwordMismatch =
    isSignup &&
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101010] px-5 py-10 text-white">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-9 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E50914] text-lg font-black">
            D
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Deep<span className="text-[#E50914]">Scope</span>
          </span>
        </Link>

        <div className="rounded-2xl border border-white/[0.08] bg-[#191919] p-7 shadow-2xl sm:p-9">
          <h1 className="text-3xl font-bold tracking-tight">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>

          <p className="mt-2 text-sm text-neutral-400">
            {isSignup
              ? "Start exploring beyond the surface."
              : "Sign in to continue your research."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {isSignup && (
              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  maxLength={100}
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#101010] px-4 py-3 text-sm outline-none transition placeholder:text-neutral-600 focus:border-[#E50914]"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-white/10 bg-[#101010] px-4 py-3 text-sm outline-none transition placeholder:text-neutral-600 focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  minLength={8}
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#101010] px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-neutral-600 focus:border-[#E50914]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isSignup && (
              <div>
                <label className="mb-2 block text-sm text-neutral-300">
                  Confirm password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#101010] px-4 py-3 text-sm outline-none transition placeholder:text-neutral-600 focus:border-[#E50914]"
                />

                {passwordMismatch && (
                  <p className="mt-2 text-xs text-red-400">
                    Passwords do not match.
                  </p>
                )}
              </div>
            )}

            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || passwordMismatch}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#E50914] py-3.5 text-sm font-semibold text-white transition hover:bg-[#c90812] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Please wait...
                </>
              ) : (
                <>
                  {isSignup ? "Create account" : "Log in"}
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-neutral-400">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              to={isSignup ? "/login" : "/signup"}
              className="font-semibold text-[#ff303b] hover:underline"
            >
              {isSignup ? "Log in" : "Sign up"}
            </Link>
          </p>
        </div>

        <Link
          to="/"
          className="mt-7 block text-center text-sm text-neutral-500 transition hover:text-white"
        >
          ← Back to DeepScope
        </Link>
      </div>
    </main>
  );
}

export default AuthPage;
