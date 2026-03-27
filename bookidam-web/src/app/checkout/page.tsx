"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, QrCode, CreditCard, User, Mail, Phone, Briefcase, Calendar, MapPin, Ticket } from "lucide-react";
import QRCode from "react-qr-code";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const eventId = searchParams.get("eventId");
  const type = searchParams.get("type");
  const date = searchParams.get("date");
  const slot = searchParams.get("slot");
  const isSuccessRedirect = searchParams.get("success") === "true";
  const redirectBookingId = searchParams.get("bookingId");

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(isSuccessRedirect ? 3 : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState(redirectBookingId || "");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  useEffect(() => {
    if (!eventId) {
      router.push("/events");
      return;
    }

    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      if (data && !error) {
        setEvent(data);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [eventId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPrice = () => {
    if (!event) return 0;
    if (type === "full") return event.fullEventPrice || 0;
    // For single, we'd ideally pass price in URL, but let's fall back to DB default or 0
    // Try to extract price from URL if passed, else fallback
    const passedPrice = searchParams.get("price");
    if (passedPrice) return parseInt(passedPrice);
    return event.singleDayPrice || parseFloat(event.budget) || 0;
  };

  const price = getPrice();

  const handleConfirmAndPay = async () => {
    setIsSubmitting(true);
    
    const newBookingId = "BKG-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    try {
      const { error } = await supabase.from('bookings').insert([{
        client_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event_name: event.title,
        event_type: event.type,
        event_date: date || "",
        preferred_time: slot || "",
        description: `Company: ${formData.company} | Ticket: ${newBookingId} | Status: ${price > 0 ? "Pending Payment" : "Confirmed"}`
      }]);

      if (error) {
        console.error("Supabase insert error:", error);
      }
      
      if (price > 0) {
          // Initialize PhonePe Payment
          const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
          const res = await fetch(`${apiUrl}/api/payments/create`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  booking_ref: newBookingId,
                  amount: price,
                  user_id: formData.email,
                  phone: formData.phone,
                  email: formData.email,
                  client_name: formData.name
              })
          });
          const data = await res.json();
          if (data.success && data.redirectUrl) {
              window.location.href = data.redirectUrl; // Redirect to PhonePe
              return;
          } else {
              alert("Payment Gateway Error: " + data.error);
              setIsSubmitting(false);
              return;
          }
      } else {
          // Free event: Send email directly
          const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
          fetch(`${apiUrl}/api/payments/send-ticket`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ booking_ref: newBookingId })
          }).catch(console.error);
      }

      setBookingId(newBookingId);
      setStep(3); // Go to Success Step
      
    } catch (err) {
      console.error(err);
      alert("Error processing booking");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-eventry-light dark:bg-eventry-dark">
        <div className="w-10 h-10 border-4 border-[#00A372]/20 border-t-[#00A372] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!event && !loading) {
    return <div className="min-h-screen flex items-center justify-center">Event not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-eventry-dark pb-24 pt-32 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Progress Tracker */}
        {step < 3 && (
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-[#00A372] text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
              <span className={`font-semibold text-sm ${step >= 1 ? 'text-[#00A372]' : 'text-gray-400'}`}>Details</span>
            </div>
            <div className={`w-16 h-1 mx-4 rounded-full ${step >= 2 ? 'bg-[#00A372]' : 'bg-gray-200'}`}></div>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-[#00A372] text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
              <span className={`font-semibold text-sm ${step >= 2 ? 'text-[#00A372]' : 'text-gray-400'}`}>Review & Book</span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* STEP 1: USER DETAILS */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
              <button onClick={() => router.back()} className="flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Event
              </button>
              
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight uppercase">Attendee Details</h2>
              <p className="text-gray-500 mb-8 font-medium">Please provide your details below. Your ticket will be sent to this email address.</p>
              
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1 flex items-center gap-2">
                      <User size={14} className="text-[#00A372]" /> Full Name
                    </label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#00A372]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1 flex items-center gap-2">
                      <Mail size={14} className="text-[#00A372]" /> Email Address
                    </label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#00A372]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1 flex items-center gap-2">
                      <Phone size={14} className="text-[#00A372]" /> Phone Number
                    </label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#00A372]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1 flex items-center gap-2">
                      <Briefcase size={14} className="text-[#00A372]" /> Company / Title
                    </label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Optional" className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#00A372]" />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 mt-8">
                  <button type="submit" className="w-full py-5 bg-[#0D1B1B] text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-[#00A372] transition-colors">
                    Continue to Summary
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 2: SUMMARY & PAYMENT */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
              <button onClick={() => setStep(1)} className="flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Details
              </button>

              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight uppercase">Order Summary</h2>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-3xl mb-8 border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  {event.image_url || event.imageUrl ? (
                    <img src={event.image_url || event.imageUrl} alt={event.title} className="w-32 h-32 rounded-2xl object-cover shadow-sm" />
                  ) : (
                    <div className="w-32 h-32 rounded-2xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <Ticket className="text-gray-400" size={32} />
                    </div>
                  )}
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-[#00A372]/10 text-[#00A372] text-[10px] font-black uppercase tracking-wider rounded-lg mb-2">
                      {event.type}
                    </span>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight uppercase mb-4">{event.title}</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                        <Calendar size={16} className="text-[#00A372]" /> {date}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                        <Ticket size={16} className="text-[#00A372]" /> {slot}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                        <MapPin size={16} className="text-[#00A372]" /> {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                        <User size={16} className="text-[#00A372]" /> {formData.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-6 border-t border-gray-100 dark:border-gray-800 mb-8">
                <span className="text-xl font-black uppercase text-gray-900 dark:text-white">Total Checkout</span>
                <span className="text-4xl font-black text-[#00A372]">${price}</span>
              </div>

              {price > 0 && (
                <div className="p-4 mb-8 bg-amber-50 rounded-xl text-amber-800 text-sm font-medium flex items-center gap-3">
                  <CreditCard size={20} className="flex-shrink-0" />
                  Payment gateway integration via Razorpay/Stripe pending setup. Click to proceed for now.
                </div>
              )}

              <button 
                onClick={handleConfirmAndPay}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-5 bg-[#0D1B1B] text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-[#00A372] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    {price > 0 ? "Confirm & Proceed to Payment" : "Confirm Booking"}
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* STEP 3: SUCCESS & TICKET */}
          {step === 3 && (
             <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-800 text-center">
                <div className="w-24 h-24 bg-[#00A372]/10 text-[#00A372] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Booking Confirmed!</h2>
                <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto">
                  Your ticket has been generated. An email confirmation has been sent to <span className="text-gray-900 dark:text-white font-bold">{formData.email}</span>.
                </p>

                {/* TICKET UI */}
                <div className="relative bg-gray-50 dark:bg-gray-800 rounded-[2rem] border-2 border-dashed border-[#00A372]/30 p-8 max-w-sm mx-auto mb-10 overflow-hidden shadow-inner">
                  {/* Decorative Ticket Cutouts */}
                  <div className="absolute top-1/2 -left-4 w-8 h-8 bg-white dark:bg-gray-900 rounded-full -translate-y-1/2"></div>
                  <div className="absolute top-1/2 -right-4 w-8 h-8 bg-white dark:bg-gray-900 rounded-full -translate-y-1/2"></div>
                  
                  <h3 className="text-lg font-black uppercase text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">{event.title}</h3>
                  
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-xl inline-block shadow-sm mb-6 border border-gray-100 dark:border-gray-800">
                    <QRCode value={bookingId} size={150} level="H" />
                  </div>
                  
                  <div className="space-y-4 text-left">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Booking ID</p>
                      <p className="font-black text-gray-900 dark:text-white tracking-widest">{bookingId}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Date</p>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{date}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Slot</p>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{slot}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Attendee Name</p>
                      <p className="font-bold text-gray-900 dark:text-white text-sm uppercase">{formData.name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-[#00A372] text-white font-bold rounded-2xl shadow-lg hover:bg-[#008f63] transition-colors flex justify-center items-center gap-2 uppercase tracking-wide">
                    <QrCode size={18} /> Download Ticket
                  </button>
                  <button onClick={() => router.push('/events')} className="px-8 py-4 bg-gray-100 text-gray-800 font-bold rounded-2xl hover:bg-gray-200 transition-colors uppercase tracking-wide">
                    Browse More Events
                  </button>
                </div>
             </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
