import api from "../utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 bg-black">
      <div className="w-full max-w-md rounded-2xl bg-black border border-[#1a1a1a] shadow-[0_0_40px_rgba(0,0,0,0.6)] p-8">
        
        <h2 className="text-3xl font-semibold text-white tracking-tight mb-8">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] text-white placeholder:text-[#6b6b6b] focus:outline-none focus:border-white transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-6 rounded-xl bg-white text-black font-semibold text-base hover:bg-[#f2f2f2] transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-[#9a9a9a] mt-8">
          Already have an account?{" "}
          <Link to="/" className="text-white underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}