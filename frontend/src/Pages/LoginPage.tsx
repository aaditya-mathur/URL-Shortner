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

      const { data } = await api.post("/user/login", payload);

      localStorage.setItem("token", data.accessToken);

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
    <div className="min-h-screen w-full flex items-center justify-center px-6 bg-black">
      <div className="w-full max-w-md rounded-2xl bg-black border border-[#1a1a1a] shadow-[0_0_40px_rgba(0,0,0,0.6)] p-10">
        <h2 className="text-4xl font-semibold text-white tracking-tight mb-12">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white font-medium">
              Email or Username
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-4 rounded-xl bg-[#111] border border-[#2a2a2a] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-4 rounded-xl bg-[#111] border border-[#2a2a2a] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-white text-black font-semibold text-base hover:bg-[#f2f2f2] transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-[#9a9a9a] mt-10">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}