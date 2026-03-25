"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, Home } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/profile");
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        // In Supabase, if email confirmations are on, this prompts them to check mail.
        // If auto-confirm is on, they are logged in.
        setError("Success! Check your email to confirm, or you may be logged in already.");
        setTimeout(() => {
          router.push("/profile");
          router.refresh();
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      if (isLogin) setLoading(false);
      // for signup we intentionally leave loading true during the redirect timeout
    }
  };

  return (
    <div className="min-h-screen bg-eventry-light dark:bg-eventry-dark flex">
      {/* Left side - Image/Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-[#0D1B1B] overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511527661048-7fe75d85e9a4?w=1200&q=80" 
            alt="Event Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B1B]/80 via-[#0D1B1B]/40 to-[#00A372]/30 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-lg">
          <Link href="/" className="inline-flex items-center gap-2 mb-12 text-white/50 hover:text-white transition-colors">
            <Home size={20} />
            <span className="font-bold tracking-widest uppercase text-sm">Back to Home</span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
              Exclusive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A372] to-[#00E5A3]">
                Access
              </span>
            </h1>
            <p className="text-lg text-white/70 font-medium leading-relaxed max-w-sm">
              Log in to manage your high-end corporate events, secure VIP tickets, and access your concierge dashboard.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-eventry-dark dark:text-white/50 hover:text-primary-500 transition-colors">
              <Home size={20} />
              <span className="font-bold tracking-widest uppercase text-sm">Return Home</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card-light dark:glass-card-dark p-8 sm:p-10"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-black text-eventry-dark dark:text-white uppercase tracking-tight mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                {isLogin 
                  ? "Enter your credentials to access your dashboard." 
                  : "Join us to start booking premium events."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-eventry-dark dark:text-gray-300 uppercase tracking-widest pl-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-eventry-dark dark:text-white font-medium placeholder-gray-400 backdrop-blur-sm"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-eventry-dark dark:text-gray-300 uppercase tracking-widest pl-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-eventry-dark dark:text-white font-medium placeholder-gray-400 backdrop-blur-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className={`text-sm font-bold p-3 rounded-xl flex items-center justify-center text-center ${error.includes('Success') ? 'bg-primary-500/10 text-primary-600 border border-primary-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 mt-4 bg-[#0D1B1B] dark:bg-white text-white dark:text-[#0D1B1B] rounded-2xl font-bold uppercase tracking-widest hover:bg-primary-500 dark:hover:bg-primary-500 dark:hover:text-white transition-all shadow-xl hover:shadow-primary-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-gray-100 dark:border-white/5 pt-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {isLogin ? "Need access to exclusive events?" : "Already have an account?"}
                <button 
                  type="button"
                  onClick={() => { setIsLogin(!isLogin); setError(null); }}
                  className="ml-2 font-bold text-primary-500 hover:text-eventry-dark dark:hover:text-white uppercase tracking-wider transition-colors focus:outline-none"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
