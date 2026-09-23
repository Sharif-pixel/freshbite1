"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials");

      login(data.token, data.user);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-red-50/50 via-white to-orange-50/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Promotional Hero Card matching Figma */}
        <div className="md:w-5/12 bg-gradient-to-br from-[#B02F00] via-[#E63946] to-[#F77F00] p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Info */}
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
              <Sparkles size={14} className="text-yellow-300" />
              <span>Welcome Back</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black leading-tight tracking-tight">
              Fresh cravings, delivered to your door.
            </h2>
            <p className="text-sm md:text-base text-red-100/90 leading-relaxed font-normal">
              Sign in to access your saved favorite restaurants, lightning-fast reordering, and exclusive culinary rewards.
            </p>
          </div>

          {/* Center Floating Glass Badges */}
          <div className="relative z-10 my-8 space-y-3">
            <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-4 shadow-lg flex items-center gap-3.5 transform hover:scale-[1.02] transition-transform">
              <div className="p-2.5 bg-white/20 rounded-xl">
                <Truck size={22} className="text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Live Order Tracking</h4>
                <p className="text-xs text-white/80">From our kitchen to your doorstep in 25 mins.</p>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-4 shadow-lg flex items-center gap-3.5 transform hover:scale-[1.02] transition-transform">
              <div className="p-2.5 bg-white/20 rounded-xl">
                <ShieldCheck size={22} className="text-yellow-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Secure Payments</h4>
                <p className="text-xs text-white/80">Encrypted end-to-end checkout.</p>
              </div>
            </div>
          </div>

          {/* Left Footer */}
          <div className="relative z-10 text-xs text-white/70">
            © 2024 FreshBites Inc. All rights reserved.
          </div>
        </div>

        {/* Right Side: Sign In Form */}
        <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome back!
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Enter your details to access your account.
            </p>
          </div>

          {error && (
            <div className="mt-4 p-3.5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl flex items-center gap-2">
              <span className="shrink-0">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Email Address */}
            <div>
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-gray-50/70 border-gray-200 rounded-xl focus:bg-white focus:border-primary-color transition-colors"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
                  Password
                </label>
                <a href="#" className="text-xs text-primary-color hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-gray-50/70 border-gray-200 rounded-xl focus:bg-white focus:border-primary-color transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="size-4 text-primary-color border-gray-300 rounded focus:ring-primary-color cursor-pointer accent-primary-color"
              />
              <label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer select-none">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary-color hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-[0_4px_16px_rgba(230,57,70,0.35)] hover:shadow-[0_6px_22px_rgba(230,57,70,0.45)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{loading ? "Signing In..." : "Sign In"}</span>
                <ArrowRight size={17} className="transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>

          {/* Social Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-400 font-medium">or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 py-2.5 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
            >
              <svg className="size-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2.5 py-2.5 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
            >
              <svg className="size-4 fill-current text-gray-900" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.85-.9.04-2 .6-2.64 1.35-.57.65-1.06 1.72-.93 2.76 1.01.08 1.95-.51 2.56-1.26" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Switch to Sign Up */}
          <div className="mt-8 text-center text-xs text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary-color font-bold hover:underline">
              Sign up
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
