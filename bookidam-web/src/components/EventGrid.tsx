"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight, X, Ticket } from "lucide-react";
import { useState } from "react";

const formatDateDisplay = (start: string, end: string) => {
  if (!start) return "";
  const formatComponent = (dateString: string) => {
    // Expected format: YYYY-MM-DD
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  const startFormatted = formatComponent(start);
  if (!end || start === end) {
    return startFormatted;
  }
  const endFormatted = formatComponent(end);
  return `${startFormatted} to ${endFormatted}`;
};

// Helper to get all dates between two dates
const getDatesBetween = (start: string, end: string) => {
  const dates = [];
  let currentDate = new Date(start);
  const endDate = new Date(end);
  
  while (currentDate <= endDate) {
    const yyyy = currentDate.getFullYear();
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dd = String(currentDate.getDate()).padStart(2, '0');
    dates.push(`${yyyy}-${mm}-${dd}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

export default function EventGrid({ events, hideHeader = false }: { events: any[], hideHeader?: boolean }) {
  // If no events from API, provide some dummy data fitting the design with multi-day support
  const displayEvents = events && events.length > 0 ? events.map(evt => ({
    ...evt,
    startDate: evt.startDate || evt.date,
    endDate: evt.endDate || evt.date,
    singleDayPrice: evt.singleDayPrice || 50,
    fullEventPrice: evt.fullEventPrice || 120
  })) : [
    {
      id: "1",
      title: "Neon Nights Music Festival 2026",
      type: "Music",
      startDate: "2026-06-15",
      endDate: "2026-06-17",
      location: "Downtown Arena",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      featured: true,
      singleDayPrice: 50,
      fullEventPrice: 120
    },
    {
      id: "2",
      title: "Global Tech Summit",
      type: "Conference",
      startDate: "2026-07-22",
      endDate: "2026-07-22",
      location: "Convention Center",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
      featured: false,
      singleDayPrice: 199,
      fullEventPrice: 199
    },
    {
      id: "3",
      title: "Creative Arts Expo",
      type: "Exhibition",
      startDate: "2026-08-10",
      endDate: "2026-08-14",
      location: "Gallery Row",
      imageUrl: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=500&q=80",
      featured: false,
      singleDayPrice: 25,
      fullEventPrice: 80
    }
  ];

  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [bookingType, setBookingType] = useState<"single" | "full">("single");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const openModal = (evt: any) => {
    setSelectedEvent(evt);
    setBookingType("single");
    setSelectedDate(evt.startDate);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <section className={`w-full bg-white px-6 lg:px-12 relative ${hideHeader ? 'py-12' : 'py-24 md:py-32'}`}>
      <div className="max-w-7xl mx-auto">
        {!hideHeader && (
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
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayEvents.map((evt, idx) => {
            const isFeatured = idx === 0 || evt.featured; 
            const isMultiDay = evt.startDate !== evt.endDate;
            
            return (
              <motion.div
                key={evt.id}
                onClick={() => openModal(evt)}
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
                  
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="w-max px-4 py-2 bg-white text-eventry-dark text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                      {evt.type}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
                    <div className="flex flex-wrap gap-2 p-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 items-center justify-end">
                       <span className="px-3 py-1.5 bg-[#00A372]/10 text-[#00A372] text-xs font-bold uppercase rounded-lg">
                         From ${evt.singleDayPrice} / Day
                       </span>
                       {isMultiDay && (
                         <span className="px-3 py-1.5 bg-eventry-dark/5 text-eventry-dark text-xs font-bold uppercase rounded-lg">
                           ${evt.fullEventPrice} / Full
                         </span>
                       )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl md:text-3xl font-black text-eventry-dark mb-4 leading-tight group-hover:text-[#00A372] transition-colors line-clamp-2 uppercase">
                    {evt.title}
                  </h3>
                  
                  <div className="mt-auto flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-[#00A372]" />
                      <span>{formatDateDisplay(evt.startDate, evt.endDate)}</span>
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

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-eventry-dark/40 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] p-6 md:p-10 max-w-xl w-full mx-auto relative shadow-2xl my-auto"
            >
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 bg-gray-100 text-gray-500 hover:text-eventry-dark hover:bg-gray-200 rounded-full transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>

              <div className="mb-8 pr-12">
                <div className="inline-block px-3 py-1 bg-eventry-dark/5 text-eventry-dark text-xs font-bold uppercase rounded-lg mb-3">
                  {selectedEvent.type}
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-eventry-dark leading-tight uppercase mb-4">
                  {selectedEvent.title}
                </h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold tracking-widest text-[#00A372] uppercase">Select Booking Option</h4>
                  
                  {selectedEvent.startDate !== selectedEvent.endDate ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button 
                        onClick={() => setBookingType("single")}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-start gap-2 transition-all focus:outline-none ${
                          bookingType === "single" 
                            ? "border-[#00A372] bg-[#00A372]/5" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="font-bold text-eventry-dark uppercase text-left">Single Day</span>
                        <span className="text-2xl font-black text-[#00A372]">${selectedEvent.singleDayPrice}</span>
                      </button>
                      
                      <button 
                        onClick={() => setBookingType("full")}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-start gap-2 transition-all focus:outline-none ${
                          bookingType === "full" 
                            ? "border-eventry-dark bg-eventry-dark/5" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="font-bold text-eventry-dark uppercase text-left">Full Event</span>
                        <span className="text-2xl font-black text-eventry-dark">${selectedEvent.fullEventPrice}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl border-2 border-[#00A372] bg-[#00A372]/5 flex flex-col items-start gap-2">
                      <span className="font-bold text-eventry-dark uppercase">Single Day Event</span>
                      <span className="text-2xl font-black text-[#00A372]">${selectedEvent.singleDayPrice}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 text-sm font-semibold tracking-wider text-gray-500 uppercase p-4 bg-gray-50 rounded-2xl">
                  {bookingType === "full" ? (
                    <div className="flex items-center gap-3 text-eventry-dark">
                      <Calendar size={18} className="text-[#00A372]" />
                      <span>{formatDateDisplay(selectedEvent.startDate, selectedEvent.endDate)}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-eventry-dark mb-1">
                        <Calendar size={18} className="text-[#00A372]" />
                        <span>Select Date:</span>
                      </div>
                      <select 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold text-eventry-dark focus:border-[#00A372] focus:ring-0 outline-none transition-colors appearance-none cursor-pointer"
                      >
                        {getDatesBetween(selectedEvent.startDate, selectedEvent.endDate).map(date => (
                          <option key={date} value={date}>
                            {formatDateDisplay(date, date)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 text-eventry-dark mt-2">
                    <MapPin size={18} className="text-[#00A372]" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                  <div className="flex justify-between items-center text-xl font-black uppercase text-eventry-dark">
                    <span>Total Price:</span>
                    <span className="text-3xl text-[#00A372]">
                      ${bookingType === "full" ? selectedEvent.fullEventPrice : selectedEvent.singleDayPrice}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => {
                      alert(`Booking Options:\nEvent: ${selectedEvent.title}\nType: ${bookingType === "full" ? 'Full Event' : 'Single Day'}\nDate: ${bookingType === "full" ? formatDateDisplay(selectedEvent.startDate, selectedEvent.endDate) : formatDateDisplay(selectedDate, selectedDate)}\nPrice: $${bookingType === "full" ? selectedEvent.fullEventPrice : selectedEvent.singleDayPrice}`);
                      closeModal();
                    }}
                    className="w-full py-5 bg-[#00A372] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#008A60] transition-colors flex items-center justify-center gap-2"
                  >
                    <Ticket size={20} />
                    Book Tickets Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
