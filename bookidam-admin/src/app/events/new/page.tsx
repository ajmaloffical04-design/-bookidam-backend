"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Image as ImageIcon, Calendar, MapPin, AlignLeft } from "lucide-react";
import Link from "next/link";

export default function NewEvent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "Tournament",
    date: "",
    location: "",
    description: "",
    imageUrl: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
      const res = await fetch(`${apiUrl}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/events");
        router.refresh();
      } else {
        alert("Failed to create event");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/events" className="text-sm font-medium text-gray-500 hover:text-gray-900 inline-flex items-center mb-4 transition">
          <ArrowLeft size={16} className="mr-1" /> Back to Events
        </Link>
        <h2 className="text-3xl font-bold text-gray-900">Create New Event</h2>
        <p className="text-gray-500 mt-1">Publish a public event for your users to book tickets.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* General Info */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Event Title</label>
                <input 
                  type="text" 
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Summer Football Bash" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Event Type</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                >
                  <option value="Tournament">Tournament</option>
                  <option value="Music Show">Music Show</option>
                  <option value="Cultural Event">Cultural Event</option>
                  <option value="Business Seminar">Business Seminar</option>
                  <option value="Exhibition">Exhibition</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="date" 
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Venue"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Media & Desc */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <AlignLeft size={16} className="mr-2 text-gray-400" /> Description
                </label>
                <textarea 
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide details about the event..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <ImageIcon size={16} className="mr-2 text-gray-400" /> Event Cover Image URL
                </label>
                <input 
                  type="url" 
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-gray-500 mt-2">Optional: For now, insert a direct URL to an image. Later, we can add a file uploader.</p>
              </div>

              {formData.imageUrl && (
                <div className="w-full h-32 rounded-lg border border-gray-200 overflow-hidden relative">
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "")} />
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 flex justify-end space-x-4">
            <Link href="/events" className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 rounded-lg font-medium transition shadow-sm disabled:opacity-70 flex items-center"
            >
              {loading ? "Publishing..." : "Publish Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
