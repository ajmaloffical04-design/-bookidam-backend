import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Search, Sparkles } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
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
      console.error("Supabase fetch error:", error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("Fetch error:", err);
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
      <EventGrid events={events} />
      <Testimonials />
      <PricingSection />
      <FooterFAQ />
    </div>
  );
}
