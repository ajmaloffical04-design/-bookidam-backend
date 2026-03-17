"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";

export default function EventGrid({ events }: { events: any[] }) {
  // If no events from API, provide some dummy data fitting the design
  const displayEvents = events && events.length > 0 ? events : [
    {
      id: "1",
      title: "Neon Nights Music Festival 2026",
      type: "Music",
      date: "2026-06-15",
      location: "Downtown Arena",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      featured: true
    },
    {
      id: "2",
      title: "Global Tech Summit",
      type: "Conference",
      date: "2026-07-22",
      location: "Convention Center",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
      featured: false
    },
    {
      id: "3",
      title: "Creative Arts Expo",
      type: "Exhibition",
      date: "2026-08-10",
      location: "Gallery Row",
      imageUrl: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=500&q=80",
      featured: false
    }
  ];

  return (
    <section className="w-full bg-white py-24 md:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-[#00A372] font-bold tracking-[0.2em] text-sm uppercase mb-4">
              Upcoming Events
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-eventry-dark uppercase">
              Discover what's happening
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              href="/events" 
              className="inline-flex items-center gap-2 pb-1 border-b-2 border-eventry-dark font-bold text-eventry-dark uppercase tracking-wider hover:text-primary-500 hover:border-primary-500 transition-colors"
            >
              See all events <ArrowUpRight size={20} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayEvents.map((evt, idx) => {
            const isFeatured = idx === 0 || evt.featured; // Make the first one large
            
            return (
              <motion.div
                key={evt.id}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`group cursor-pointer flex flex-col ${isFeatured ? 'lg:col-span-2' : 'col-span-1'}`}
              >
                <div className={`relative overflow-hidden rounded-3xl mb-6 bg-gray-100 ${isFeatured ? 'aspect-[2/1] md:aspect-[16/7]' : 'aspect-square md:aspect-[4/3]'}`}>
                  {evt.imageUrl ? (
                    <img 
                      src={evt.imageUrl} 
                      alt={evt.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Calendar className="text-gray-400" size={48} />
                    </div>
                  )}
                  
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="px-4 py-2 bg-white text-eventry-dark text-xs font-bold uppercase tracking-widest rounded-full">
                      {evt.type}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl md:text-3xl font-black text-eventry-dark mb-4 leading-tight group-hover:text-[#00A372] transition-colors line-clamp-2 uppercase">
                    {evt.title}
                  </h3>
                  
                  <div className="mt-auto flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-[#00A372]" />
                      <span>{new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-[#00A372]" />
                      <span className="truncate max-w-[200px]">{evt.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
