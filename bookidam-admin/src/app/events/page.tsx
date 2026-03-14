import Link from "next/link";
import { Search, Plus, Calendar, MapPin, MoreVertical } from "lucide-react";

async function getEvents() {
  try {
    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    const res = await fetch(`${apiUrl}/api/events`, { cache: 'no-store' });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Events Directory</h2>
          <p className="text-gray-500 mt-1">Manage public events listed on the Bookidam app.</p>
        </div>
        <Link href="/events/new" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center shadow-sm">
          <Plus size={18} className="mr-2" />
          Create Event
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search events by name or location..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
          />
        </div>
      </div>

      {/* Event Grid */}
      {events.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">You haven't created any public events yet. Create one to show it on the mobile app.</p>
          <Link href="/events/new" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-medium transition shadow-sm inline-flex">
            Create First Event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: any) => (
            <div key={event.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition group">
              <div className="h-48 bg-gray-100 relative">
                {event.imageUrl ? (
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                    <span className="text-xs uppercase font-bold tracking-widest">{event.type}</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition">
                  <MoreVertical size={16} className="text-gray-700" />
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{event.title}</h3>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md">
                    {event.type}
                  </span>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-medium text-primary-600 hover:text-primary-700 cursor-pointer">
                    Edit Event
                  </span>
                  <span className="text-sm font-medium text-gray-500 hover:text-red-600 cursor-pointer transition">
                    Delete
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
