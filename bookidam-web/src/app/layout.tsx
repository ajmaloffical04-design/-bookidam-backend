import type { Metadata } from "next";
import { Instrument_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import MobileFooter from "@/components/MobileFooter";
import { ThemeProvider } from "@/components/ThemeProvider";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSans.variable} ${outfit.variable} font-sans bg-background text-foreground min-h-screen flex flex-col antialiased pb-20 md:pb-0`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <MobileFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
