"use client";
import React from "react";
import { Clock, MapPin, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    mode: string; // e.g., "Online"
    price: string; // e.g., "450/-"
    date: string;  // e.g., "24 th Feb 2026"
    time: string;  // e.g., "10:30 AM SIT"
    location: string; // e.g., "Pune"
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const router = useRouter();


  const handleNavigation = () => {
    router.push(`/events/${event.id}`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 pb-7 shadow-[0px_10px_40px_rgba(235,238,241,0.3)] border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-[0px_15px_60px_rgba(235,238,241,0.6)] w-full max-w-sm">
      
   
      <div className="flex items-start justify-between gap-4 mb-5">
        <h3 className="text-[17px] font-semibold text-gray-800 leading-snug w-full max-w-52.5">
          {event.title}
        </h3>
        
        <div className="flex items-center gap-2 shrink-0">
      
          <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-[#ECF4FF] text-[#6A7789]">
            {event.mode}
          </span>
     
          <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-[#FFF1DF] text-[#A6865D]">
            {event.price}
          </span>
        </div>
      </div>


      <div className="space-y-3 mb-8 text-[#A0A8B5] text-[13px] font-medium">
        <div className="flex items-center gap-2.5">
          <CalendarDays className="w-5 h-5 text-[#A6865D]" strokeWidth={1.5} />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-[#A6865D]" strokeWidth={1.5} />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <MapPin className="w-5 h-5 text-[#A6865D]" strokeWidth={1.5} />
          <span>{event.location}</span>
        </div>
      </div>


      <button 
        onClick={handleNavigation}
        className="w-full h-13 rounded-full bg-[#DFB36E] text-[#FCFCFC] text-[15px] font-bold transition-all active:scale-[0.98] hover:bg-[#d4a55d]"
      >
        Register now
      </button>
    </div>
  );
};

export default EventCard;