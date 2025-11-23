import api from "../utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await api.post("/user/signup", {
        email,
        password,
        username,
        name,
      });

      toast.success("Account created successfully");
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* HEADER */}
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">URLShortner</div>
          <div className="text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-emerald-400 font-semibold hover:text-emerald-300"
            >
              Log in
            </Link>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-73px)]">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-white mb-3">
              Create your account
            </h1>
            <p className="text-zinc-400 mb-8">
              Start shortening URLs in seconds
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Saul Goodman"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="betterCallSaul"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="betterCallSaul@example.com"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-lg transition-colors shadow-lg shadow-emerald-900/50 mt-6"
              >
                Create account
              </button>
            </form>

            <p className="text-xs text-zinc-500 mt-6 text-center">
              By signing up, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>

        {/* RIGHT SIDE*/}
        <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 items-center justify-center p-12 border-l border-zinc-800">
          <div className="max-w-lg">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl p-6">
                <div className="w-10 h-10 bg-violet-600 rounded-lg mb-3 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-white">2.4k</div>
                <div className="text-sm text-zinc-400">Total Clicks</div>
              </div>
              <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl p-6">
                <div className="w-10 h-10 bg-cyan-600 rounded-lg mb-3 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-zinc-400">Active Links</div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">
              Everything you need to manage your links
            </h3>
            <p className="text-zinc-400 text-lg mb-6">
              Create custom short URLs, track performance, and engage your
              audience with powerful analytics.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <div className="font-semibold text-white">
                    Custom short codes
                  </div>
                  <div className="text-sm text-zinc-400">
                    Brand your links with custom aliases
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <div className="font-semibold text-white">
                    Real-time analytics
                  </div>
                  <div className="text-sm text-zinc-400">
                    Track every click in real-time
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <div className="font-semibold text-white">
                    Secure & reliable
                  </div>
                  <div className="text-sm text-zinc-400">
                    Enterprise-grade security
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}