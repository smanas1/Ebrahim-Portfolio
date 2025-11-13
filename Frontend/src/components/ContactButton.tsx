import React, { useState } from "react";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const ContactButton = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating contact button */}
      <div className="relative">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
          aria-label="Contact options"
        >
          <MessageCircle size={24} />
        </button>

        {/* Contact options dropdown */}
        {showOptions && (
          <div className="absolute bottom-16 right-0 mb-3 w-48 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-3 border border-slate-200 dark:border-slate-700 transition-all duration-300">
            <div className="space-y-2">
              <Link
                to="/contact"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setShowOptions(false)}
              >
                <MessageCircle size={18} className="text-indigo-600" />
                <span className="text-sm font-medium">Contact Form</span>
              </Link>
              
              <a
                href="https://calendly.com/ebrahimmohammadkamal1/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setShowOptions(false)}
              >
                <Calendar size={18} className="text-blue-600" />
                <span className="text-sm font-medium">Book a Meeting</span>
              </a>
              
              <a
                href="tel:+8801712345678"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setShowOptions(false)}
              >
                <Phone size={18} className="text-green-600" />
                <span className="text-sm font-medium">Call</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactButton;