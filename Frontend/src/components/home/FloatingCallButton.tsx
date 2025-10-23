import { Phone } from "lucide-react";

const FloatingCallButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors">
        <Phone className="w-6 h-6 text-white" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
      </button>
    </div>
  );
};

export default FloatingCallButton;