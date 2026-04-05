import React, { useState } from "react";

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative flex items-center group/share">
      <button
        className="p-2 rounded-full group-hover/share:bg-x-accent/10 transition-colors"
        onClick={handleShare}
        aria-label="Share this tweet"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px] fill-x-text-secondary group-hover/share:fill-x-accent transition-colors"
        >
          <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" />
        </svg>
      </button>
      {copied && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-x-accent text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Copied to clipboard
        </div>
      )}
    </div>
  );
};

export default ShareButton;
