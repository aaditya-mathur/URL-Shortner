import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("user created successfully");
    console.log({ name, username, email, password });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 
                    bg-gradient-to-b from-[#0c0d0f] to-[#121417]"
    >
      <div
        className="max-w-md w-full 
                bg-[#181a1f]/70 backdrop-blur-xl
                rounded-xl p-8 shadow-2xl
                border border-[#2a2d34]/50"
      >
        <h2 className="text-3xl font-light text-center mb-8 text-gray-200 tracking-wide">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 
                         bg-[#0e0f11] text-gray-200 
                         border border-[#2a2d34] rounded-lg 
                         focus:ring-2 focus:ring-gray-500 focus:outline-none
                         placeholder-gray-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 
                         bg-[#0e0f11] text-gray-200 
                         border border-[#2a2d34] rounded-lg 
                         focus:ring-2 focus:ring-gray-500 focus:outline-none
                         placeholder-gray-500"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 
                         bg-[#0e0f11] text-gray-200 
                         border border-[#2a2d34] rounded-lg 
                         focus:ring-2 focus:ring-gray-500 focus:outline-none
                         placeholder-gray-500"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 
                         bg-[#0e0f11] text-gray-200 
                         border border-[#2a2d34] rounded-lg 
                         focus:ring-2 focus:ring-gray-500 focus:outline-none
                         placeholder-gray-500"
              placeholder="Enter password"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 
                         bg-[#0e0f11] text-gray-200 
                         border border-[#2a2d34] rounded-lg 
                         focus:ring-2 focus:ring-gray-500 focus:outline-none
                         placeholder-gray-500"
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg mt-6
                 bg-gray-200 text-black 
                 hover:bg-white transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-gray-200 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
