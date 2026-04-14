"use client";
import Navbar from "@/app/components/Navbar";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const eventsData = [
  { id: "1", title: "Youth Mental Wellness Circle Stress", date: "24 th Feb 2026", time: "10:30 AM SIT", price: "450/-", mode: "Online", location: "Pune" },
  { id: "2", title: "Understanding the Self: Bhagavad Gita Discussion", date: "25 th Feb 2026", time: "10:30 AM SIT", price: "450/-", mode: "Online", location: "Mumbai" },
  { id: "3", title: "Tech Mindfulness in AI Age", date: "26 th Feb 2026", time: "11:00 AM SIT", price: "500/-", mode: "Online", location: "Remote" },
];

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const event = eventsData.find((e) => e.id === id) || eventsData[0];

  // Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [tickets, setTickets] = useState(1);
  const [attendance, setAttendance] = useState("In person");
  
  const ticketPrice = parseInt(event.price.replace("/-", ""));

  // Navigation Logic
  const handleBookNow = () => {
    if (!fullName || !email) {
      alert("Please fill in your details");
      return;
    }

    const query = new URLSearchParams({
      name: fullName,
      tickets: tickets.toString(),
      price: ticketPrice.toString(),
      total: (ticketPrice * tickets).toString(),
      eventTitle: event.title,
      date: event.date,
      time: event.time,
      location: event.location
    }).toString();

    // Summary page ka path
    router.push(`/events/${id}/summary?${query}`);
  };

  return (
    <div className="h-screen w-full bg-[#F8F5F0] flex flex-col font-sans overflow-hidden">
      <Navbar onBack={() => router.back()} />

      <main className="flex-1 flex items-center justify-center px-8 lg:px-20 py-4">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* LEFT SECTION */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-[#222]">
              {event.title}
            </h1>

            <div className="space-y-3 text-[#777] text-lg font-medium">
              <div className="flex items-center gap-3"><span>📅</span> {event.date}</div>
              <div className="flex items-center gap-3"><span>🕒</span> {event.time}</div>
              <div className="flex items-center gap-3 text-[#AAA]"><span>📍</span> {event.location}</div>
            </div>

            <div className="flex gap-3">
              <span className="px-4 py-1 bg-[#E1F3FF] text-[#5EB5E6] rounded-full text-[11px] font-black uppercase tracking-widest">{event.mode}</span>
              <span className="px-4 py-1 bg-[#FFEBD5] text-[#E9B96E] rounded-full text-[11px] font-black uppercase tracking-widest">{event.price}</span>
            </div>

            <div className="text-[#888] text-sm leading-relaxed max-w-sm">
              <p className="font-bold text-[#555] mb-1">{event.title}</p>
              <p>Discussion {event.title} Discussion {event.title} Discussion</p>
            </div>
          </div>

          {/* RIGHT SECTION: Registration Card */}
          <div className="w-full lg:w-120 bg-[#EAEAEA] p-8 lg:p-10 rounded-[40px] shadow-sm">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#444]">Register</h2>
              <p className="text-[9px] text-[#999] uppercase tracking-[2px] font-bold">Youth Mental Wellness Circle</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <p className="text-center text-[12px] font-bold text-[#555]">Attendance mode</p>
                <div className="flex gap-3 bg-[#DCDCDC] p-1 rounded-2xl">
                  <button type="button" onClick={() => setAttendance("Online")} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all ${attendance === "Online" ? "bg-white text-gray-800 font-bold shadow-sm" : "text-gray-400"}`}>Online</button>
                  <button type="button" onClick={() => setAttendance("In person")} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all ${attendance === "In person" ? "bg-white text-gray-800 font-bold shadow-sm" : "text-gray-400"}`}>In person</button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-[#666] ml-1">Full name</label>
                  <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Enter your full name" className="w-full px-5 py-3 rounded-xl bg-white border-none outline-none text-sm" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#666] ml-1">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your Email ID" className="w-full px-5 py-3 rounded-xl bg-white border-none outline-none text-sm" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#666] ml-1">Mobile Number</label>
                  <input value={mobile} onChange={(e) => setMobile(e.target.value)} type="text" placeholder="Enter your Mobile Number" className="w-full px-5 py-3 rounded-xl bg-white border-none outline-none text-sm" />
                </div>
              </div>

              <div className="flex gap-3 items-end">
                <div className="flex-1 space-y-1">
                  <p className="text-[9px] font-bold text-[#999] uppercase">Ticket cost: {event.price}</p>
                  <label className="text-[11px] font-bold text-[#666] block">Number of Tickets</label>
                  <div className="flex items-center bg-white rounded-xl overflow-hidden">
                    <button type="button" onClick={() => setTickets(Math.max(1, tickets - 1))} className="px-4 py-3 hover:bg-gray-100 font-bold text-gray-500">-</button>
                    <span className="flex-1 text-center font-bold text-sm text-[#555]">{tickets}</span>
                    <button type="button" onClick={() => setTickets(tickets + 1)} className="px-4 py-3 hover:bg-gray-100 font-bold text-gray-500">+</button>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[11px] font-bold text-[#666] block">Total (in Rupees)</label>
                  <div className="w-full px-5 py-3 rounded-xl bg-white text-sm font-bold text-[#555] h-11 flex items-center">{ticketPrice * tickets}</div>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button 
                  onClick={handleBookNow}
                  type="button" 
                  className="cursor-pointer bg-[#EFB067] hover:bg-[#d99a4d] text-white font-black py-4 px-24 rounded-full shadow-[0_10px_20px_rgba(239,176,103,0.3)] text-[15px] transition-all active:scale-95 border-none outline-none"
                >
                  Book now
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}