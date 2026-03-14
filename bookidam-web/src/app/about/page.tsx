import { MapPin, Calendar, Heart, Shield, Users, Trophy } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | BOOKIDAM",
  description: "Learn about BOOKIDAM's mission to revolutionize event planning and coordination.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 px-6 bg-gray-900 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-900/40 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-800/20 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center mt-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Redefining How <br className="hidden md:block"/> We <span className="text-primary-400">Experience Events</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            BOOKIDAM is more than a booking platform. We are the architects of your most memorable moments, removing the friction from event planning so you can focus on the experience.
          </p>
        </div>
      </section>

      {/* Our Story / Mission */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="People celebrating at an event" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
          </div>
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium">
              <Heart size={16} />
              <span>Our Story</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              Born from the chaos of coordination.
            </h2>
            
            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
              <p>
                Founded in 2026 in Calicut, BOOKIDAM started with a simple observation: attending events is joyous, but organizing them is a nightmare. From managing vendors to tracking RSVPs, the fragmentation of tools made it incredibly stressful.
              </p>
              <p>
                We set out to build a single destination where the passion of event creators meets the enthusiasm of attendees. A platform where premium experiences aren't just promised, but effortlessly delivered.
              </p>
              <p>
                Today, BOOKIDAM serves as the bridge between incredible venues, talented performers, and the audiences who love them, powering everything from local football tournaments to grand corporate galas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 border-y border-gray-100 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">Why Choose BOOKIDAM?</h2>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">Our principles ensure that every interaction on our platform is secure, seamless, and spectacular.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="p-10 rounded-3xl liquid-glass hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Absolute Reliability</h3>
            <p className="text-gray-500 font-light leading-relaxed">
              We vet every venue and vendor. When you book through us, you're guaranteed a premium standard, backed by our dedicated support team.
            </p>
          </div>

          {/* Value 2 */}
          <div className="p-10 rounded-3xl liquid-glass hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Community First</h3>
            <p className="text-gray-500 font-light leading-relaxed">
              We believe events are the heartbeat of local culture. Our platform highlights local talent and grassroots sports, bringing communities together.
            </p>
          </div>

          {/* Value 3 */}
          <div className="p-10 rounded-3xl liquid-glass hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <Trophy size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Experience</h3>
            <p className="text-gray-500 font-light leading-relaxed">
              From our beautifully designed app to the actual event day, we obsess over every detail to provide a flawless, high-end experience.
            </p>
          </div>
        </div>
      </section>

      {/* Team / Stats */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-16">By the Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <p className="text-5xl font-bold text-primary-600">500+</p>
            <p className="text-gray-500 font-medium">Events Hosted</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl font-bold text-primary-600">10k+</p>
            <p className="text-gray-500 font-medium">Happy Attendees</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl font-bold text-primary-600">50+</p>
            <p className="text-gray-500 font-medium">Premium Venues</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl font-bold text-primary-600">4.9</p>
            <p className="text-gray-500 font-medium">Average Rating</p>
          </div>
        </div>
      </section>

    </div>
  );
}
