import Link from "next/link";
import { Search, Filter, MoreVertical, Eye, CheckCircle, XCircle } from "lucide-react";

async function getBookings() {
  try {
    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    const res = await fetch(`${apiUrl}/api/bookings`, { cache: 'no-store' });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}

export default async function RequestsPage() {
  const bookings = await getBookings();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Booking Requests</h2>
          <p className="text-gray-500 mt-1">Manage and coordinate all client event bookings.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search clients or events..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 tracking-wider">
                <th className="px-6 py-4 font-semibold">Client Info</th>
                <th className="px-6 py-4 font-semibold">Event Details</th>
                <th className="px-6 py-4 font-semibold">Date & Location</th>
                <th className="px-6 py-4 font-semibold">Budget</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No booking requests found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900">{booking.clientName}</div>
                      <div className="text-sm text-gray-500 flex flex-col mt-1">
                        <span>{booking.phone}</span>
                        <span>{booking.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.eventType}</div>
                      <div className="text-xs text-gray-500 mt-1 max-w-[200px] truncate">
                        {booking.eventName || "No specific name"}
                      </div>
                      {booking.imageUrl && (
                        <div className="text-xs text-primary-600 mt-1 font-medium truncate max-w-[200px]">
                          <a href={booking.imageUrl} target="_blank" rel="noreferrer">Attached Image →</a>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(booking.eventDate).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500 mt-1">{booking.preferredLocation}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.budget}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                        ${booking.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 
                          booking.status === 'Approved' ? 'bg-blue-100 text-blue-800' : 
                          booking.status === 'Completed' ? 'bg-primary-100 text-primary-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <button className="text-gray-400 hover:text-primary-600 transition" title="View Details">
                          <Eye size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-blue-600 transition" title="Approve">
                          <CheckCircle size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-red-600 transition" title="Reject">
                          <XCircle size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 transition">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
