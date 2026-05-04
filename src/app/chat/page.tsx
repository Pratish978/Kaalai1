"use client";

import ChatInterface from "../components/ChatInterface";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ChatPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FBF9F6] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl h-[70vh] rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col">
        
        {/* Header with Back Option */}
        <div className="p-6 flex items-center border-b border-gray-50">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors group"
          >
            <div className="p-2 rounded-full group-hover:bg-gray-100">
              <ArrowLeft size={20} />
            </div>
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <ChatInterface />
        </div>
      </div>
    </main>
  );
}