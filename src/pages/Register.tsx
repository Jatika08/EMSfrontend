import { useState, useContext } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";

export const RegisterPage = () => {
  const [step, setStep] = useState<"verify" | "details">("verify");
  const [form, setForm] = useState({
    email: "",
    otp: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert("Registered successfully! Please login.");
      navigate("/login");
    },
    onError: (err: any) => {
      alert("Registration failed: " + err?.response?.data?.message || "Unknown error");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally here you'd call an OTP verification API
    if (form.otp.length === 6) {
      setStep("details");
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    registerMutation.mutate({
      email: form.email,
      password: form.password,
      name: form.name,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 to-stone-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-stone-900/70 border border-stone-700/30 backdrop-blur-md shadow-inner rounded-3xl p-8 flex flex-col gap-6 text-stone-200">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-stone-400 mb-1">
            Create Account
          </h1>
          <p className="text-sm text-stone-400">
            {step === "verify"
              ? "Enter your email and OTP to proceed"
              : "Complete your details to register"}
          </p>
        </div>

        <form onSubmit={step === "verify" ? handleVerify : handleRegister} className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-stone-500" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-800/60 border border-stone-700 text-sm placeholder-stone-500 focus:ring-2 focus:ring-stone-600"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-stone-500" size={18} />
            <input
              type="text"
              name="otp"
              placeholder="One Time Password"
              value={form.otp}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-800/60 border border-stone-700 text-sm placeholder-stone-500 focus:ring-2 focus:ring-stone-600"
            />
          </div>

          {step === "details" && (
            <>
              <div className="relative">
                <User className="absolute left-3 top-3 text-stone-500" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-800/60 border border-stone-700 text-sm placeholder-stone-500 focus:ring-2 focus:ring-stone-600"
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
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-800/60 border border-stone-700 text-sm placeholder-stone-500 focus:ring-2 focus:ring-stone-600"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 text-stone-500" size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-800/60 border border-stone-700 text-sm placeholder-stone-500 focus:ring-2 focus:ring-stone-600"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-stone-700 to-stone-600 text-white font-semibold text-sm hover:brightness-110 transition-all"
          >
            {step === "verify" ? "Enter Details" : "Register"}
          </button>
        </form>

        <div className="text-center text-sm text-stone-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-stone-300 underline cursor-pointer"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};
