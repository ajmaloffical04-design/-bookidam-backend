import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import MobileFooter from "@/components/MobileFooter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

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
      <body className={`${inter.variable} ${plusJakartaSans.variable} font-sans bg-background text-foreground min-h-screen flex flex-col antialiased pb-20 md:pb-0`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <MobileFooter />
      </body>
    </html>
  );
}
