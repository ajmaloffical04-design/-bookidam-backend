import Link from "next/link";
import { ArrowRight, Clock, CheckCircle, XCircle } from "lucide-react";

async function getStats() {
  try {
    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    const res = await fetch(`${apiUrl}/api/bookings`, { cache: 'no-store' });
    const data = await res.json();
    const bookings = data.data || [];
    
    return {
      total: bookings.length,
      pending: bookings.filter((b: any) => b.status === "Pending").length,
      completed: bookings.filter((b: any) => b.status === "Completed").length,
      recent: bookings.slice(0, 5)
    };
  } catch (error) {
    return { total: 0, pending: 0, completed: 0, recent: [] };
  }
}

export default async function Dashboard() {
  const stats = await getStats();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Welcome back. Here's what's happening today.</p>
        </div>
        <Link href="/events/new" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm">
          + Create Event
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Requests</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pending}</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
            <Clock size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Completed Events</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completed}</p>
          </div>
          <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Recent Booking Requests</h3>
          <Link href="/requests" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
            View all <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="p-0">
          {stats.recent.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No booking requests found. When users book via the mobile app, they will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 tracking-wider">
                    <th className="px-6 py-4 font-semibold">Client Name</th>
                    <th className="px-6 py-4 font-semibold">Event Type</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Budget</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats.recent.map((booking: any) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{booking.clientName}</div>
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {booking.eventType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(booking.eventDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {booking.budget}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
