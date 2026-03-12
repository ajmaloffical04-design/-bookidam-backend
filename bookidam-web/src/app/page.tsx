import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Search, Sparkles } from "lucide-react";

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
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* Dynamic Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center p-6 md:p-12 mt-4 md:mt-8">
        <div className="absolute inset-x-0 bottom-0 top-0 mx-auto max-w-7xl rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-900 to-green-800">
          {/* Background Image / Texture overlay */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1540039155732-68473668f4ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
          
          {/* Gradient masking */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-transparent to-black/30"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-8">
            <Sparkles size={16} className="text-yellow-300" />
            <span>Discover Premium Experiences</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Book Your Next <br/> <span className="text-green-300">Unforgettable Event</span>
          </h1>
          
          <p className="text-lg md:text-xl text-green-50 max-w-2xl font-light mb-10 leading-relaxed">
            From exclusive music shows to local tournaments, find and book the best experiences in your city. We handle the coordination, you make the memories.
          </p>

          {/* Quick Search Bar */}
          <div className="w-full max-w-3xl bg-white p-3 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-3 items-center">
            <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100">
              <Search className="text-gray-400 mr-3" size={20} />
              <input type="text" placeholder="Search events, sports, music..." className="w-full focus:outline-none text-gray-900 placeholder:text-gray-400 bg-transparent" />
            </div>
            <div className="flex-1 w-full flex items-center px-4 py-2">
              <MapPin className="text-gray-400 mr-3" size={20} />
              <input type="text" placeholder="Any location" className="w-full focus:outline-none text-gray-900 placeholder:text-gray-400 bg-transparent" />
            </div>
            <button className="w-full md:w-auto px-8 py-4 md:py-3 bg-green-600 hover:bg-green-700 transition text-white font-semibold rounded-xl md:rounded-full whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Browse by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {["Tournaments", "Music", "Weddings", "Conferences", "Exhibitions", "Comedy"].map((cat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover-lift border border-gray-100 text-center">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Sparkles size={24} />
              </div>
              <span className="font-semibold text-gray-800 text-sm">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Events Grid */}
      <section className="bg-white border-t border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Trending Events</h2>
              <p className="text-gray-500">Discover the most popular events happening near you.</p>
            </div>
            <Link href="/events" className="flex items-center gap-1 text-green-600 font-semibold hover:text-green-700 group transition">
              View all <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="w-full rounded-3xl bg-gray-50 border border-gray-100 p-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-green-600 border border-gray-100">
                <Calendar size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No events scheduled</h3>
              <p className="text-gray-500 max-w-md">There are currently no featured events available. Please check back later or start planning your own event!</p>
              <Link href="/book" className="mt-8 px-6 py-3 bg-green-600 text-white font-medium rounded-full shadow-sm hover:bg-green-700 transition">
                Plan an Event
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((evt: any) => (
                <Link href={`/events/${evt.id}`} key={evt.id} className="group block h-full">
                  <div className="bg-white rounded-3xl overflow-hidden hover-lift border border-gray-100 h-full flex flex-col relative">
                    {/* Image Area */}
                    <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                      {evt.imageUrl ? (
                        <img 
                          src={evt.imageUrl} 
                          alt={evt.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                          <Calendar size={32} />
                          <span className="uppercase text-xs font-bold tracking-widest">{evt.type}</span>
                        </div>
                      )}
                      
                      {/* Floating tags */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 backdrop-blur-md bg-white/90 text-gray-900 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {evt.type}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-green-600 transition-colors">
                        {evt.title}
                      </h3>
                      
                      <div className="mt-auto space-y-3">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar size={16} className="mr-3 text-green-600 flex-shrink-0" />
                          <span className="truncate">
                            {new Date(evt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin size={16} className="mr-3 text-green-600 flex-shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-green-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-800 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-700 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Need a custom event?</h2>
            <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              From corporate seminars to grand weddings, let BOOKIDAM handle all the heavy lifting. Tell us what you need, and our expert coordinators will bring it to life.
            </p>
            <Link href="/book" className="px-8 py-4 bg-white text-green-900 font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Start Planning Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
