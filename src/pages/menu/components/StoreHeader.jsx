import { ChevronRight } from "lucide-react";

export default function StoreHeader({ storeInfo, onClick }) {
  return (
    <div className="sticky top-16 bg-gray-100 z-40 mb-6">
      <div className="bg-white border border-gray-300 rounded-3xl px-4 sm:px-5 py-3 sm:py-4 relative cursor-pointer" onClick={onClick}>
        <div className="text-center w-full pr-12">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold truncate">{storeInfo.name || "KOPI BOEDAJA"}</h2>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base">{storeInfo.hours || "Buka hari ini 00.00 - 23.59"}</p>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ChevronRight size={24} />
        </div>
      </div>
    </div>
  );
}
