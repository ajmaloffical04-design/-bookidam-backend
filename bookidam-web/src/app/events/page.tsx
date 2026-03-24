import { Metadata } from "next";
import EventGrid from "@/components/EventGrid";

export const metadata: Metadata = {
  title: "All Events | BOOKIDAM",
  description: "Browse all upcoming events, concerts, conferences, and more.",
};

export default function EventsPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden min-h-screen">
      {/* Page Header */}
      <section className="relative w-full pt-32 pb-16 px-6 bg-gray-900 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00A372]/30 rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-800/20 rounded-full blur-[80px] opacity-50 translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center mt-10">
          <p className="text-[#00A372] font-bold tracking-[0.3em] text-sm uppercase mb-6 inline-flex border border-[#00A372]/30 px-4 py-2 rounded-full bg-[#00A372]/10 backdrop-blur-md">
            The World Is Waiting
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight uppercase relative inline-block">
            Discover <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">All Events</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            From underground raves to international tech summits. Secure your spot at the most exclusive events worldwide.
          </p>
        </div>
      </section>

      {/* Reusing the Event Grid component without its internal title */}
      {/* In a real app, you would fetch real events from a database and pass them as props here */}
      <div className="-mt-12 bg-white rounded-t-[3rem] relative z-20 shadow-2xl pb-24">
        <EventGrid events={[]} hideHeader={true} />
      </div>
    </div>
  );
}
