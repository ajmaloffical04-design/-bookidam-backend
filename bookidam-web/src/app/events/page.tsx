import { Metadata } from "next";
import EventGrid from "@/components/EventGrid";
import { supabase } from "@/lib/supabase";

async function getAllEvents() {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('startDate', { ascending: true });
    
    if (error) return [];
    return data || [];
  } catch (err) {
    return [];
  }
}

export const metadata: Metadata = {
  title: "All Events | BOOKIDAM",
  description: "Browse all upcoming events, concerts, conferences, and more.",
};

  const events = await getAllEvents();

  return (
    <div className="flex flex-col w-full overflow-hidden min-h-screen">
      {/* ... previous header code ... */}
      <div className="-mt-12 bg-white rounded-t-[3rem] relative z-20 shadow-2xl pb-24">
        <EventGrid events={events} hideHeader={true} />
      </div>
    </div>
  );
}
