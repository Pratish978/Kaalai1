"use client";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function PaymentSummaryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id } = useParams();

  // URL se data nikaalna
  const attendee = searchParams.get("name") || "Guest User";
  const tickets = searchParams.get("tickets") || "1";
  const price = searchParams.get("price") || "450";
  const subtotal = searchParams.get("total") || "450";
  const platformFee = 50;
  const finalTotal = parseInt(subtotal) + platformFee;

  return (
    <div className="h-screen w-full bg-[#F8F5F0] flex flex-col font-sans overflow-hidden">
      <Navbar onBack={() => router.back()} />

      <main className="flex-1 flex items-center justify-center p-6 bg-[#FAFAFA]">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* LEFT SIDE: Event Title (Static or from ID) */}
          <div className="w-full lg:w-1/2 space-y-4">
             <h1 className="text-4xl font-bold text-[#666] leading-tight">
               Understanding the Self: Bhagavad Gita Discussion
             </h1>
             <div className="text-[#999] space-y-2 text-lg">
                <p>📅 24 th Feb 2026</p>
                <p>🕒 10:30 AM SIT</p>
                <p>📍 Pune</p>
             </div>
          </div>

          {/* RIGHT SIDE: Summary Card */}
          <div className="w-full lg:w-137.5 bg-white p-12 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#666]">Payment summary</h2>
              <p className="text-sm text-[#999] mt-2">Review the booking details</p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center text-lg">
                <span className="text-[#999]">Attendee:</span>
                <span className="font-bold text-[#666]">{attendee}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-[#999]">Tickets:</span>
                <span className="font-bold text-[#666]">{tickets} * Rs {price}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-[#999]">Subtotal:</span>
                <span className="font-bold text-[#666]">Rs {subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-[#999]">Platform fee:</span>
                <span className="font-bold text-[#666]">Rs {platformFee}</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between items-center text-xl font-black">
                <span className="text-[#666]">Total Amount:</span>
                <span className="text-[#666]">Rs {finalTotal}</span>
              </div>
            </div>

<div className="flex gap-4">
  {/* Back Button: White background with Orange Border */}
  <button 
    type="button"
    onClick={() => router.back()}
    className="flex-1 py-4 border-2 border-[#EFB067] text-[#EFB067] font-bold rounded-full hover:bg-[#EFB067] hover:text-white transition-all text-sm"
  >
    Back to booking details
  </button>

  {/* Proceed Button: Solid Orange background with White Text */}
  <button 
    type="button"
    className="flex-1 py-4 bg-[#E9B96E] border-[#e5b15c]  font-black rounded-full shadow-lg shadow-orange-200 hover:bg-[#e29d4f] transition-all text-sm border-none outline-none"
  >
    Proceed for payment
  </button>
</div>
          </div>

        </div>
      </main>
    </div>
  );
}