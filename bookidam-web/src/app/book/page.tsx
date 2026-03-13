"use client";

import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    eventType: "Wedding",
    eventName: "",
    eventDate: "",
    preferredLocation: "",
    budget: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");
      const res = await fetch(`${apiUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 text-center premium-shadow border border-gray-100">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Booking Received!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you for reaching out. Our team of expert coordinators will review your request and contact you shortly to confirm the details.
          </p>
          <Link href="/" className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-medium mb-6">
          <Sparkles size={16} className="text-green-600" />
          <span>Concierge Service</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
          Plan Your Dream Event
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          Tell us your vision, budget, and timeline. Our dedicated event managers will handle the venues, the vendors, and the vibes.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] p-8 md:p-12 premium-shadow border border-gray-100 relative overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
          
          {/* Section 1 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm mr-3">1</span>
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input required type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="John Doe" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light" />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Section 2 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm mr-3">2</span>
              Event Specifics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light text-gray-900">
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Tournament">Tournament</option>
                  <option value="Cultural Programme">Cultural Programme</option>
                  <option value="Private Party">Private Party</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name of Event (Optional)</label>
                <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} placeholder="e.g. John's 30th Birthday" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                <input required type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Image Banner URL (Optional)</label>
                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City / Location</label>
                <input required type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} placeholder="e.g. Calicut" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Budget (₹)</label>
                <input required type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="25000" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Vision & Requirements</label>
                <textarea rows={4} name="description" value={formData.description} onChange={handleChange} placeholder="Tell us about the theme, exact venue preferences, number of guests, catering requirements..." className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-light resize-none" />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed group"
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
            <p className="text-center text-sm text-gray-500 mt-4 font-light">
              By submitting, you agree to our Terms of Service. No payment required yet.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
