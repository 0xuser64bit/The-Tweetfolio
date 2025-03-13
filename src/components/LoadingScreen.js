import React, { useEffect, useState } from 'react';
import PROFILE_IMAGE from "../assets/profile.jpg";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative flex flex-col items-center">
        {/* Profile image with circular loading animation */}
        <div className="relative">
          {/* Outer spinning circle */}
          <div className="absolute inset-0 w-48 h-48 -m-6 rounded-full border-2 border-transparent border-t-blue-400 border-b-blue-600 animate-spin"></div>
          
          {/* Middle spinning circle - opposite direction */}
          <div className="absolute inset-0 w-40 h-40 -m-2 rounded-full border-2 border-transparent border-l-blue-500 border-r-blue-700 animate-spin-reverse"></div>
          
          {/* Inner pulsing circle */}
          <div className="absolute inset-0 w-36 h-36 m-0 rounded-full border-2 border-blue-400/30 animate-pulse"></div>
          
          {/* Profile image */}
          <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-[#2b3c47] z-10">
            <img
              src={PROFILE_IMAGE}
              alt="Profile"
              className="h-full w-full object-cover"
            />
            
            {/* Overlay gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 