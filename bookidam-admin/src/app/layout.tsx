import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { LayoutDashboard, Calendar, FileText, Settings, Users } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BOOKIDAM Admin',
  description: 'Admin dashboard for BOOKIDAM Events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 flex h-screen overflow-hidden`}>
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-green-700 tracking-tight">BOOKIDAM</h1>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Admin Panel</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Link href="/" className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-700 transition">
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link href="/requests" className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-700 transition">
              <FileText size={20} />
              <span className="font-medium">Booking Requests</span>
            </Link>
            <Link href="/events" className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-700 transition">
              <Calendar size={20} />
              <span className="font-medium">Events List</span>
            </Link>
            <Link href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-400 rounded-lg cursor-not-allowed">
              <Users size={20} />
              <span className="font-medium">Customers</span>
            </Link>
            <Link href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-400 rounded-lg cursor-not-allowed">
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </Link>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@bookidam.com</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
