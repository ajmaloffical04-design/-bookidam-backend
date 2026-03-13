"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, ArrowRight, Mail, Lock, Calendar } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const callbackUrl = searchParams.get("callback") || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication
    setTimeout(() => {
      localStorage.setItem("bookidam_auth", "true");
      router.push(callbackUrl);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 bg-gray-50/50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-green-900/5 border border-gray-100 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="relative z-10 text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Calendar className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">BOOKIDAM</span>
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Welcome Back</h1>
            <p className="text-gray-500 font-light text-sm">Sign in to start planning your next event.</p>
          </div>

          <form onSubmit={handleLogin} className="relative z-10 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com" 
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-light" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    required 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-light" 
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-black transition-all shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center relative z-10">
            <p className="text-sm text-gray-500 font-light">
              Don't have an account? <span className="text-green-600 font-semibold cursor-pointer hover:underline">Create one</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
