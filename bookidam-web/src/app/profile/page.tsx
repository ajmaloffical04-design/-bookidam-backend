"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Settings, 
  LogOut, 
  Ticket, 
  ChevronRight, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "March 2026",
    status: "Premium Member",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  });

  useEffect(() => {
    const auth = localStorage.getItem("bookidam_auth");
    if (!auth) {
      router.push("/login?callback=/profile");
    } else {
      fetchBookings();
      setLoading(false);
    }
  }, [router]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (data) setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("bookidam_auth");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-eventry-light dark:bg-eventry-dark transition-colors">
        <div className="w-10 h-10 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-eventry-light dark:bg-eventry-dark transition-colors duration-500 pb-24">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[3rem] p-10 md:p-14 bg-white/40 dark:bg-white/5 backdrop-blur-3xl border border-white/30 dark:border-white/10 shadow-2xl mb-12 overflow-hidden"
        >
          {/* Decorative Glows */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src={user.avatar} 
                alt="Avatar" 
                className="relative w-32 h-32 md:w-44 md:h-44 rounded-[2.2rem] bg-white dark:bg-gray-800 border-2 border-white/50 dark:border-white/10 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-500 border-4 border-white dark:border-gray-900 rounded-full flex items-center justify-center text-white shadow-lg">
                <ShieldCheck size={20} />
              </div>
            </div>

            <div className="text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold tracking-widest uppercase border border-primary-500/20">
                <Sparkles size={14} />
                {user.status}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-eventry-dark dark:text-white tracking-tight">
                {user.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-500 dark:text-gray-400 font-light text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-primary-500/70" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary-500/70" />
                  Joined {user.memberSince}
                </div>
              </div>
            </div>

            <div className="md:ml-auto flex flex-col gap-3 w-full md:w-auto">
              <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-eventry-dark dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-white/10 transition-all shadow-sm">
                <Settings size={20} />
                Edit Profile
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl font-semibold hover:bg-red-100 dark:hover:bg-red-500/20 transition-all border border-red-200 dark:border-red-500/20"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Recent Bookings */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="flex items-center justify-between px-2">
              <h2 className="text-3xl font-bold text-eventry-dark dark:text-white flex items-center gap-3">
                <Ticket className="text-primary-500" />
                Recent Booking Requests
              </h2>
              <Link href="/book" className="text-primary-500 font-semibold flex items-center gap-1 hover:underline text-sm">
                Plan New <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="space-y-4">
              {bookings.length > 0 ? bookings.map((booking, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  key={booking.id}
                  className="group relative rounded-[2rem] p-6 bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 hover:border-primary-500/30 transition-all shadow-xl hover:shadow-2xl overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary-500/10 text-primary-600 flex items-center justify-center font-bold text-xl overflow-hidden border border-white/10">
                        {booking.image_url ? (
                          <img src={booking.image_url} alt="Booking" className="w-full h-full object-cover" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-eventry-dark dark:text-white group-hover:text-primary-500 transition-colors">
                          {booking.event_name || booking.event_type}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 font-light text-sm mt-1">
                          Requested for <span className="font-semibold text-eventry-dark dark:text-gray-300">{booking.event_date}</span> • {booking.preferred_location}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="px-4 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold tracking-tight border border-orange-500/20 capitalize">
                        Pending Review
                      </span>
                      <ChevronRight className="text-gray-300 dark:text-gray-600 group-hover:text-primary-500 transition-all group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="rounded-[2.5rem] p-12 text-center border-2 border-dashed border-gray-200 dark:border-white/10 opacity-60">
                  <Ticket size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p className="text-gray-500 dark:text-gray-400">You haven't requested any events yet.</p>
                  <Link href="/book" className="text-primary-500 font-bold mt-2 inline-block">Start Planning</Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Account Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-eventry-dark dark:text-white px-2">Account Summary</h2>
            
            <div className="rounded-[2.5rem] p-8 bg-[#0D1B1B] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl"></div>
               <div className="relative z-10 space-y-8">
                 <div className="space-y-1">
                   <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Current Loyalty Level</p>
                   <h3 className="text-3xl font-black text-primary-400 flex items-center gap-2">
                     GOLD PLAN <Sparkles size={24} />
                   </h3>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                     <p className="text-[10px] uppercase font-bold text-white/40 mb-1">Total Savings</p>
                     <p className="text-2xl font-bold text-white">₹12,450</p>
                   </div>
                   <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                     <p className="text-[10px] uppercase font-bold text-white/40 mb-1">Events Managed</p>
                     <p className="text-2xl font-bold text-white">08</p>
                   </div>
                 </div>

                 <button className="w-full py-4 bg-primary-500 hover:bg-primary-600 rounded-2xl font-bold text-white transition-all shadow-lg shadow-primary-500/20">
                    Upgrade to Diamond
                 </button>
               </div>
            </div>

            <div className="rounded-[2.5rem] p-8 bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl space-y-6">
               <h3 className="text-lg font-bold text-eventry-dark dark:text-white">Quick Settings</h3>
               <div className="space-y-4">
                 {[
                   { icon: Phone, label: "Update Phone Number", color: "text-blue-500" },
                   { icon: MapPin, label: "Saved Locations", color: "text-red-500" },
                   { icon: ShieldCheck, label: "Security & Privacy", color: "text-green-500" },
                 ].map((item, i) => (
                   <button key={i} className="flex items-center gap-4 w-full p-4 hover:bg-white/50 dark:hover:bg-white/5 rounded-2xl transition-all group">
                     <div className={`w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${item.color}`}>
                       <item.icon size={18} />
                     </div>
                     <span className="font-semibold text-eventry-dark dark:text-gray-300 flex-1 text-left">{item.label}</span>
                     <ChevronRight size={16} className="text-gray-300" />
                   </button>
                 ))}
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
