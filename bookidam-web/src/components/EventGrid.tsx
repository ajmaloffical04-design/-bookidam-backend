"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, X, Ticket, Clock, Star, ArrowUpRight, ArrowRight } from "lucide-react";
import { useState } from "react";

const formatDateDisplay = (start: string, end: string) => {
  if (!start) return "";
  const formatComponent = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    return `${month} ${day}`;
  };
  const startFormatted = formatComponent(start);
  if (!end || start === end) return startFormatted;
  const endFormatted = formatComponent(end);
  return `${startFormatted} - ${endFormatted}`;
};

const getDatesBetween = (start: string, end: string) => {
  if (!start) return [];
  const dates = [];
  try {
    let currentDate = new Date(start);
    const endDate = end ? new Date(end) : new Date(start);
    if (isNaN(currentDate.getTime())) return [];
    while (currentDate <= endDate) {
      const yyyy = currentDate.getFullYear();
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
      const dd = String(currentDate.getDate()).padStart(2, '0');
      dates.push(`${yyyy}-${mm}-${dd}`);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  } catch(e) {}
  return dates;
};

export default function EventGrid({ events, hideHeader = false }: { events: any[], hideHeader?: boolean }) {
  const router = useRouter();
  const displayEvents = (events || []).map((evt, idx) => {
    const rawDate = evt.startDate || evt.date || evt.eventDate || evt.createdAt || "2026-01-01T00:00:00Z";
    const rawEndDate = evt.endDate || rawDate;
    const rawPrice = evt.price || evt.ticketPrice || evt.singleDayPrice || parseFloat(evt.budget) || 0;
    return {
      ...evt,
      imageUrl: evt.imageUrl || evt.image_url || evt.image || "",
      startDate: rawDate,
      endDate: rawEndDate,
      singleDayPrice: rawPrice,
      fullEventPrice: evt.fullEventPrice || rawPrice,
      description: evt.description || evt.summary || evt.details || "",
      rating: evt.rating || 4.8,
      timeSlots: evt.timeSlots && evt.timeSlots.length > 0 ? evt.timeSlots : [
        { id: `default_${idx}`, name: "Standard Entry", time: "All Day Access", price: rawPrice }
      ]
    };
  });

  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [bookingType, setBookingType] = useState<"single" | "full">("single");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any | null>(null);

  const openModal = (evt: any) => {
    setSelectedEvent(evt);
    setBookingType("single");
    setSelectedDate(evt.startDate);
    setSelectedTimeSlot(evt.timeSlots && evt.timeSlots.length > 0 ? evt.timeSlots[0] : null);
  };

  const closeModal = () => setSelectedEvent(null);

  const getStartingPrice = (evt: any) => {
    if (evt.timeSlots && evt.timeSlots.length > 0) {
      const prices = evt.timeSlots.map((s: any) => s.price).filter((p: number) => p > 0);
      return prices.length > 0 ? Math.min(...prices) : evt.singleDayPrice;
    }
    return evt.singleDayPrice;
  };

  const currentPrice = selectedEvent
    ? (bookingType === "full" ? selectedEvent.fullEventPrice : (selectedTimeSlot ? selectedTimeSlot.price : selectedEvent.singleDayPrice))
    : 0;

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
              <p className="text-[#00A372] font-bold tracking-[0.2em] text-sm uppercase mb-4">Upcoming Events</p>
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

        {/* Premium Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.map((evt, idx) => {
            const startingPrice = getStartingPrice(evt);
            const isImageTop = idx % 2 === 0; // Alternate image position like the reference

            return (
              <motion.div
                key={evt.id}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                onClick={() => openModal(evt)}
                className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.14)] border border-gray-100 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Image Section - Top */}
                {isImageTop && (
                  <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0">
                    {evt.imageUrl ? (
                      <img
                        src={evt.imageUrl}
                        alt={evt.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Calendar className="text-gray-300" size={48} />
                      </div>
                    )}
                    {/* Rating badge on image */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
                      <Star size={13} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-black text-gray-800">{Number(evt.rating).toFixed(1)}</span>
                    </div>
                    {/* Category tags on image */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-gray-700 text-[11px] font-bold rounded-full shadow-sm">
                        {evt.type || "Event"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-black text-gray-900 leading-tight line-clamp-2 group-hover:text-[#00A372] transition-colors">
                      {evt.title}
                    </h3>
                    {!isImageTop && (
                      <span className="flex-shrink-0 px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full uppercase tracking-wider whitespace-nowrap">
                        Top Rated
                      </span>
                    )}
                    {isImageTop && (
                      <span className="flex-shrink-0 px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full uppercase tracking-wider whitespace-nowrap">
                        Top Rated
                      </span>
                    )}
                  </div>

                  {/* Date & Location */}
                  <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm font-medium">
                    <span>{formatDateDisplay(evt.startDate, evt.endDate)}</span>
                    <span className="text-gray-300">•</span>
                    <span className="truncate">{evt.location || "TBA"}</span>
                  </div>

                  {/* Description */}
                  {evt.description && (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                      {evt.description}
                    </p>
                  )}

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div>
                      <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">From</p>
                      <p className="text-2xl font-black text-gray-900">
                        ${startingPrice > 0 ? startingPrice : "—"}
                        <span className="text-sm font-semibold text-gray-400"> / slot</span>
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-3 bg-[#0D1B1B] text-white text-sm font-bold rounded-2xl hover:bg-[#00A372] transition-all duration-300 group-hover:scale-105 shadow-lg shadow-black/10">
                      Book Now
                      <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <ArrowRight size={12} />
                      </span>
                    </button>
                  </div>
                </div>

                {/* Image Section - Bottom (alternate layout) */}
                {!isImageTop && (
                  <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0">
                    {evt.imageUrl ? (
                      <img
                        src={evt.imageUrl}
                        alt={evt.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Calendar className="text-gray-300" size={48} />
                      </div>
                    )}
                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-gray-700 text-[11px] font-bold rounded-full shadow-sm">
                        {evt.type || "Event"}
                      </span>
                    </div>
                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
                      <Star size={13} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-black text-gray-800">{Number(evt.rating).toFixed(1)}</span>
                    </div>
                  </div>
                )}
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
              className="bg-white rounded-[2rem] p-6 md:p-8 max-w-xl w-full mx-auto relative shadow-2xl my-auto"
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 bg-gray-100 text-gray-500 hover:text-eventry-dark hover:bg-gray-200 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              {selectedEvent.imageUrl && (
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-6">
                  <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-eventry-dark/5 text-eventry-dark text-xs font-bold uppercase rounded-lg mb-3">
                  {selectedEvent.type}
                </div>
                <h3 className="text-3xl font-black text-eventry-dark leading-tight uppercase mb-1">
                  {selectedEvent.title}
                </h3>
                {selectedEvent.description && (
                  <p className="text-sm text-gray-500 mt-2">{selectedEvent.description}</p>
                )}
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold tracking-widest text-[#00A372] uppercase">Select Booking Option</h4>
                  {selectedEvent.startDate !== selectedEvent.endDate ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => setBookingType("single")}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-start gap-1 transition-all focus:outline-none ${bookingType === "single" ? "border-[#00A372] bg-[#00A372]/5" : "border-gray-200 hover:border-gray-300"}`}
                      >
                        <span className="font-bold text-eventry-dark uppercase text-left text-sm">Single Day / Slot</span>
                        <span className="text-xl font-black text-[#00A372]">from ${getStartingPrice(selectedEvent)}</span>
                      </button>
                      <button
                        onClick={() => setBookingType("full")}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-start gap-1 transition-all focus:outline-none ${bookingType === "full" ? "border-eventry-dark bg-eventry-dark/5" : "border-gray-200 hover:border-gray-300"}`}
                      >
                        <span className="font-bold text-eventry-dark uppercase text-left text-sm">Full Event Pass</span>
                        <span className="text-xl font-black text-eventry-dark">${selectedEvent.fullEventPrice}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl border-2 border-[#00A372] bg-[#00A372]/5">
                      <span className="font-bold text-eventry-dark uppercase text-sm">Single Day Event — Select your slot</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4 text-sm font-semibold tracking-wider text-gray-500 uppercase p-4 bg-gray-50 rounded-2xl">
                  {bookingType === "full" ? (
                    <div className="flex items-center gap-3 text-eventry-dark">
                      <Calendar size={18} className="text-[#00A372]" />
                      <span>{formatDateDisplay(selectedEvent.startDate, selectedEvent.endDate)} (Full Access)</span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 text-eventry-dark">
                          <Calendar size={18} className="text-[#00A372]" />
                          <span>Select Date:</span>
                        </div>
                        <select
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold text-eventry-dark focus:border-[#00A372] outline-none appearance-none cursor-pointer"
                        >
                          {getDatesBetween(selectedEvent.startDate, selectedEvent.endDate).map(date => (
                            <option key={date} value={date}>{formatDateDisplay(date, date)}</option>
                          ))}
                        </select>
                      </div>
                      {selectedEvent.timeSlots && selectedEvent.timeSlots.length > 0 && (
                        <div className="flex flex-col gap-2 mt-2">
                          <div className="flex items-center gap-3 text-eventry-dark">
                            <Clock size={18} className="text-[#00A372]" />
                            <span>Select Time Slot:</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {selectedEvent.timeSlots.map((slot: any) => (
                              <button
                                key={slot.id}
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`p-3 rounded-xl border-2 flex flex-col items-start gap-1 transition-all focus:outline-none ${selectedTimeSlot?.id === slot.id ? "border-[#00A372] bg-[#00A372]/5" : "border-gray-200 bg-white hover:border-gray-300"}`}
                              >
                                <span className="font-bold text-eventry-dark text-xs">{slot.name}</span>
                                <div className="flex justify-between w-full items-center">
                                  <span className="text-[10px] text-gray-500 lowercase normal-case tracking-normal">{slot.time}</span>
                                  <span className="font-black text-[#00A372] text-sm">${slot.price}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-eventry-dark mt-2 border-t border-gray-200 pt-4">
                    <MapPin size={18} className="text-[#00A372]" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
                  <div className="flex justify-between items-center text-xl font-black uppercase text-eventry-dark">
                    <span>Total Price:</span>
                    <span className="text-3xl text-[#00A372]">${currentPrice}</span>
                  </div>
                  <button
                    onClick={() => {
                      const dateStr = bookingType === "full" ? formatDateDisplay(selectedEvent.startDate, selectedEvent.endDate) : formatDateDisplay(selectedDate, selectedDate);
                      const timeStr = bookingType === "full" ? "All times" : (selectedTimeSlot ? selectedTimeSlot.name : "Standard Entry");
                      const checkoutUrl = `/checkout?eventId=${selectedEvent.id}&type=${bookingType}&date=${encodeURIComponent(dateStr)}&slot=${encodeURIComponent(timeStr)}&price=${currentPrice}`;
                      router.push(checkoutUrl);
                    }}
                    className="w-full py-5 bg-[#0D1B1B] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#00A372] transition-colors flex items-center justify-center gap-2 shadow-xl"
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
