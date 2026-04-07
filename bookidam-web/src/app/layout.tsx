import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import MobileFooter from "@/components/MobileFooter";
import { ThemeProvider } from "@/components/ThemeProvider";
import PreloaderWrapper from "@/components/PreloaderWrapper";

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
      <body className="font-sans bg-background text-foreground min-h-screen flex flex-col antialiased pb-20 md:pb-0">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PreloaderWrapper>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <MobileFooter />
          </PreloaderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
