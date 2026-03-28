"use client";

import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

// Date formatting helper to ensure payloads send as DD-MM-YYYY
const formatDateToDDMMYYYY = (dateString: string) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function BookEvent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("bookidam_auth");
    if (!auth) {
      router.push("/login?callback=/book");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    eventType: "Corporate Event",
    custom_event_type: "",
    eventName: "",
    event_start_date: "",
    event_end_date: "",
    selected_date: "", // strictly for multi-day forms
    time_slot: "",
    preferredLocation: "",
    budget: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isMultiDay = formData.event_start_date && formData.event_end_date && formData.event_start_date !== formData.event_end_date;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      client_name: formData.clientName,
      phone: formData.phone,
      email: formData.email,
      event_type: formData.eventType === "Other" ? formData.custom_event_type : formData.eventType,
      event_name: formData.eventName,
      event_date: formatDateToDDMMYYYY(formData.event_start_date) || "",
      preferred_location: formData.preferredLocation,
      preferred_time: formData.time_slot,
      budget: formData.budget,
      image_url: formData.imageUrl,
      description: `End Date: ${formatDateToDDMMYYYY(formData.event_end_date)}
${isMultiDay && formData.selected_date ? `Target Date: ${formatDateToDDMMYYYY(formData.selected_date)}\n` : ''}
User Description:
${formData.description}`
    };

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([payload]);

      if (error) {
        console.error("Supabase insert error:", error);
        alert("Failed to submit booking. Please check your connection.");
      } else {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Make sure your environment variables are set.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-eventry-light dark:bg-eventry-dark transition-colors">
        <div className="w-10 h-10 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-eventry-light dark:bg-eventry-dark transition-colors duration-500 pb-20">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="min-h-[80vh] flex items-center justify-center p-6"
          >
            <div className="max-w-md w-full rounded-[2.5rem] p-10 text-center bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
              >
                <CheckCircle2 size={48} />
              </motion.div>
              <h2 className="text-3xl font-bold text-eventry-dark dark:text-white mb-4">Booking Received!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-light">
                Thank you for reaching out. Our team will review your request and get back to you shortly.
              </p>
              <Link href="/" className="group inline-flex items-center justify-center w-full px-8 py-4 bg-primary-600 text-white font-semibold rounded-2xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-600/20">
                Back to Home <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-6 py-12 md:py-24"
          >
            <div className="text-center mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-100/50 dark:border-primary-800/30 text-primary-700 dark:text-primary-400 text-sm font-medium mb-8 backdrop-blur-md"
              >
                <Sparkles size={16} className="text-primary-500" />
                <span>Concierge Event Planning</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold text-eventry-dark dark:text-white tracking-tight mb-6 transition-colors">
                Plan Your <span className="text-primary-500">Dream</span> Event
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                Tell us your vision, and we'll handle the venues, vendors, and vibes. Your perfect event starts here.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-[3rem] p-8 md:p-14 bg-white/40 dark:bg-white/5 backdrop-blur-3xl border border-white/30 dark:border-white/10 relative overflow-hidden shadow-2xl"
            >
              {/* Decorative Accents */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
                {/* Section 1 */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-primary-500 text-white flex items-center justify-center font-bold shadow-lg shadow-primary-500/30">1</div>
                    <h3 className="text-2xl font-bold text-eventry-dark dark:text-white">Personal Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                      <input required type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="John Doe" className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-light text-eventry-dark dark:text-white placeholder-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-light text-eventry-dark dark:text-white placeholder-gray-400" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Phone Number</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-light text-eventry-dark dark:text-white placeholder-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent"></div>

                {/* Section 2 */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-primary-500 text-white flex items-center justify-center font-bold shadow-lg shadow-primary-500/30">2</div>
                    <h3 className="text-2xl font-bold text-eventry-dark dark:text-white">Event Specifics</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className={formData.eventType === "Other" ? "md:col-span-1 space-y-2" : "md:col-span-2 space-y-2"}>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Event Type</label>
                      <div className="relative">
                        <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-light text-eventry-dark dark:text-white appearance-none cursor-pointer">
                          <option value="Corporate Event">Corporate Event</option>
                          <option value="Tournament">Tournament</option>
                          <option value="Cultural Programme">Cultural Programme</option>
                          <option value="Private Party">Private Party</option>
                          <option value="Seminar">Seminar</option>
                          <option value="Summit">Summit</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={20} />
                      </div>
                    </div>

                    {formData.eventType === "Other" && (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Specify Type</label>
                        <input required type="text" name="custom_event_type" value={formData.custom_event_type} onChange={handleChange} placeholder="e.g. Masterclass" className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-light text-eventry-dark dark:text-white placeholder-gray-400" />
                      </motion.div>
                    )}

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Event Name (Optional)</label>
                      <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} placeholder="e.g. Annual Tech Symposium" className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-light text-eventry-dark dark:text-white placeholder-gray-400" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Start Date</label>
                      <input required type="date" name="event_start_date" value={formData.event_start_date} onChange={handleChange} className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-light text-eventry-dark dark:text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">End Date</label>
                      <input required type="date" name="event_end_date" value={formData.event_end_date} onChange={handleChange} min={formData.event_start_date} className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-light text-eventry-dark dark:text-white" />
                    </div>

                    {isMultiDay && (
                      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="md:col-span-2 p-6 bg-primary-500/5 dark:bg-primary-500/10 rounded-3xl border border-primary-500/20">
                         <label className="block text-sm font-medium text-primary-700 dark:text-primary-400 mb-3">Target Date Within Range (Optional)</label>
                         <input type="date" name="selected_date" value={formData.selected_date} onChange={handleChange} min={formData.event_start_date} max={formData.event_end_date} className="w-full px-6 py-4 bg-white dark:bg-gray-900 border border-primary-500/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all text-eventry-dark dark:text-white" />
                         <p className="text-xs text-primary-600/70 dark:text-primary-400/70 mt-3 italic">Specify if you need a single slot within this multi-day event.</p>
                      </motion.div>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Preferred Time Slot</label>
                      <div className="relative">
                        <select required name="time_slot" value={formData.time_slot} onChange={handleChange} className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-light text-eventry-dark dark:text-white appearance-none cursor-pointer">
                          <option value="">Select Time Slot...</option>
                          <option value="Morning (9:00 AM - 1:00 PM)">Morning (9:00 AM - 1:00 PM)</option>
                          <option value="Afternoon (2:00 PM - 6:00 PM)">Afternoon (2:00 PM - 6:00 PM)</option>
                          <option value="Evening (7:00 PM - 11:00 PM)">Evening (7:00 PM - 11:00 PM)</option>
                          <option value="Full Day">Full Day</option>
                          <option value="Other / Multi-Slot">Other / Multi-Slot</option>
                        </select>
                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={20} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Estimated Budget (₹)</label>
                      <input required type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="50,000" className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-light text-eventry-dark dark:text-white placeholder-gray-400" />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">City / Location</label>
                      <input required type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} placeholder="e.g. Kozhikode, Kerala" className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-light text-eventry-dark dark:text-white placeholder-gray-400" />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Event Reference Image URL</label>
                      <input 
                        type="url" 
                        name="imageUrl" 
                        value={formData.imageUrl} 
                        onChange={handleChange} 
                        placeholder="https://images.unsplash.com/your-image-url" 
                        className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-light text-eventry-dark dark:text-white placeholder-gray-400" 
                      />
                    </div>

                    {formData.imageUrl && (
                      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="md:col-span-2 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-lg h-48 relative group">
                        <img 
                          src={formData.imageUrl} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                          onError={(e) => (e.currentTarget.style.display = 'none')} 
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-bold uppercase tracking-widest">Image Preview</span>
                        </div>
                      </motion.div>
                    )}

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Vision & Requirements</label>
                      <textarea rows={6} name="description" value={formData.description} onChange={handleChange} placeholder="Describe your dream event... Theme, guest count, catering needs, etc." className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-light resize-none text-eventry-dark dark:text-white placeholder-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={loading}
                    className="w-full group relative flex items-center justify-center h-16 bg-primary-600 dark:bg-primary-500 text-white font-bold rounded-2xl overflow-hidden shadow-xl shadow-primary-600/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {loading ? (
                      <div className="relative flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> 
                        <span>Securing Slot...</span>
                      </div>
                    ) : (
                      <div className="relative flex items-center gap-2 text-lg">
                        Submit Booking Request <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    )}
                  </motion.button>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 font-light">
                    No payment required at this stage. Our team will contact you within 24 hours.
                  </p>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
