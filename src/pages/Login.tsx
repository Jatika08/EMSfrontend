import { useState } from "react";
import { Lock, Mail } from "lucide-react";

export const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", form);
    // Auth logic goes here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 to-stone-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-stone-900/70 border border-stone-700/30 backdrop-blur-md shadow-[inset_0_0_30px_rgba(0,0,0,0.4)] rounded-3xl p-8 flex flex-col gap-6 text-stone-200">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400 mb-1">
            Welcome Back
          </h1>
          <p className="text-sm text-stone-400">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-stone-500" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-800/60 border border-stone-700 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-600"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-stone-500" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-800/60 border border-stone-700 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-stone-700 to-stone-600 text-white font-semibold text-sm hover:brightness-110 transition-all"
          >
            Sign In
          </button>
        </form>
{/* 
        <div className="text-center text-sm text-stone-500">
          Don't have an account? <a className="text-stone-300 underline cursor-pointer">Sign up</a>
        </div> */}
      </div>
    </div>
  );
};
