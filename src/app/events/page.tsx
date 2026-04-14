"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";

const eventsData = [
  { id: "1", title: "Youth Mental Wellness Circle Stress", date: "24 th Feb 2026", time: "10:30 AM SIT", price: "450/-", mode: "Online", location: "Pune", category: "Spiritual" },
  { id: "2", title: "Understanding the Self: Bhagavad Gita", date: "25 th Feb 2026", time: "10:30 AM SIT", price: "450/-", mode: "Online", location: "Mumbai", category: "Spiritual" },
  { id: "3", title: "Tech Mindfulness in AI Age", date: "26 th Feb 2026", time: "11:00 AM SIT", price: "500/-", mode: "Online", location: "Remote", category: "Tech" },
  { id: "4", title: "Digital Detox for Developers", date: "27 th Feb 2026", time: "10:30 AM SIT", price: "300/-", mode: "Online", location: "Pune", category: "Tech" },
  { id: "5", title: "Zen and the Art of Coding", date: "28 th Feb 2026", time: "02:00 PM SIT", price: "450/-", mode: "Online", location: "Pune", category: "Tech" },
  { id: "6", title: "Vedic Wisdom for Modern Living", date: "01 th Mar 2026", time: "10:30 AM SIT", price: "450/-", mode: "In person", location: "Pune", category: "Spiritual" },
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const router = useRouter();

  const filteredEvents = activeTab === "All" 
    ? eventsData 
    : eventsData.filter(event => event.category === activeTab);

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <Navbar onBack={() => router.back()} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 uppercase tracking-tight">
            Upcoming Experiences
          </h2>
          <p className="text-gray-500 text-xs md:text-sm max-w-xl mx-auto leading-relaxed px-4">
            Join guided sessions to reconnect and reset.
          </p>
        </div>

        <div className="flex justify-start md:justify-center items-center gap-2 md:gap-3 mb-10 md:mb-16 overflow-x-auto pb-4 no-scrollbar px-2">
          {["All", "Tech", "Spiritual"].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveTab(cat)}
              className={`whitespace-nowrap px-6 md:px-10 py-2 md:py-2.5 rounded-full border text-xs md:text-sm font-semibold transition-all duration-300 ${
                activeTab === cat 
                ? "bg-[#E9B96E] border-[#E9B96E] text-white shadow-md scale-105" 
                : "bg-[#F3F4F6] border-transparent text-gray-500 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:px-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div 
                key={event.id} 
                className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <EventCard event={event} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400 text-base md:text-lg italic font-serif">
              No events found in this category.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}