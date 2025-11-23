import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isEmail = identifier.includes("@");
      const payload = isEmail
        ? { email: identifier, password }
        : { username: identifier, password };

      await api.post("/user/login", payload);
      // USED COOKIE-PARSER SO NO NEED TO USE LOCAL STORAGE 
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (err: any) {
      const status = err.response?.status;
      const message = err.response?.data?.error || err.response?.data?.message;

      if (status === 429) {
        toast.error(message || "Too many login attempts. Try again later.", {
          duration: 5000,
          icon: "⏱️",
        });
      } else {
        toast.error(message || "Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* HEADER*/}
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">URLShortner</div>
          <div className="text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-emerald-400 font-semibold hover:text-emerald-300">
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-73px)]">
        {/* LEFT SIDE ( FORM )*/}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-white mb-3">Welcome back</h1>
            <p className="text-zinc-400 mb-8">Log in to your account to continue</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-zinc-200 mb-2">
                  Email or Username
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="saul@example.com"
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
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-lg transition-colors shadow-lg shadow-emerald-900/50"
              >
                Log in
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 items-center justify-center p-12 border-l border-zinc-800">
          <div className="max-w-lg">
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl shadow-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-white">Your Links</div>
                  <div className="text-sm text-zinc-400">Manage everything</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-700 rounded-lg">
                  <span className="text-sm font-mono text-emerald-400">lnk.sh/abc123</span>
                  <span className="text-xs text-zinc-400">1.2k clicks</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-700 rounded-lg">
                  <span className="text-sm font-mono text-emerald-400">lnk.sh/xyz123</span>
                  <span className="text-xs text-zinc-400">856 clicks</span>
                </div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">
              Track your links with powerful analytics
            </h3>
            <p className="text-zinc-400 text-lg">
              Get insights on every click, manage custom short codes, and grow your reach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}