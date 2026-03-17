import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Search, Sparkles } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import EventGrid from "@/components/EventGrid";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import FooterFAQ from "@/components/FooterFAQ";

async function getFeaturedEvents() {
  try {
    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");
    const res = await fetch(`${apiUrl}/api/events`, { next: { revalidate: 10 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
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
