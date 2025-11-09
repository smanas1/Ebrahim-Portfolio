import { useState, useEffect } from "react";

const SectionLoadingIndicator = () => {
  return (
    <div className="py-12 flex justify-center items-center">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default SectionLoadingIndicator;