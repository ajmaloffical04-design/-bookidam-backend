import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Search, Sparkles } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import BookingFlow from "@/components/BookingFlow";
import FeatureShowcase from "@/components/FeatureShowcase";
import EventGrid from "@/components/EventGrid";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import FooterFAQ from "@/components/FooterFAQ";

import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getFeaturedEvents() {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*');
    
    if (error) {
      // Use console.warn to avoid triggering the Dev Overlay while still logging details
      console.warn("Supabase Fetch Problem:", error.message || "Network error or invalid URL (Check .env.local)");
      console.dir(error); 
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn("Unexpected Connection Issue:", err);
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
      <FeatureShowcase />
      <BookingFlow />
      <EventGrid events={events} />
      <Testimonials />
      <PricingSection />
      <FooterFAQ />
    </div>
  );
}
