import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
export const metadata: Metadata = {
  title: "BOOKIDAM | Event & Programme Booking",
  description: "Book any event. We handle the rest. The best platform to discover and coordinate premium events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans bg-gray-50/50 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* Premium Footer */}
        <footer className="bg-white border-t border-gray-100 py-16 mt-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <Calendar className="text-white" size={18} />
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">BOOKIDAM</span>
              </Link>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">
                Your premier destination for discovering and booking incredible events and venues. We handle the coordination so you can enjoy the experience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Discover</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-gray-500 hover:text-primary-600 transition">Tournaments</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-primary-600 transition">Music Shows</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-primary-600 transition">Corporate Events</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-primary-600 transition">Weddings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-gray-500 hover:text-primary-600 transition">About Us</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-500 hover:text-primary-600 transition">Contact</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-primary-600 transition">Careers</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-primary-600 transition">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-gray-500 hover:text-primary-600 transition">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2026 Bookidam. All rights reserved.</p>
            <div className="flex gap-4 text-gray-400">
              {/* Mock Social Icons */}
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:text-primary-600 transition cursor-pointer">In</div>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:text-primary-600 transition cursor-pointer">Tw</div>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:text-primary-600 transition cursor-pointer">Fb</div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
