import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Search, Sparkles } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import BookingFlow from "@/components/BookingFlow";
import EventGrid from "@/components/EventGrid";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import FooterFAQ from "@/components/FooterFAQ";

import { supabase } from "@/lib/supabase";

async function getFeaturedEvents() {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('featured', { ascending: false });
    
    if (error) {
      console.error("Supabase fetch error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("Unexpected Fetch Error:", err);
    return [];
  }
}

export default async function Home() {
  const events = await getFeaturedEvents();

  return (
    <div className="flex flex-col w-full overflow-hidden bg-eventry-light">
      <HeroSection />
      <Marquee />
      <AboutSection />
      <BookingFlow />
      <EventGrid events={events} />
      {events.length === 0 && (
        <div className="max-w-7xl mx-auto py-20 text-center">
          <div className="inline-block p-12 glass-card-light border-dashed border-gray-300">
            <Sparkles className="mx-auto text-primary-500 mb-6 group-hover:animate-pulse" size={48} />
            <h3 className="text-2xl font-black text-eventry-dark mb-4 uppercase tracking-tighter">Stay Tuned!</h3>
            <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
              We're currently updating our event calendar. Check back soon for the most exclusive corporate summits and professional gatherings.
            </p>
          </div>
        </div>
      )}
      <Testimonials />
      <PricingSection />
      <FooterFAQ />
    </div>
  );
}
