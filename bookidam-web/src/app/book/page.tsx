"use client";

import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

    // Prepare payload with formatted dates as DD-MM-YYYY
    const payload = {
      ...formData,
      event_start_date: formatDateToDDMMYYYY(formData.event_start_date),
      event_end_date: formatDateToDDMMYYYY(formData.event_end_date),
      selected_date: isMultiDay && formData.selected_date ? formatDateToDDMMYYYY(formData.selected_date) : null,
    };

    try {
      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");
      const res = await fetch(`${apiUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert("Failed to submit booking. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white dark:bg-gray-900 transition-colors">
        <div className="w-10 h-10 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-md w-full rounded-3xl p-10 text-center liquid-glass dark:bg-gray-800/50 dark:border-gray-700">
          <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-3">Booking Received!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Thank you for reaching out. Our team of expert coordinators will review your request and contact you shortly to confirm the details.
          </p>
          <Link href="/" className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-600 text-white font-medium rounded-full hover:bg-primary-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800/50 text-primary-700 dark:text-primary-400 text-sm font-medium mb-6 transition-colors">
          <Sparkles size={16} className="text-primary-600 dark:text-primary-400" />
          <span>Concierge Service</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight mb-4 transition-colors">
          Plan Your Dream Event
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed transition-colors">
          Tell us your vision, preferred slots, and budget. Our dedicated event managers will handle the venues, the vendors, and the vibes.
        </p>
      </div>

      <div className="rounded-[2rem] p-8 md:p-12 liquid-glass dark:bg-gray-800/50 dark:border-gray-700 relative overflow-hidden transition-colors">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 dark:bg-primary-900/20 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
          
          {/* Section 1 */}
          <div>
            <h3 className="text-xl font-bold text-black dark:text-white mb-6 flex items-center transition-colors">
              <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 flex items-center justify-center text-sm mr-3 transition-colors">1</span>
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">Full Name</label>
                <input required type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="John Doe" className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 dark:bg-gray-700 transition-colors"></div>

          {/* Section 2 */}
          <div>
            <h3 className="text-xl font-bold text-black dark:text-white mb-6 flex items-center transition-colors">
              <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 flex items-center justify-center text-sm mr-3 transition-colors">2</span>
              Event Specifics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className={formData.eventType === "Other" ? "md:col-span-1" : "md:col-span-2"}>
                <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">Event Type</label>
                <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light text-black dark:text-white">
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Tournament">Tournament</option>
                  <option value="Cultural Programme">Cultural Programme</option>
                  <option value="Private Party">Private Party</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Summit">Summit</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.eventType === "Other" && (
                <div className="animate-in fade-in slide-in-from-top-2">
                  <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">Custom Event Type</label>
                  <input required type="text" name="custom_event_type" value={formData.custom_event_type} onChange={handleChange} placeholder="e.g. Masterclass" className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">Name of Event (Optional)</label>
                <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} placeholder="e.g. John's 30th Birthday" className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
              </div>

              {/* Date Ranges */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">Start Date</label>
                <input required type="date" name="event_start_date" value={formData.event_start_date} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light text-black dark:text-white" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">End Date (or same as Start Date)</label>
                <input required type="date" name="event_end_date" value={formData.event_end_date} onChange={handleChange} min={formData.event_start_date} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light text-black dark:text-white" />
              </div>

              {isMultiDay && (
                <div className="md:col-span-2 p-5 bg-primary-50/50 dark:bg-primary-900/10 rounded-2xl border border-primary-100 dark:border-primary-900 animate-in fade-in slide-in-from-top-2 transition-colors">
                   <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">Select Target Date Within Range (Optional)</label>
                   <input type="date" name="selected_date" value={formData.selected_date} onChange={handleChange} min={formData.event_start_date} max={formData.event_end_date} className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-primary-200 dark:border-primary-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light text-black dark:text-white" />
                   <p className="text-xs text-primary-600 dark:text-primary-400 mt-2 transition-colors">Only needed if you are seeking a specific single day slot within this multi-day range.</p>
                </div>
              )}

              {/* Added Time Slot dropdown */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">Preferred Time Slot</label>
                <select required name="time_slot" value={formData.time_slot} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light text-black dark:text-white">
                  <option value="">Select Time Slot...</option>
                  <option value="Morning (9:00 AM - 1:00 PM)">Morning (9:00 AM - 1:00 PM)</option>
                  <option value="Afternoon (2:00 PM - 6:00 PM)">Afternoon (2:00 PM - 6:00 PM)</option>
                  <option value="Evening (7:00 PM - 11:00 PM)">Evening (7:00 PM - 11:00 PM)</option>
                  <option value="Full Day">Full Day</option>
                  <option value="Other / Multi-Slot">Other / Multi-Slot</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">Estimated Budget / Price (₹)</label>
                <input required type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="50000" className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
              </div>

               <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">City / Location</label>
                <input required type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} placeholder="e.g. Calicut" className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">Event Image Banner URL (Optional)</label>
                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black dark:text-white mb-2 transition-colors">Vision & Requirements</label>
                <textarea rows={4} name="description" value={formData.description} onChange={handleChange} placeholder="Tell us about the theme, exact venue preferences, number of guests, catering requirements..." className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-light resize-none text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-black dark:bg-primary-600 text-white font-medium rounded-xl hover:bg-gray-900 dark:hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> 
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2 text-lg">
                  Submit Request <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4 font-light transition-colors">
              By submitting, you agree to our Terms of Service. No payment required yet.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
